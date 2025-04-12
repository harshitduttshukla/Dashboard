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
  const [data, setData] = useState<CommandData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setLoading(true);
    setError("");

    try {
      const originalUrl =
        "http://13.202.193.4:3000/api/fetch_custom_commands?make=Hyundai&model=i20&year=2018";
      const encoded = encodeURIComponent(originalUrl);
      const proxyUrl = `https://api.allorigins.win/get?url=${encoded}`;

      const response = await fetch(proxyUrl);
      const result = await response.json();

      const json = JSON.parse(result.contents);

      // Step 2: Normalize the API data using strict typing
      const normalizedData: CommandData[] = json.data.map((item: any) => ({
        function_name: item.function_name,
        variant: item.variant,
        commands: item.commands[0],
      }));

      setData(normalizedData);
    } catch (err) {
      setError("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4 text-center text-blue-700">
        Custom Commands Viewer
      </h1>

      <div className="flex justify-center mb-6">
        <button
          onClick={fetchData}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        >
          Fetch Commands
        </button>
      </div>

      {loading && <p className="text-blue-500 text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {data.length > 0 && (
        <div className="overflow-x-auto">
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
