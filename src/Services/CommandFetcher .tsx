// import React, { useState } from "react";

// type Detail = {
//   pid: string;
//   command_type: string;
//   function_name: string;
//   variant_id: any;
//   subfunction: any;
//   message: any;
//   loop_flag: boolean;
//   loop_num: any;
//   input_format: any;
//   loop_pid_array: any;
//   input_map: any;
//   wait_pid: any;
//   input_encoding_formula: any;
//   hard_coded: boolean;
// };

// type SPFCommand = {
//   function_name: string;
//   hard_coded: boolean;
//   detail: Detail[];
// };

// const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// class ErrorBoundary extends React.Component {
//   state = { hasError: false };

//   static getDerivedStateFromError(_: Error) {
//     return { hasError: true };
//   }

//   componentDidCatch(error: Error, info: React.ErrorInfo) {
//     console.error("Error caught by Error Boundary:", error, info);
//   }

//   render() {
//     if ((this.state as any).hasError) {
//       return <h1>Something went wrong. Please try again later.</h1>;
//     }

//     return this.props.children;
//   }
// }

// const SPFCommands: React.FC = () => {
//   const [make, setMake] = useState("");
//   const [model, setModel] = useState("");
//   const [year, setYear] = useState("");
//   const [data, setData] = useState<SPFCommand[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const fetchData = async () => {
//     const trimmedMake = make.trim();
//     const trimmedModel = model.trim();
//     const trimmedYear = year.trim();

//     if (!trimmedMake || !trimmedModel || !trimmedYear || isNaN(Number(trimmedYear))) {
//       setError("Please enter valid Make, Model, and numeric Year.");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     setData([]);

//     try {
//       const normalizedMake = trimmedMake.charAt(0).toUpperCase() + trimmedMake.slice(1).toLowerCase();
//       const url = `${BASE_URL}api/fetch_SPF_command_new?make=${normalizedMake}&model=${trimmedModel}&year=${trimmedYear}`;

//       console.log("Request URL:", url);

//       const response = await fetch(url);
//       const json = await response.json();

//       console.log("API Response:", json);

//       if (json.data && json.data.length > 0) {
//         const commands: SPFCommand[] = json.data.map((item: any) => ({
//           function_name: item.function_name,
//           hard_coded: item.hard_coded,
//           detail: item.details || [],
//         }));
//         setData(commands);
//       } else {
//         setError("No data found for the given car details.");
//       }
//     } catch (err) {
//       console.error("Error fetching data:", err);
//       setError("Failed to fetch SPF commands. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <ErrorBoundary>
//       <div className="p-6 max-w-6xl mx-auto">
//         <h1 className="text-2xl font-semibold mb-4 text-center text-green-700">
//           SPF Commands Viewer
//         </h1>

//         <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center">
//           <input
//             type="text"
//             value={make}
//             onChange={(e) => setMake(e.target.value)}
//             placeholder="e.g. Hyundai"
//             className="bg-white border px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
//           />
//           <input
//             type="text"
//             value={model}
//             onChange={(e) => setModel(e.target.value)}
//             placeholder="e.g. i20"
//             className="bg-white border px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
//           />
//           <input
//             type="text"
//             value={year}
//             onChange={(e) => setYear(e.target.value)}
//             placeholder="e.g. 2020"
//             className="bg-white border px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
//           />
//           <button
//             onClick={fetchData}
//             className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded transition"
//           >
//             Fetch SPF
//           </button>
//         </div>

//         {loading && <p className="text-green-500 text-center">Loading...</p>}
//         {error && <p className="text-red-500 text-center">{error}</p>}

//         {data.length > 0 && (
//           <div className="space-y-6">
//             {data.map((item, idx) => (
//               <div key={idx} className="border border-gray-300 rounded-lg shadow-sm p-4">
//                 <h2 className="text-lg font-semibold text-gray-800 mb-2">
//                   {item.function_name}
//                 </h2>
//                 <p className="mb-2 text-sm text-gray-600">
//                   <strong>Hard Coded:</strong> {item.hard_coded ? "True" : "False"}
//                 </p>

//                 {item.detail && item.detail.length > 0 ? (
//                   <div className="overflow-x-auto">
//                     <table className="min-w-full text-sm border">
//                       <thead className="bg-gray-100 text-gray-700">
//                         <tr>
//                           <th className="border px-3 py-2 text-left">PID</th>
//                           <th className="border px-3 py-2 text-left">Message</th>
//                           <th className="border px-3 py-2 text-left">Command Type</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {item.detail.map((d, detailIdx) => (
//                           <tr key={detailIdx} className="hover:bg-gray-50">
//                             <td className="border px-3 py-1">{d?.pid ?? "N/A"}</td>
//                             <td className="border px-3 py-1">{d?.message ?? "N/A"}</td>
//                             <td className="border px-3 py-1">{d?.command_type ?? "N/A"}</td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 ) : (
//                   <p className="text-gray-500 italic">No command details available</p>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </ErrorBoundary>
//   );
// };

// export default SPFCommands;


// import React, { useEffect, useState } from "react";

// type Detail = {
//   pid: string;
//   command_type: string;
//   function_name: string;
//   message: string | null;
//   hard_coded: boolean;
// };

// type SPFCommand = {
//   function_name: string;
//   hard_coded: boolean;
//   details: Detail[];
// };

// const BASE_URL = import.meta.env.VITE_API_BASE_URL;
// const ITEMS_PER_PAGE = 10; // 👈 adjust how many per page

// const SPFCommands: React.FC = () => {
//   const [make, setMake] = useState("");
//   const [model, setModel] = useState("");
//   const [year, setYear] = useState("");
//   const [data, setData] = useState<SPFCommand[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const [page, setPage] = useState(1);
//   const [total, setTotal] = useState(0);

//   const fetchData = async () => {
//     setLoading(true);
//     setError("");
//     setData([]);

//     try {
//       const params = new URLSearchParams();
//       if (make) params.append("make", make);
//       if (model) params.append("model", model);
//       if (year) params.append("year", year);

//       params.append("page", page.toString());
//       params.append("limit", ITEMS_PER_PAGE.toString());

//       const url = `${BASE_URL}api/SPFCommands?${params.toString()}`;
//       const response = await fetch(url);
//       const json = await response.json();

//       if (json.data && json.data.length > 0) {
//         setData(json.data);
//         setTotal(json.total || 0);
//       } else {
//         setError("No data found for the given car details.");
//         setTotal(0);
//       }
//     } catch (err) {
//       console.error("Error fetching data:", err);
//       setError("Failed to fetch SPF commands. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 👇 default fetch on first load
//   useEffect(() => {
//     fetchData();
//   }, [page]); // re-fetch when page changes

//   const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <h1 className="text-2xl font-semibold mb-4 text-center text-green-700">
//         SPF Commands Viewer
//       </h1>

//       {/* Input fields */}
//       <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center">
//         <input
//           type="text"
//           value={make}
//           onChange={(e) => setMake(e.target.value)}
//           placeholder="e.g. Hyundai"
//           className="border px-4 py-2 rounded shadow-sm focus:ring-2 focus:ring-green-500"
//         />
//         <input
//           type="text"
//           value={model}
//           onChange={(e) => setModel(e.target.value)}
//           placeholder="e.g. i20"
//           className="border px-4 py-2 rounded shadow-sm focus:ring-2 focus:ring-green-500"
//         />
//         <input
//           type="text"
//           value={year}
//           onChange={(e) => setYear(e.target.value)}
//           placeholder="e.g. 2020"
//           className="border px-4 py-2 rounded shadow-sm focus:ring-2 focus:ring-green-500"
//         />
//         <button
//           onClick={() => {
//             setPage(1); // reset to first page on new search
//             fetchData();
//           }}
//           className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded transition"
//         >
//           Fetch SPF
//         </button>
//       </div>

//       {/* Status */}
//       {loading && <p className="text-green-500 text-center">Loading...</p>}
//       {error && <p className="text-red-500 text-center">{error}</p>}

//       {/* Data display */}
//       {data.length > 0 && (
//         <div className="space-y-6">
//           {data.map((item, idx) => (
//             <div
//               key={idx}
//               className="border border-gray-300 rounded-lg shadow-sm p-4"
//             >
//               <h2 className="text-lg font-semibold text-gray-800 mb-2">
//                 {item.function_name}
//               </h2>
//               <p className="mb-2 text-sm text-gray-600">
//                 <strong>Hard Coded:</strong>{" "}
//                 {item.hard_coded ? "True" : "False"}
//               </p>

//               {item.details && item.details.length > 0 ? (
//                 <div className="overflow-x-auto">
//                   <table className="min-w-full text-sm border">
//                     <thead className="bg-gray-100 text-gray-700">
//                       <tr>
//                         <th className="border px-3 py-2 text-left">PID</th>
//                         <th className="border px-3 py-2 text-left">Message</th>
//                         <th className="border px-3 py-2 text-left">
//                           Command Type
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {item.details.map((d, detailIdx) => (
//                         <tr key={detailIdx} className="hover:bg-gray-50">
//                           <td className="border px-3 py-1">{d.pid ?? "N/A"}</td>
//                           <td className="border px-3 py-1">
//                             {d.message ?? "N/A"}
//                           </td>
//                           <td className="border px-3 py-1">
//                             {d.command_type ?? "N/A"}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               ) : (
//                 <p className="text-gray-500 italic">
//                   No command details available
//                 </p>
//               )}
//             </div>
//           ))}

//           {/* ✅ Pagination controls */}
//           <div className="flex justify-center items-center gap-4 mt-6">
//             <button
//               onClick={() => setPage((p) => Math.max(1, p - 1))}
//               disabled={page === 1}
//               className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
//             >
//               Previous
//             </button>
//             <span>
//               Page {page} of {totalPages || 1}
//             </span>
//             <button
//               onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//               disabled={page === totalPages}
//               className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SPFCommands;















// import React, { useEffect, useState } from "react";

// type Detail = {
//   pid: string;
//   command_type: string;
//   function_name: string;
//   message: string | null;
//   hard_coded: boolean;
// };

// type SPFCommand = {
//   function_name: string;
//   hard_coded: boolean;
//   details: Detail[];
// };

// const BASE_URL = import.meta.env.VITE_API_BASE_URL; // API base URL
// const ITEMS_PER_PAGE = 30; // Number of items per page

// const SPFCommands: React.FC = () => {
//   const [make, setMake] = useState("");
//   const [model, setModel] = useState("");
//   const [year, setYear] = useState("");
//   const [data, setData] = useState<SPFCommand[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [page, setPage] = useState(1);
//   const [total, setTotal] = useState(0);

//   const fetchData = async () => {
//     setLoading(true);
//     setError("");
//     setData([]);

//     try {
//       const params = new URLSearchParams();
//       if (make) params.append("make", make);
//       if (model) params.append("model", model);
//       if (year) params.append("year", year);

//       params.append("page", page.toString());
//       params.append("limit", ITEMS_PER_PAGE.toString());

//       const url = `${BASE_URL}api/SPFCommands?${params.toString()}`;
//       const response = await fetch(url);
//       const json = await response.json();

//       if (json.data && json.data.length > 0) {
//         setData(json.data);
//         setTotal(json.total || 0);
//       } else {
//         setError("No data found for the given car details.");
//         setTotal(0);
//       }
//     } catch (err) {
//       console.error("Error fetching data:", err);
//       setError("Failed to fetch SPF commands. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch data on page load and page changes
//   useEffect(() => {
//     fetchData();
//   }, [page]);

//   const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

//   return (
//     <div className="min-h-screen flex flex-col p-6 max-w-6xl mx-auto">
//       {/* Header */}
//       <h1 className="text-2xl font-semibold mb-4 text-center text-green-700">
//         SPF Commands Viewer
//       </h1>

//       {/* Search Inputs */}
//       <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center">
//         <input
//           type="text"
//           value={make}
//           onChange={(e) => setMake(e.target.value)}
//           placeholder="e.g. Hyundai"
//           className="border px-4 py-2 rounded shadow-sm focus:ring-2 focus:ring-green-500"
//         />
//         <input
//           type="text"
//           value={model}
//           onChange={(e) => setModel(e.target.value)}
//           placeholder="e.g. i20"
//           className="border px-4 py-2 rounded shadow-sm focus:ring-2 focus:ring-green-500"
//         />
//         <input
//           type="text"
//           value={year}
//           onChange={(e) => setYear(e.target.value)}
//           placeholder="e.g. 2020"
//           className="border px-4 py-2 rounded shadow-sm focus:ring-2 focus:ring-green-500"
//         />
//         <button
//           onClick={() => {
//             setPage(1); // Reset page on new search
//             fetchData();
//           }}
//           className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded transition"
//         >
//           Fetch SPF
//         </button>
//       </div>

//       {/* Status Messages */}
//       {loading && <p className="text-green-500 text-center">Loading...</p>}
//       {error && <p className="text-red-500 text-center">{error}</p>}

//       {/* Data Table (scrollable) */}
//       <div className="flex-1 overflow-auto space-y-6">
//         {data.length > 0 ? (
//           data.map((item, idx) => (
//             <div
//               key={idx}
//               className="border border-gray-300 rounded-lg shadow-sm p-4"
//             >
//               <h2 className="text-lg font-semibold text-gray-800 mb-2">
//                 {item.function_name}
//               </h2>
//               <p className="mb-2 text-sm text-gray-600">
//                 <strong>Hard Coded:</strong> {item.hard_coded ? "True" : "False"}
//               </p>

//               {item.details && item.details.length > 0 ? (
//                 <div className="overflow-x-auto">
//                   <table className="min-w-full text-sm border">
//                     <thead className="bg-gray-100 text-gray-700">
//                       <tr>
//                         <th className="border px-3 py-2 text-left">PID</th>
//                         <th className="border px-3 py-2 text-left">Message</th>
//                         <th className="border px-3 py-2 text-left">Command Type</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {item.details.map((d, detailIdx) => (
//                         <tr key={detailIdx} className="hover:bg-gray-50">
//                           <td className="border px-3 py-1">{d.pid ?? "N/A"}</td>
//                           <td className="border px-3 py-1">{d.message ?? "N/A"}</td>
//                           <td className="border px-3 py-1">{d.command_type ?? "N/A"}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               ) : (
//                 <p className="text-gray-500 italic">No command details available</p>
//               )}
//             </div>
//           ))
//         ) : (
//           !loading && <p className="text-center text-gray-500">No data to display</p>
//         )}
//       </div>

//       {/* Pagination */}
//       {data.length > 0 && (
//         <div className="flex justify-center items-center gap-4 mt-6">
//           <button
//             onClick={() => setPage((p) => Math.max(1, p - 1))}
//             disabled={page === 1}
//             className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
//           >
//             Previous
//           </button>
//           <span>
//             Page {page} of {totalPages || 1}
//           </span>
//           <button
//             onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//             disabled={page === totalPages}
//             className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SPFCommands;







import React, { useEffect, useState } from "react";

type Detail = {
  pid: string;
  command_type: string;
  function_name: string;
  message: string | null;
  hard_coded: boolean;
};

type SPFCommand = {
  function_name: string;
  hard_coded: boolean;
  details: Detail[];
};

const BASE_URL = import.meta.env.VITE_API_BASE_URL; // API base URL
const ITEMS_PER_PAGE = 30; // Number of items per page

const SPFCommands: React.FC = () => {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [data, setData] = useState<SPFCommand[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchData = async () => {
    setLoading(true);
    setError("");
    setData([]);

    try {
      const params = new URLSearchParams();
      if (make) params.append("make", make);
      if (model) params.append("model", model);
      if (year) params.append("year", year);

      params.append("page", page.toString());
      params.append("limit", ITEMS_PER_PAGE.toString());

      const url = `${BASE_URL}api/SPFCommands?${params.toString()}`;
      const response = await fetch(url);
      const json = await response.json();

      if (json.data && json.data.length > 0) {
        setData(json.data);
        setTotal(json.total || 0);
      } else {
        setError("No data found for the given car details.");
        setTotal(0);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch SPF commands. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on page load and page changes
  useEffect(() => {
    fetchData();
  }, [page]);

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
  const currentPageItems = data.length;

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    let start = Math.max(1, page - Math.floor(maxPagesToShow / 2));
    let end = Math.min(totalPages, start + maxPagesToShow - 1);
    
    if (end - start < maxPagesToShow - 1) {
      start = Math.max(1, end - maxPagesToShow + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="min-h-screen flex flex-col p-6 max-w-6xl mx-auto">
      {/* Header */}
      <h1 className="text-2xl font-semibold mb-4 text-center text-green-700">
        SPF Commands Viewer
      </h1>

      {/* Search Inputs */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center">
        <input
          type="text"
          value={make}
          onChange={(e) => setMake(e.target.value)}
          placeholder="e.g. Hyundai"
          className="border px-4 py-2 rounded shadow-sm focus:ring-2 focus:ring-green-500"
        />
        <input
          type="text"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="e.g. i20"
          className="border px-4 py-2 rounded shadow-sm focus:ring-2 focus:ring-green-500"
        />
        <input
          type="text"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="e.g. 2020"
          className="border px-4 py-2 rounded shadow-sm focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={() => {
            setPage(1); // Reset page on new search
            fetchData();
          }}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded transition"
        >
          Fetch SPF
        </button>
      </div>

      {/* Status Messages */}
      {loading && <p className="text-green-500 text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Data Table (scrollable) */}
      <div className="flex-1 overflow-auto space-y-6">
        {data.length > 0 ? (
          data.map((item, idx) => (
            <div
              key={idx}
              className="border border-gray-300 rounded-lg shadow-sm p-4"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                {item.function_name}
              </h2>
              <p className="mb-2 text-sm text-gray-600">
                <strong>Hard Coded:</strong> {item.hard_coded ? "True" : "False"}
              </p>

              {item.details && item.details.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm border">
                    <thead className="bg-gray-100 text-gray-700">
                      <tr>
                        <th className="border px-3 py-2 text-left">PID</th>
                        <th className="border px-3 py-2 text-left">Message</th>
                        <th className="border px-3 py-2 text-left">Command Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {item.details.map((d, detailIdx) => (
                        <tr key={detailIdx} className="hover:bg-gray-50">
                          <td className="border px-3 py-1">{d.pid ?? "N/A"}</td>
                          <td className="border px-3 py-1">{d.message ?? "N/A"}</td>
                          <td className="border px-3 py-1">{d.command_type ?? "N/A"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500 italic">No command details available</p>
              )}
            </div>
          ))
        ) : (
          !loading && <p className="text-center text-gray-500">No data to display</p>
        )}
      </div>

      {/* Pagination */}
      {data.length > 0 && (
        <div className="mt-6">
          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-2 mb-4">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              Previous
            </button>
            
            {getPageNumbers().map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setPage(pageNum)}
                className={`px-3 py-2 rounded text-sm ${
                  pageNum === page
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
              >
                {pageNum}
              </button>
            ))}
            
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              Next
            </button>
          </div>

          {/* Page Info */}
          <div className="flex justify-center items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="inline-block w-4 h-4 bg-purple-200 rounded"></span>
              <span>Page {page} of {totalPages}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-4 h-4 bg-blue-200 rounded"></span>
              <span>Total Items: {total}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-4 h-4 bg-gray-200 rounded"></span>
              <span>Current Page Items: {currentPageItems}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SPFCommands;