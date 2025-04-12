import React, { useState } from "react";

type Detail = {
  pid: string;
  command_type: string;
  function_name: string;
  variant_id: any;
  subfunction: any;
  message: any;
  loop_flag: boolean;
  loop_num: any;
  input_format: any;
  loop_pid_array: any;
  input_map: any;
  wait_pid: any;
  input_encoding_formula: any;
  hard_coded: boolean;
};

type SPFCommand = {
  function_name: string;
  hard_coded: boolean;
  detail: Detail[];
};

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("Error caught by Error Boundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. Please try again later.</h1>;
    }

    return this.props.children;
  }
}

const SPFCommands: React.FC = () => {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [data, setData] = useState<SPFCommand[]>([]);
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
      const normalizedMake = trimmedMake.charAt(0).toUpperCase() + trimmedMake.slice(1).toLowerCase();
      const originalUrl = `http://13.202.193.4:3000/api/fetch_SPF_command_new?make=${normalizedMake}&model=${trimmedModel}&year=${trimmedYear}`;
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(originalUrl)}`;

      console.log("Original URL:", originalUrl);
      console.log("Proxy URL:", proxyUrl);

      const response = await fetch(proxyUrl);
      const result = await response.json();

      console.log("Raw API Response:", result);

      if (result.contents) {
        const json = JSON.parse(result.contents);
        console.log("Parsed JSON:", json);

        if (json.data && json.data.length > 0) {
          const commands: SPFCommand[] = json.data.map((item: any) => ({
            function_name: item.function_name,
            hard_coded: item.hard_coded,
            detail: item.details || [], // ✅ FIXED here
          }));
          console.log("Processed commands data:", commands);
          setData(commands);
        } else {
          setError("No data found for the given car details.");
        }
      } else {
        setError("No data found for the given car details.");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch SPF commands. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ErrorBoundary>
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4 text-center text-green-700">
          SPF Commands Viewer
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center">
          <input
            type="text"
            value={make}
            onChange={(e) => setMake(e.target.value)}
            placeholder="e.g. Hyundai"
            className="bg-white border px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            placeholder="e.g. i20"
            className="bg-white border px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="e.g. 2020"
            className="bg-white border px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={fetchData}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded transition"
          >
            Fetch SPF
          </button>
        </div>

        {loading && <p className="text-green-500 text-center">Loading...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {data.length > 0 && (
          <div className="space-y-6">
            {data.map((item, idx) => (
              <div key={idx} className="border border-gray-300 rounded-lg shadow-sm p-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  {item.function_name}
                </h2>
                <p className="mb-2 text-sm text-gray-600">
                  <strong>Hard Coded:</strong> {item.hard_coded ? "True" : "False"}
                </p>

                {item.detail && item.detail.length > 0 ? (
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
                        {item.detail.map((d, detailIdx) => (
                          <tr key={detailIdx} className="hover:bg-gray-50">
                            <td className="border px-3 py-1">{d?.pid ?? "N/A"}</td>
                            <td className="border px-3 py-1">{d?.message ?? "N/A"}</td>
                            <td className="border px-3 py-1">{d?.command_type ?? "N/A"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No command details available</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default SPFCommands;
