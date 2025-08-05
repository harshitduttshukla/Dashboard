import { useEffect, useState } from 'react';

interface ScanItem {
  id: number;
  email: string;
  model: string;
  vin: string;
  license_plate: string;
  scan_ended: string;
  make: string;
  function: string;
  type: string;
  country_id: number;
  scan_end_time: Date;
  scan_start_time: Date;
  app_version: string;
  pdf_report: string;
  scanResArray : any;
  decodedArray : any;
}

const ITEMS_PER_PAGE = 30;

const Scandetail = () => {
  const [scans, setScans] = useState<ScanItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0); // total reports

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/ScanDetail?page=${page}&limit=${ITEMS_PER_PAGE}`
        );
        if (!response.ok) throw new Error('Failed to fetch scan report');

        const json = await response.json();
        console.log('json', json);

        if (json && Array.isArray(json.scans)) {
          setScans(json.scans);
          setTotal(json.total || 0); // assuming your backend returns { scans: [...], total: 5639503 }
        } else {
          setError('Invalid response format');
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Something went wrong');
      }
    };

    fetchData();
  }, [page]);

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Scan Details</h2>

      {error && <p className="text-red-500">{error}</p>}

      <table className="min-w-full bg-white border border-gray-200 text-sm">
        <thead>
          <tr>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Start_time</th>
            <th className="border px-4 py-2">End_time</th>
            <th className="border px-4 py-2">Model</th>
            <th className="border px-4 py-2">License_plate</th>
            <th className="border px-4 py-2">Vin</th>
            <th className="border px-4 py-2">Scan_ended</th>
            <th className="border px-4 py-2">Make</th>
            <th className="border px-4 py-2">Country</th>
            <th className="border px-4 py-2">Type</th>
            <th className="border px-4 py-2">App_version</th>
            <th className="border px-4 py-2">Pdf_report</th>
            <th className="border px-4 py-2">Show</th>
          </tr>
        </thead>
        <tbody>
          {scans.map((scan) => (
            <tr key={scan.id}>
              <td className="border px-4 py-2">{scan.email || 'N/A'}</td>
              <td className="border px-4 py-2">{scan.scan_start_time || 'N/A'}</td>
              <td className="border px-4 py-2">{scan.scan_end_time || 'N/A'}</td>
              <td className="border px-4 py-2">{scan.model || 'N/A'}</td>
              <td className="border px-4 py-2">{scan.license_plate || 'N/A'}</td>
              <td className="border px-4 py-2">{scan.vin || 'N/A'}</td>
              <td className="border px-4 py-2">{scan.scan_ended || 'N/A'}</td>
              <td className="border px-4 py-2">{scan.make || 'N/A'}</td>
              <td className="border px-4 py-2">{scan.country_id || 'N/A'}</td>
              <td className="border px-4 py-2">{scan.type || 'N/A'}</td>
              <td className="border px-4 py-2">{scan.app_version || 'N/A'}</td>
              <td className="border px-4 py-2">
                {scan.pdf_report ? (
                  <a
                  href={scan.pdf_report}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                  >
                    View Report
                  </a>
                ) : (
                  'No Report'
                )}
              </td>
                {/* <td className="border px-4 py-2">{scan.decodedArray || 'N/A'}</td> */}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-center items-center space-x-2">
        <button
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>

        <span className="font-semibold">
          Page {page} of {totalPages}
        </span>

        <button
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Scandetail;
