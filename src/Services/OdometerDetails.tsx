

// import React, { useEffect, useState } from "react";


// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ;


// const OdometerDetails: React.FC = () => {
//   const [odometerData, setOdometerData] = useState<any[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string>("");
//   const [make, setMake] = useState<string>("Mahindra");  // Default make
//   const [model, setModel] = useState<string>("Bolero");  // Default model
//   const [year, setYear] = useState<string>("2021");      // Default year

//   const fetchOdometerData = async () => {
//     setLoading(true);
//     setError("");

//     try {
      
//       const url = `${API_BASE_URL}api/fetch_odometer?make=${encodeURIComponent(make)}&model${encodeURIComponent(model)}&year=${year}`;

//       const response = await fetch(url);
//       const result = await response.json();

//       if (result.contents) {
//         const json = JSON.parse(result.contents);

//         if (json.data && Array.isArray(json.data)) {
//           setOdometerData(json.data);
//         } else {
//           setOdometerData([]);
//           setError("No odometer data found.");
//         }
//       } else {
//         setOdometerData([]);
//         setError("Invalid response from proxy.");
//       }
//     } catch (err) {
//       console.error("Error fetching odometer data:", err);
//       setOdometerData([]);
//       setError("Failed to fetch odometer data. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Function to handle make, model, and year input changes
//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     type: string
//   ) => {
//     if (type === "make") setMake(e.target.value);
//     if (type === "model") setModel(e.target.value);
//     if (type === "year") setYear(e.target.value);
//   };

//   // Fetch odometer data when component mounts or input changes
//   useEffect(() => {
//     fetchOdometerData();
//   }, [make, model, year]);

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <h1 className="text-2xl font-bold text-center text-green-700 mb-4">
//         Odometer Details
//       </h1>

//       <div className="mb-4">
//         <label className="block text-gray-700">Make:</label>
//         <input
//           type="text"
//           value={make}
//           onChange={(e) => handleInputChange(e, "make")}
//           className="w-full p-2 mt-2 border border-gray-300 rounded"
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block text-gray-700">Model:</label>
//         <input
//           type="text"
//           value={model}
//           onChange={(e) => handleInputChange(e, "model")}
//           className="w-full p-2 mt-2 border border-gray-300 rounded"
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block text-gray-700">Year:</label>
//         <input
//           type="text"
//           value={year}
//           onChange={(e) => handleInputChange(e, "year")}
//           className="w-full p-2 mt-2 border border-gray-300 rounded"
//         />
//       </div>

//       <button
//         onClick={fetchOdometerData}
//         className="w-full bg-green-500 text-white p-2 rounded"
//       >
//         Fetch Odometer Data
//       </button>

//       {loading && <p className="text-blue-500 text-center">Loading odometer data...</p>}
//       {error && <p className="text-red-500 text-center">{error}</p>}

//       {!loading && odometerData.length > 0 && (
//         <div className="border border-gray-300 rounded p-4 shadow-sm">
//           <ul className="list-disc list-inside text-gray-700 space-y-1">
//             {odometerData.map((item, idx) => (
//               <li key={idx}>
//                 <strong>Header:</strong> {item.header} <br />
//                 <strong>PID:</strong> {item.pid} <br />
//                 <strong>Formula (Metric):</strong> {item.formula_metric} <br />
//                 <strong>Formula (Imperial):</strong> {item.formula_imperial} <br />
//                 <strong>Unit (Metric):</strong> {item.unit_metric} <br />
//                 <strong>Unit (Imperial):</strong> {item.unit_imperial} <br />
//                 <strong>System:</strong> {item.system} <br />
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OdometerDetails;


import React, { useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const OdometerDetails: React.FC = () => {
  const [odometerData, setOdometerData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Default blank values (so API can return "any" data if it supports no filters)
  const [make, setMake] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [year, setYear] = useState<string>("");

  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);

  const fetchOdometerData = async () => {
    setLoading(true);
    setError("");

    try {
      const url = `${API_BASE_URL}api/OdometerAPI?make=${encodeURIComponent(
        make
      )}&model=${encodeURIComponent(model)}&year=${encodeURIComponent(
        year
      )}&page=${page}&limit=${limit}`;

      const response = await fetch(url);
      const result = await response.json();

      if (Array.isArray(result.data)) {
        setOdometerData(result.data);
        setTotal(typeof result.total === "number" ? result.total : result.data.length);
        if (result.data.length === 0) setError("No odometer data found.");
      } else {
        setOdometerData([]);
        setError("No odometer data found.");
      }
    } catch (err) {
      console.error("Error fetching odometer data:", err);
      setOdometerData([]);
      setError("Failed to fetch odometer data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Auto-fetch on mount and whenever page changes
  useEffect(() => {
    fetchOdometerData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <div className="flex-1 p-6 ml-5 bg-gray-50 h-screen overflow-auto">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
        Odometer Details
      </h1>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <input
          type="text"
          value={make}
          onChange={(e) => setMake(e.target.value)}
          placeholder="Make"
          className="p-3 text-base md:text-lg border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="Model"
          className="p-3 text-base md:text-lg border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="Year"
          className="p-3 text-base md:text-lg border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        onClick={() => {
          setPage(1);
          fetchOdometerData();
        }}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-base md:text-lg font-semibold mb-6 shadow"
      >
        Fetch Odometer Data
      </button>

      {loading && <p className="text-blue-600 text-center">Loading...</p>}
      {error && !loading && <p className="text-red-500 text-center">{error}</p>}

      {!loading && odometerData.length > 0 && (
        <div className="overflow-auto border rounded-lg shadow bg-white">
          <table className="w-full border-collapse">
            <thead className="bg-blue-100 sticky top-0">
              <tr>
                <th className="p-3 border text-left">Header</th>
                <th className="p-3 border text-left">PID</th>
                <th className="p-3 border text-left">Protocol</th>
                <th className="p-3 border text-left">System</th>
                <th className="p-3 border text-left">Formula (Metric)</th>
                <th className="p-3 border text-left">Formula (Imperial)</th>
                <th className="p-3 border text-left">Unit (Metric)</th>
                <th className="p-3 border text-left">Unit (Imperial)</th>
              </tr>
            </thead>
            <tbody>
              {odometerData.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="p-3 border">{item.header ?? "-"}</td>
                  <td className="p-3 border">{item.pid ?? "-"}</td>
                  <td className="p-3 border">{item.protocol ?? "-"}</td>
                  <td className="p-3 border">{item.system ?? "-"}</td>
                  <td className="p-3 border">{item.formula_metric ?? "-"}</td>
                  <td className="p-3 border">{item.formula_imperial ?? "-"}</td>
                  <td className="p-3 border">{item.unit_metric ?? "-"}</td>
                  <td className="p-3 border">{item.unit_imperial ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination (centered + close spacing) */}
      {!loading && odometerData.length > 0 && (
        <div className="flex justify-center items-center gap-4 mt-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md disabled:opacity-50 disabled:hover:bg-blue-600"
          >
            Previous
          </button>

          <span className="text-sm md:text-base font-medium">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page >= totalPages}
            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md disabled:opacity-50 disabled:hover:bg-blue-600"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default OdometerDetails;
