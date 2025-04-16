import express from 'express';
import multer from 'multer';
import fs from 'fs';
import { Pool } from 'pg';
import path from 'path';
import ExcelJS from 'exceljs';

const router = express.Router();

// Configure Multer to store uploaded files in the "uploads" folder.
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // __dirname is where this file resides.
    // We assume the "uploads" folder is two levels up.
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: (req, file, cb) => {
    // Prepend a timestamp to the original filename for uniqueness.
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Create a connection pool for PostgreSQL (Neon DB)
const pool = new Pool({
  connectionString:
    'postgresql://NEWPROJECTAPP_owner:npg_HZWI4u7PUrEw@ep-yellow-art-a47glapa.us-east-1.aws.neon.tech/NEWPROJECTAPP?sslmode=require'
});

// Optional: Listen for errors on idle clients in the pool.
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Route: POST /api/import
// This example expects an Excel file with a header row containing:
// "name", "email", and "password" in the first three columns.
router.post('/import', upload.single('file'), async (req, res): Promise<void> => {
  try {
    const filePath = req.file?.path;
    if (!filePath) {
      res.status(400).json({ message: 'No file uploaded' });
      return;
    }

    // Create a new workbook and read the Excel file.
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.worksheets[0]; // Get the first worksheet

    // Assume that the first row is the header row.
    // You could add more robust header verification here if needed.
    const rows: any[] = [];
    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      if (rowNumber > 1) { // Skip header row
        // The row.values array starts at index 1.
        rows.push(row.values);
      }
    });

    // Insert each Excel row into the "users" table.
    // Assumes the columns are arranged as:
    // Column 1: name, Column 2: email, Column 3: password
    for (const row of rows) {
      await pool.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
        [row[1], row[2], row[3]]
      );
    }

    // Delete the file after processing.
    fs.unlink(filePath, (unlinkError) => {
      if (unlinkError) {
        console.error('Error deleting file:', unlinkError);
      }
    });
    res.status(200).json({ message: 'Excel file imported successfully!' });
  } catch (err) {
    console.error('Excel Import Error:', err);
    res.status(500).json({ message: 'Excel import failed' });
  }
});

export default router;
