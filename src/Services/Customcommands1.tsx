




import React, { useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface CommandData {
  function_name: string;
  variant: string[];
  commands: Record<string, string[]>;
}

const ITEMS_PER_PAGE = 20;

const CustomCommands: React.FC = () => {
  const [data, setData] = useState<CommandData[]>([]);
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchCustomCommands = async (pageNumber = 1) => {
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams();
      if (make) params.append("make", make);
      if (model) params.append("model", model);
      if (year) params.append("year", year);
      params.append("page", pageNumber.toString());
      params.append("limit", ITEMS_PER_PAGE.toString());

      const url = params.toString()
        ? `${API_BASE_URL}api/CustomCommands?${params.toString()}`
        : `${API_BASE_URL}api/CustomCommands`;

      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const json = await response.json();

      if (json.data && Array.isArray(json.data)) {
        const normalizedData: CommandData[] = json.data.map((item: any) => ({
          function_name: item.function_name,
          variant: item.variant || [],
          commands: item.commands?.[0] || {},
        }));

        setData(normalizedData);
        setTotal(json.total || 0);
        setPage(pageNumber);
      } else {
        setData([]);
        setTotal(0);
        setError("No custom commands found for the given car details.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch commands");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomCommands(1);
  }, []);

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  return (
    <div className="flex flex-col ml-5 w-full min-h-screen bg-gray-50 p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Custom Commands Viewer
      </h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Make"
          className="border border-gray-300 px-4 py-2 rounded-md w-52 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={make}
          onChange={(e) => setMake(e.target.value)}
        />
        <input
          type="text"
          placeholder="Model"
          className="border border-gray-300 px-4 py-2 rounded-md w-52 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />
        <input
          type="text"
          placeholder="Year"
          className="border border-gray-300 px-4 py-2 rounded-md w-52 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <button
          onClick={() => {
            setPage(1);
            fetchCustomCommands(1);
          }}
          className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition-all"
        >
          Search
        </button>
      </div>

      {/* Table */}
      <div className="flex-1 bg-white rounded-lg shadow-md overflow-x-auto">
        {loading ? (
          <p className="p-4 text-gray-500">Loading...</p>
        ) : error ? (
          <p className="p-4 text-red-500">{error}</p>
        ) : data.length === 0 ? (
          <p className="p-4 text-gray-500">No commands found.</p>
        ) : (
          <table className="w-full text-sm border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold border-b">
                  Function Name
                </th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold border-b">
                  Variants
                </th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold border-b">
                  Commands
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4 border-b text-gray-800 font-medium">
                    {item.function_name}
                  </td>
                  <td className="px-6 py-4 border-b text-gray-600">
                    {item.variant.join(", ")}
                  </td>
                  <td className="px-6 py-4 border-b text-gray-700">
                    <div className="flex flex-col gap-1">
                      {Object.entries(item.commands).map(([variant, cmds]) => (
                        <div key={variant}>
                          <strong>{variant}:</strong>
                          <ul className="list-disc list-inside ml-4 text-gray-600">
                            {cmds.map((cmd, i) => (
                              <li key={i}>{cmd}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {total > 0 && (
        <div className="mt-6 flex justify-center items-center space-x-3">
          <button
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            onClick={() => fetchCustomCommands(page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="font-medium text-gray-700">
            Page {page} of {totalPages || 1}
          </span>
          <button
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            onClick={() => fetchCustomCommands(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomCommands;
