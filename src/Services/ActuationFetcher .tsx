

// import { useState } from "react";


// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ;


// const ActuationFetcher = () => {
//   const [make, setMake] = useState("");
//   const [model, setModel] = useState("");
//   const [year, setYear] = useState("");
//   const [data, setData] = useState<any>(null);
//   const [loading, setLoading] = useState(false);

//   const fetchData = async () => {
//     if (!make.trim() || !model.trim() || !year.trim()) {
//       alert("Please fill Make, Model, and Year.");
//       return;
//     }

//     setLoading(true);

    

//     const url = `${API_BASE_URL}api/fetch_actuation_command?make=${make}&model=${model}&year=${year}`
//     // const url = `http://13.202.193.4:3000/api/fetch_actuation_command?make=${encodeURIComponent(make)}&model=${encodeURIComponent(model)}&year=${year}`
//     // const url = `http://13.202.193.4:3000/api/fetch_actuation_command?make=Mahindra&model=Tuv300&year=2020`

//     try {
//       const res = await fetch(url);
//       const json = await res.json();
//       const parsed = JSON.parse(json.contents);
//       setData(parsed.data?.[0] || null);
//     } catch (error) {
//       console.error("Fetch error:", error);
//       setData(null);
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="p-6 max-w-5xl mx-auto">
//       <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">Actuation Commands Viewer</h1>

//       <div className="bg-white border rounded-lg shadow-sm p-6 mb-6">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           <input
//             className="border px-4 py-2 rounded"
//             placeholder="Make"
//             value={make}
//             onChange={(e) => setMake(e.target.value)}
//           />
//           <input
//             className="border px-4 py-2 rounded"
//             placeholder="Model"
//             value={model}
//             onChange={(e) => setModel(e.target.value)}
//           />
//           <input
//             className="border px-4 py-2 rounded"
//             placeholder="Year"
//             value={year}
//             onChange={(e) => setYear(e.target.value)}
//           />
//           <button
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//             onClick={fetchData}
//           >
//             Fetch
//           </button>
//         </div>
//       </div>

//       {loading && <p className="text-blue-500 text-center">Loading data...</p>}

//       {data && (
//         <div className="bg-white border rounded-lg shadow-sm p-6">
//           <h2 className="text-xl font-semibold mb-2">{data.actuation_type}</h2>
//           <p className="italic text-gray-600 mb-4">{data.message}</p>

//           {data.details?.length > 0 ? (
//             <div className="overflow-x-auto">
//               <table className="min-w-full text-sm border">
//                 <thead className="bg-gray-100 text-gray-700">
//                   <tr>
//                     {Object.keys(data.details[0]).map((key) => (
//                       <th key={key} className="border px-3 py-2 text-left">{key}</th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {data.details.map((item: any, index: number) => (
//                     <tr key={index} className="hover:bg-gray-50">
//                       {Object.keys(item).map((key) => (
//                         <td key={key} className="border px-3 py-2">
//                           {typeof item[key] === "boolean"
//                             ? item[key] ? "✔️" : "❌"
//                             : item[key] ?? "-"}
//                         </td>
//                       ))}
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           ) : (
//             <p className="text-gray-500">No details available.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ActuationFetcher;






















// import { useEffect, useState } from "react";

// type ActuationDetail = {
//   actuation_type: string;
//   pid: string | null;
//   actuation_subtype: string | null;
//   last_subtype: string | null;
//   seed_key_variant: string | null;
//   message: string | null;
//   message_item: boolean;
//   success_check: string | null;
// };

// type ActuationGroup = {
//   actuation_type: string;
//   actuation_subtype: string[];
//   message: string;
//   details: ActuationDetail[];
// };

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// const ITEMS_PER_PAGE = 10;

// const ActuationFetcher = () => {
//   const [make, setMake] = useState("");
//   const [model, setModel] = useState("");
//   const [year, setYear] = useState("");
//   const [data, setData] = useState<ActuationGroup[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [page, setPage] = useState(1);
//   const [total, setTotal] = useState(0);

//   const fetchData = async (resetPage = false) => {
//     // if (!make.trim() || !model.trim() || !year.trim()) {
//     //   setError("Please fill Make, Model, and Year.");
//     //   return;
//     // }

//     setLoading(true);
//     setError("");
//     if (resetPage) setPage(1);

//     const params = new URLSearchParams({
//       make,
//       model,
//       year,
//       page: resetPage ? "1" : page.toString(),
//       limit: ITEMS_PER_PAGE.toString(),
//     });

//     const url = `${API_BASE_URL}api/ActuationCommands?${params.toString()}`;

//     try {
//       const res = await fetch(url);
//       const json = await res.json();

//       if (json.data && json.data.length > 0) {
//         setData(json.data);
//         setTotal(json.total || 0);
//       } else {
//         setData([]);
//         setError("No actuation data found.");
//         setTotal(0);
//       }
//     } catch (err) {
//       console.error("Fetch error:", err);
//       setError("Failed to fetch actuation commands.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch on first render
//   useEffect(() => {
//     fetchData(true);
//   }, []);

//   // Re-fetch when page changes
//   useEffect(() => {
//     // if (make && model && year) {
//       fetchData();
//     // }
//   }, [page]);

//   const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

//   return (
//     <div className="min-h-screen flex flex-col p-6 max-w-6xl mx-auto">
//       <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">
//         Actuation Commands Viewer
//       </h1>

//       {/* Search box */}
//       <div className="bg-white border rounded-lg shadow-sm p-6 mb-6">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           <input
//             className="border px-4 py-2 rounded"
//             placeholder="Make"
//             value={make}
//             onChange={(e) => setMake(e.target.value)}
//           />
//           <input
//             className="border px-4 py-2 rounded"
//             placeholder="Model"
//             value={model}
//             onChange={(e) => setModel(e.target.value)}
//           />
//           <input
//             className="border px-4 py-2 rounded"
//             placeholder="Year"
//             value={year}
//             onChange={(e) => setYear(e.target.value)}
//           />
//           <button
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//             onClick={() => fetchData(true)}
//           >
//             Fetch
//           </button>
//         </div>
//       </div>

//       {loading && <p className="text-blue-500 text-center">Loading data...</p>}
//       {error && <p className="text-red-500 text-center">{error}</p>}

//       {/* Data display */}
//       <div className="flex-1 overflow-auto space-y-6">
//         {data.length > 0 ? (
//           data.map((group, idx) => (
//             <div
//               key={idx}
//               className="bg-white border rounded-lg shadow-sm p-6"
//             >
//               <h2 className="text-xl font-semibold mb-2">
//                 {group.actuation_type}
//               </h2>
//               <p className="italic text-gray-600 mb-4">{group.message}</p>

//               {group.details?.length > 0 ? (
//                 <div className="overflow-x-auto">
//                   <table className="min-w-full text-sm border">
//                     <thead className="bg-gray-100 text-gray-700">
//                       <tr>
//                         {Object.keys(group.details[0]).map((key) => (
//                           <th
//                             key={key}
//                             className="border px-3 py-2 text-left"
//                           >
//                             {key}
//                           </th>
//                         ))}
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {group.details.map((item, rowIdx) => (
//                         <tr key={rowIdx} className="hover:bg-gray-50">
//                           {Object.keys(item).map((key) => (
//                             <td key={key} className="border px-3 py-2">
//                               {typeof item[key as keyof ActuationDetail] ===
//                               "boolean"
//                                 ? item[key as keyof ActuationDetail]
//                                   ? "✔️"
//                                   : "❌"
//                                 : item[key as keyof ActuationDetail] ?? "-"}
//                             </td>
//                           ))}
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               ) : (
//                 <p className="text-gray-500">No details available.</p>
//               )}
//             </div>
//           ))
//         ) : (
//           !loading && (
//             <p className="text-center text-gray-500">No data to display.</p>
//           )
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

// export default ActuationFetcher;







import { useEffect, useState, useCallback, useRef } from "react";

type ActuationDetail = {
  actuation_type: string;
  pid: string | null;
  actuation_subtype: string | null;
  last_subtype: string | null;
  seed_key_variant: string | null;
  message: string | null;
  message_item: boolean;
  success_check: string | null;
};

type ActuationGroup = {
  actuation_type: string;
  actuation_subtype: string[];
  message: string;
  details: ActuationDetail[];
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const ITEMS_PER_PAGE = 10;

const ActuationFetcher = () => {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [data, setData] = useState<ActuationGroup[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  
  // Add ref to track the current request
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(async (targetPage?: number, currentMake?: string, currentModel?: string, currentYear?: string) => {
    // Cancel previous request if it exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller for this request
    abortControllerRef.current = new AbortController();

    setLoading(true);
    setError("");

    const currentPage = targetPage ?? page;
    const searchMake = currentMake !== undefined ? currentMake : make;
    const searchModel = currentModel !== undefined ? currentModel : model;
    const searchYear = currentYear !== undefined ? currentYear : year;

    const params = new URLSearchParams();
    
    // Only add parameters if they have values
    if (searchMake.trim()) params.set('make', searchMake);
    if (searchModel.trim()) params.set('model', searchModel);
    if (searchYear.trim()) params.set('year', searchYear);
    
    // Always add pagination parameters
    params.set('page', currentPage.toString());
    params.set('limit', ITEMS_PER_PAGE.toString());

    const url = `${API_BASE_URL}api/ActuationCommands?${params.toString()}`;

    try {
      const res = await fetch(url, {
        signal: abortControllerRef.current.signal
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const json = await res.json();

      if (json.data && json.data.length > 0) {
        setData(json.data);
        setTotal(json.total || 0);
        setError("");
      } else {
        setData([]);
        if (searchMake || searchModel || searchYear) {
          setError("No actuation data found for the specified criteria.");
        } else {
          setError("No actuation data available.");
        }
        setTotal(0);
      }
    } catch (err) {
      // Don't show error if request was aborted
      if (err instanceof Error && err.name === 'AbortError') {
        return;
      }
      
      console.error("Fetch error:", err);
      setError("Failed to fetch actuation commands.");
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  }, []);

  // Fetch on first render - load all data by default
  useEffect(() => {
    fetchData(1);
  }, []);

  // Handle search button click
  const handleSearch = () => {
    setPage(1);
    fetchData(1, make, model, year);
  };

  // Handle page navigation
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    fetchData(newPage, make, model, year);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen flex flex-col p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">
        Actuation Commands Viewer
      </h1>

      {/* Search box */}
      <div className="bg-white border rounded-lg shadow-sm p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            className="border px-4 py-2 rounded"
            placeholder="Make"
            value={make}
            onChange={(e) => setMake(e.target.value)}
          />
          <input
            className="border px-4 py-2 rounded"
            placeholder="Model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
          <input
            className="border px-4 py-2 rounded"
            placeholder="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? "Loading..." : "Fetch"}
          </button>
        </div>
      </div>

      {loading && (
        <div className="text-blue-500 text-center flex items-center justify-center gap-2 py-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          <span className="text-lg">Loading data...</span>
        </div>
      )}
      {error && <p className="text-red-500 text-center py-4 text-lg">{error}</p>}

      {/* Data display */}
      <div className="flex-1 overflow-auto space-y-6">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-blue-500 text-xl">Loading actuation data...</p>
              <p className="text-gray-500 mt-2">Please wait while we fetch the data</p>
            </div>
          </div>
        ) : data.length > 0 ? (
          data.map((group, idx) => (
            <div
              key={idx}
              className="bg-white border rounded-lg shadow-sm p-6"
            >
              <h2 className="text-xl font-semibold mb-2">
                {group.actuation_type}
              </h2>
              <p className="italic text-gray-600 mb-4">{group.message}</p>

              {group.details?.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm border">
                    <thead className="bg-gray-100 text-gray-700">
                      <tr>
                        {Object.keys(group.details[0]).map((key) => (
                          <th
                            key={key}
                            className="border px-3 py-2 text-left"
                          >
                            {key.replace(/_/g, " ").toUpperCase()}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {group.details.map((item, rowIdx) => (
                        <tr key={rowIdx} className="hover:bg-gray-50">
                          {Object.keys(item).map((key) => (
                            <td key={key} className="border px-3 py-2">
                              {typeof item[key as keyof ActuationDetail] ===
                              "boolean"
                                ? item[key as keyof ActuationDetail]
                                  ? "✔️"
                                  : "❌"
                                : item[key as keyof ActuationDetail] ?? "-"}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500">No details available.</p>
              )}
            </div>
          ))
        ) : (
          !error && (
            <div className="text-center py-20">
              <div className="text-gray-400 text-6xl mb-4">📊</div>
              <p className="text-gray-500 text-xl">No data to display</p>
              <p className="text-gray-400 mt-2">Try searching with different criteria</p>
            </div>
          )
        )}
      </div>

      {/* Pagination */}
      {data.length > 0 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={() => handlePageChange(Math.max(1, page - 1))}
            disabled={page === 1 || loading}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition"
          >
            Previous
          </button>
          
          {/* Page numbers */}
          <div className="flex gap-2">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (page <= 3) {
                pageNum = i + 1;
              } else if (page >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = page - 2 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  disabled={loading}
                  className={`px-3 py-2 rounded transition ${
                    page === pageNum
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  } disabled:opacity-50`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
            disabled={page === totalPages || loading}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition"
          >
            Next
          </button>
        </div>
      )}
      
      {totalPages > 0 && (
        <p className="text-center text-sm text-gray-500 mt-2">
          Showing page {page} of {totalPages} ({total} total items)
        </p>
      )}
    </div>
  );
};

export default ActuationFetcher;