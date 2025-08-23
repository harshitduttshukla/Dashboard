// import React, { useState } from 'react';



// type CoverageItem = {
//   function_name: string;
//   function_type: string;
// };

// const BASE_URL = import.meta.env.VITE_API_BASE_URL 
// console.log("BASE_URL =", BASE_URL);

// const Api1: React.FC = () => {
//   const [make, setMake] = useState('');
//   const [data, setData] = useState<CoverageItem[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleSearch = () => {
//     if (!make.trim()) {
//       setError('Please enter a car make.');
//       return;
//     }

//     setLoading(true);
//     setError('');

//     const url = `${BASE_URL}api/fetch_coverage?make=${encodeURIComponent(make)}`;

//     fetch(url)
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error(`HTTP error! status: ${res.status}`);
//         }
//         return res.json();
//       })
//       .then((result) => {
//         setData(result.data || []);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setError('Failed to fetch data.');
//         setLoading(false);
//       });
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg mt-6">
//       <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
//         Search Car Make
//       </h2>

//       <div className="flex flex-col sm:flex-row gap-4 mb-6">
//         <input
//           type="text"
//           value={make}
//           onChange={(e) => setMake(e.target.value)}
//           placeholder="Enter car make (e.g. Hyundai)"
//           className="border border-gray-300 px-4 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <button
//           onClick={handleSearch}
//           className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
//         >
//           Search
//         </button>
//       </div>

//       {loading && <p className="text-blue-500 font-medium">Loading...</p>}
//       {error && <p className="text-red-600 font-medium">{error}</p>}

//       {data.length > 0 && (
//         <div className="overflow-x-auto">
//           <table className="min-w-full border border-gray-300 shadow-sm rounded-md">
//             <thead>
//               <tr className="bg-gray-100 text-gray-700">
//                 <th className="border px-4 py-3 text-left">Function Name</th>
//                 <th className="border px-4 py-3 text-left">Function Type</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.map((item, idx) => (
//                 <tr key={idx} className="hover:bg-gray-50">
//                   <td className="border px-4 py-2">{item.function_name}</td>
//                   <td className="border px-4 py-2">{item.function_type}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Api1;












import { useEffect, useState } from 'react';

interface CoverageItem {
  function_name: string;
  function_type: string;
}

const ITEMS_PER_PAGE = 30;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const GetCoverage = () => {
  const [coverages, setCoverages] = useState<CoverageItem[]>([]);
  const [make, setMake] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: ITEMS_PER_PAGE.toString(),
        ...(make ? { make } : {}),
      });

      const response = await fetch(`${API_BASE_URL}api/getCoverage?${params.toString()}`);

      if (!response.ok) throw new Error('Failed to fetch coverage data');

      const json = await response.json();
      if (json && Array.isArray(json.coverages)) {
        setCoverages(json.coverages);
        setTotal(json.total || 0);
      } else {
        setError('Invalid response format');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  const handleSearch = () => {
    setPage(1);
    fetchData();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg mt-6">
      <h2 className="text-2xl font-bold mb-4">Coverage Data</h2>

      {/* Filter */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter car make (e.g. Hyundai)"
          value={make}
          onChange={(e) => setMake(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {loading && <p className="text-blue-500">Loading...</p>}

      {/* Table */}
      {coverages.length > 0 && (
        <>
          <p className="mb-4 text-gray-600">
            Showing <strong>{coverages.length}</strong> out of <strong>{total}</strong> results
          </p>
          <table className="min-w-full bg-white border border-gray-200 text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="border px-4 py-3 text-left">Function Name</th>
                <th className="border px-4 py-3 text-left">Function Type</th>
              </tr>
            </thead>
            <tbody>
              {coverages.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{item.function_name}</td>
                  <td className="border px-4 py-2">{item.function_type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
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
      )}
    </div>
  );
};

export default GetCoverage;
