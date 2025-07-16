import React, { useState } from "react";

// Step 1: Define specific types
type VariantType = "Enable" | "Disable";

type CommandMap = {
  [key in VariantType]: string[];
};

type CommandData = {
  function_name: string;
  variant: VariantType[];
  commands: CommandMap;
};

const Customcommands: React.FC = () => {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [data, setData] = useState<CommandData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    const trimmedMake = make.trim();
    const trimmedModel = model.trim();
    const trimmedYear = year.trim();

    if (!trimmedMake || !trimmedModel || !trimmedYear || isNaN(Number(trimmedYear))) {
      setError("Please enter valid Make, Model, and numeric Year.");
      return;
    }

    setLoading(true);
    setError("");
    setData([]);

    try {
      const normalizedMake =
        trimmedMake.charAt(0).toUpperCase() + trimmedMake.slice(1).toLowerCase();

      const originalUrl = `http://13.202.193.4:3000/api/fetch_custom_commands?make=${normalizedMake}&model=${trimmedModel}&year=${trimmedYear}`;
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(originalUrl)}`;

      const response = await fetch(proxyUrl);
      const result = await response.json();
      const json = JSON.parse(result.contents);

      const normalizedData: CommandData[] = json.data.map((item: any) => ({
        function_name: item.function_name,
        variant: item.variant,
        commands: item.commands[0],
      }));

      setData(normalizedData);
    } catch (err) {
      setError("Failed to fetch data. Please check your input or try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4 text-center text-blue-700">
        Custom Commands Viewer
      </h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center">
        <input
          type="text"
          value={make}
          onChange={(e) => setMake(e.target.value)}
          placeholder="e.g. Hyundai"
          className="bg-white border px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="e.g. i20"
          className="bg-white border px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="e.g. 2018"
          className="bg-white border px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={fetchData}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-blue-500 text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {data.length > 0 && (
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full border border-gray-300 shadow-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="border px-4 py-2 text-left">Function Name</th>
                <th className="border px-4 py-2 text-left">Variant</th>
                <th className="border px-4 py-2 text-left">Commands</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, idx) =>
                item.variant.map((variant) => (
                  <tr key={`${idx}-${variant}`} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{item.function_name}</td>
                    <td className="border px-4 py-2">{variant}</td>
                    <td className="border px-4 py-2 whitespace-pre-wrap">
                      {item.commands[variant]?.join("\n")}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Customcommands;




























// import React, { useState } from "react";

// type VariantType = "Enable" | "Disable";

// type CommandMap = {
//   [key in VariantType]?: string[];
// };

// type CommandData = {
//   function_name: string;
//   variant: VariantType[];
//   commands: CommandMap;
// };

// const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/";

// const Customcommands: React.FC = () => {
//   const [make, setMake] = useState("");
//   const [model, setModel] = useState("");
//   const [year, setYear] = useState("");
//   const [data, setData] = useState<CommandData[]>([]);
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
//       const normalizedMake =
//         trimmedMake.charAt(0).toUpperCase() + trimmedMake.slice(1).toLowerCase();

//       const url = `${BASE_URL}api/fetch_custom_commands?make=${normalizedMake}&model=${trimmedModel}&year=${trimmedYear}`;
//       console.log("Request URL:", url);

//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error(`HTTP Error: ${response.status}`);
//       }

//       const json = await response.json();
//       console.log("API Response:", json);

//       if (json.data && Array.isArray(json.data) && json.data.length > 0) {
//         const normalizedData: CommandData[] = json.data.map((item: any) => ({
//           function_name: item.function_name,
//           variant: item.variant,
//           commands: item.commands?.[0] || {},
//         }));

//         setData(normalizedData);
//       } else {
//         setError("No custom commands found for the given car details.");
//       }
//     } catch (err) {
//       console.error("Fetch error:", err);
//       setError("Failed to fetch custom commands. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <h1 className="text-2xl font-semibold mb-4 text-center text-blue-700">
//         Custom Commands Viewer
//       </h1>

//       <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center">
//         <input
//           type="text"
//           value={make}
//           onChange={(e) => setMake(e.target.value)}
//           placeholder="e.g. Hyundai"
//           className="bg-white border px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <input
//           type="text"
//           value={model}
//           onChange={(e) => setModel(e.target.value)}
//           placeholder="e.g. i20"
//           className="bg-white border px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <input
//           type="text"
//           value={year}
//           onChange={(e) => setYear(e.target.value)}
//           placeholder="e.g. 2018"
//           className="bg-white border px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <button
//           onClick={fetchData}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition"
//         >
//           Search
//         </button>
//       </div>

//       {loading && <p className="text-blue-500 text-center">Loading...</p>}
//       {error && <p className="text-red-500 text-center">{error}</p>}

//       {data.length > 0 && (
//         <div className="overflow-x-auto mt-6">
//           <table className="min-w-full border border-gray-300 shadow-sm">
//             <thead className="bg-gray-100 text-gray-700">
//               <tr>
//                 <th className="border px-4 py-2 text-left">Function Name</th>
//                 <th className="border px-4 py-2 text-left">Variant</th>
//                 <th className="border px-4 py-2 text-left">Commands</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.map((item, idx) =>
//                 item.variant.map((variant) => (
//                   <tr key={`${idx}-${variant}`} className="hover:bg-gray-50">
//                     <td className="border px-4 py-2">{item.function_name}</td>
//                     <td className="border px-4 py-2">{variant}</td>
//                     <td className="border px-4 py-2 whitespace-pre-wrap">
//                       {item.commands?.[variant]?.length
//                         ? item.commands[variant]?.join("\n")
//                         : "No commands"}
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Customcommands;
