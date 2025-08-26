import { useState } from "react";
import axios from "axios";




const BASE_URL = import.meta.env.VITE_API_BASE_URL

function Updatecommand() {
    const [file, setFile] = useState<File | null>(null); // Type File or null for file state
    const [uploading, setUploading] = useState<boolean>(false); // Type boolean for uploading state
    const [progress, setProgress] = useState<number>(0); // Type number for progress state
    const [message, setMessage] = useState<string>(""); // Type string for message state

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]; // Safe access to the first file
        if (selectedFile) {
            setFile(selectedFile);
            setMessage("");
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage("Please select a file first.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file); // "file" is field name expected by the backend

        try {
            setUploading(true);
            const response = await axios.post(
                `${BASE_URL}api/import2`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total!
                        );
                        setProgress(percentCompleted);
                    },
                }
            );
            setMessage("File uploaded successfully!");
            console.log(response.data);
        } catch (error) {
            setMessage("Error uploading file. Try again!");
            console.error(error);
        } finally {
            setUploading(false);
            setProgress(0);
            setFile(null);
        }
    };

    return (
        <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">File Upload For Updates Commands</h2>
            <input
                type="file"
                onChange={handleFileChange}
                className="p-2 border border-gray-300 rounded-md mb-4"
            />
            <button
                onClick={handleUpload}
                disabled={uploading}
                className={`${
                    uploading ? "bg-blue-300" : "bg-blue-500"
                } text-white font-semibold py-2 px-6 rounded-md shadow-md hover:bg-blue-700 transition-colors duration-300`}
            >
                {uploading ? `Uploading ${progress}%` : "Upload"}
            </button>
            <br />
            {message && (
                <p className="mt-4 text-center text-lg text-gray-800">{message}</p>
            )}
        </div>
    );
}

export default Updatecommand;












// import React, { useState, useCallback } from 'react';
// import { Upload, FileText, CheckCircle, XCircle, Command, Trash2, RefreshCw } from 'lucide-react';

// interface UploadResponse {
//   success: boolean;
//   message: string;
//   data?: any;
// }

// const UpdateCommandUploader: React.FC = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [uploading, setUploading] = useState<boolean>(false);
//   const [progress, setProgress] = useState<number>(0);
//   const [uploadResult, setUploadResult] = useState<UploadResponse | null>(null);
//   const [error, setError] = useState<string>("");
//   const [dragActive, setDragActive] = useState<boolean>(false);

//   const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);
    
//     const files = e.dataTransfer.files;
//     if (files && files[0]) {
//       handleFileSelect(files[0]);
//     }
//   }, []);

//   const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(true);
//   }, []);

//   const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);
//   }, []);

//   const handleFileSelect = (selectedFile: File) => {
//     // Validate file size (10MB limit)
//     if (selectedFile.size > 10 * 1024 * 1024) {
//       setError('File size must be less than 10MB');
//       return;
//     }
    
//     setFile(selectedFile);
//     setError("");
//     setUploadResult(null);
//     setProgress(0);
//   };

//   const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = e.target.files?.[0];
//     if (selectedFile) {
//       handleFileSelect(selectedFile);
//     }
//   };

//   const uploadFile = async () => {
//     if (!file) {
//       setError('Please select a file first');
//       return;
//     }

//     setUploading(true);
//     setError("");
//     setUploadResult(null);
    
//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       // Try multiple possible endpoints
//       const possibleEndpoints = [
//         'http://localhost:3000/api/import2',
//         '/api/import2',
//         '/import2',
//         'http://localhost:5000/api/import2'
//       ];

//       let response: Response | null = null;

//       for (const endpoint of possibleEndpoints) {
//         try {
//           console.log(`Trying endpoint: ${endpoint}`);
          
//           response = await fetch(endpoint, {
//             method: 'POST',
//             body: formData,
//             // Note: Don't set Content-Type header for FormData, browser will set it automatically
//           });
          
//           if (response.status !== 404) {
//             break; // Found a working endpoint
//           }
//         } catch (e) {
//           continue;
//         }
//       }

//       if (!response || response.status === 404) {
//         throw new Error('API endpoint not found. Please check your server configuration.');
//       }

//       // Check if response is JSON
//       const contentType = response.headers.get('content-type');
//       if (!contentType || !contentType.includes('application/json')) {
//         const textResponse = await response.text();
//         console.error('Non-JSON response:', textResponse);
//         throw new Error('Server returned an invalid response. Please check server logs.');
//       }

//       const result: UploadResponse = await response.json();

//       if (response.ok && result.success) {
//         setUploadResult(result);
//         setFile(null);
//         setProgress(100);
//         // Reset file input
//         const fileInput = document.getElementById('file-input') as HTMLInputElement;
//         if (fileInput) fileInput.value = '';
//       } else {
//         throw new Error(result.message || `Server error: ${response.status}`);
//       }
//     } catch (err: any) {
//       console.error('Upload error:', err);
//       let errorMessage = err.message;
      
//       if (err.message.includes('Failed to fetch')) {
//         errorMessage = 'Cannot connect to server. Please check if the server is running.';
//       } else if (err.message.includes('JSON')) {
//         errorMessage = 'Server configuration error. Please check server setup.';
//       }
      
//       setError(errorMessage);
//     } finally {
//       setUploading(false);
//       if (!uploadResult) {
//         setProgress(0);
//       }
//     }
//   };

//   const removeFile = () => {
//     setFile(null);
//     setError("");
//     setProgress(0);
//     const fileInput = document.getElementById('file-input') as HTMLInputElement;
//     if (fileInput) fileInput.value = '';
//   };

//   const resetUpload = () => {
//     setUploadResult(null);
//     setError("");
//     setProgress(0);
//   };

//   const formatFileSize = (bytes: number): string => {
//     if (bytes === 0) return '0 Bytes';
//     const k = 1024;
//     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
//       <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-indigo-600 to-purple-700 px-6 py-8">
//           <div className="flex items-center space-x-3">
//             <Command className="w-8 h-8 text-white" />
//             <div>
//               <h1 className="text-2xl font-bold text-white">Update Command Uploader</h1>
//               <p className="text-indigo-100 mt-1">Import files to update system commands and configurations</p>
//             </div>
//           </div>
//         </div>

//         <div className="p-6">
//           {/* Upload Section */}
//           {!uploadResult && (
//             <div className="space-y-6">
//               {/* File Drop Zone */}
//               <div
//                 className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
//                   dragActive
//                     ? 'border-indigo-400 bg-indigo-50'
//                     : file
//                     ? 'border-green-300 bg-green-50'
//                     : 'border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100'
//                 }`}
//                 onDrop={handleDrop}
//                 onDragOver={handleDragOver}
//                 onDragLeave={handleDragLeave}
//               >
//                 <input
//                   id="file-input"
//                   type="file"
//                   onChange={handleFileInputChange}
//                   className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                   disabled={uploading}
//                 />
                
//                 {file ? (
//                   <div className="space-y-4">
//                     <FileText className="w-16 h-16 text-green-500 mx-auto" />
//                     <div>
//                       <p className="text-lg font-medium text-green-700">{file.name}</p>
//                       <p className="text-sm text-gray-600">{formatFileSize(file.size)}</p>
//                     </div>
//                     <button
//                       type="button"
//                       onClick={removeFile}
//                       className="inline-flex items-center px-3 py-1 text-sm bg-red-100 text-red-700 rounded-full hover:bg-red-200 transition-colors"
//                     >
//                       <Trash2 className="w-4 h-4 mr-1" />
//                       Remove
//                     </button>
//                   </div>
//                 ) : (
//                   <div className="space-y-4">
//                     <Upload className="w-16 h-16 text-gray-400 mx-auto" />
//                     <div>
//                       <p className="text-lg font-medium text-gray-700">
//                         Drop your file here or click to browse
//                       </p>
//                       <p className="text-sm text-gray-500 mt-2">
//                         Supports various file formats up to 10MB
//                       </p>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Progress Bar */}
//               {(uploading || progress > 0) && (
//                 <div className="bg-gray-50 rounded-lg p-4">
//                   <div className="flex justify-between items-center mb-2">
//                     <span className="text-sm font-medium text-gray-700">Upload Progress</span>
//                     <span className="text-sm text-gray-500">{progress}%</span>
//                   </div>
//                   <div className="w-full bg-gray-200 rounded-full h-2">
//                     <div 
//                       className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
//                       style={{ width: `${progress}%` }}
//                     ></div>
//                   </div>
//                 </div>
//               )}

//               {/* Debug Info */}
//               <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
//                 <h3 className="font-medium text-yellow-900 mb-2">⚠️ Troubleshooting:</h3>
//                 <div className="text-sm text-yellow-800 space-y-1">
//                   <p>1. Ensure your server is running on the correct port</p>
//                   <p>2. Check that the /api/import2 route is configured</p>
//                   <p>3. Verify CORS is configured for cross-origin requests</p>
//                   <p>4. Check browser console for detailed error logs</p>
//                 </div>
//               </div>

//               {/* Error Display */}
//               {error && (
//                 <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
//                   <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
//                   <div>
//                     <h4 className="font-medium text-red-900">Upload Error</h4>
//                     <p className="text-red-700 text-sm mt-1">{error}</p>
//                   </div>
//                 </div>
//               )}

//               {/* Upload Button */}
//               <div className="flex justify-center">
//                 <button
//                   type="button"
//                   onClick={uploadFile}
//                   disabled={!file || uploading}
//                   className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                 >
//                   {uploading ? (
//                     <>
//                       <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
//                       Uploading {progress}%
//                     </>
//                   ) : (
//                     <>
//                       <Upload className="w-5 h-5 mr-2" />
//                       Upload & Process
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Success Results */}
//           {uploadResult && (
//             <div className="space-y-6">
//               <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
//                 <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
//                 <h3 className="text-xl font-semibold text-green-900 mb-2">Upload Successful!</h3>
//                 <p className="text-green-700">{uploadResult.message}</p>
//               </div>

//               {/* Additional Result Data */}
//               {uploadResult.data && (
//                 <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//                   <h3 className="font-medium text-blue-900 mb-2">Processing Results:</h3>
//                   <pre className="text-sm text-blue-800 bg-white p-3 rounded border overflow-auto">
//                     {JSON.stringify(uploadResult.data, null, 2)}
//                   </pre>
//                 </div>
//               )}

//               {/* Actions */}
//               <div className="flex justify-center space-x-4">
//                 <button
//                   type="button"
//                   onClick={resetUpload}
//                   className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
//                 >
//                   <RefreshCw className="w-5 h-5 mr-2" />
//                   Upload Another File
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UpdateCommandUploader;