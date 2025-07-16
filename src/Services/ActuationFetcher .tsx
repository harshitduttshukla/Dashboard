

import { useState } from "react";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/";


const ActuationFetcher = () => {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (!make.trim() || !model.trim() || !year.trim()) {
      alert("Please fill Make, Model, and Year.");
      return;
    }

    setLoading(true);

    const originalUrl = `http://13.202.193.4:3000/api/fetch_actuation_command?make=${make}&model=${model}&year=${year}`;
    const url = `https://api.allorigins.win/get?url=${encodeURIComponent(originalUrl)}`;

    // const url = `${API_BASE_URL}api/fetch_actuation_command?make=${encodeURIComponent(make)}&model=${encodeURIComponent(model)}&year=${year}`

    try {
      const res = await fetch(url);
      const json = await res.json();
      const parsed = JSON.parse(json.contents);
      setData(parsed.data?.[0] || null);
    } catch (error) {
      console.error("Fetch error:", error);
      setData(null);
    }

    setLoading(false);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">Actuation Commands Viewer</h1>

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
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            onClick={fetchData}
          >
            Fetch
          </button>
        </div>
      </div>

      {loading && <p className="text-blue-500 text-center">Loading data...</p>}

      {data && (
        <div className="bg-white border rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-2">{data.actuation_type}</h2>
          <p className="italic text-gray-600 mb-4">{data.message}</p>

          {data.details?.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    {Object.keys(data.details[0]).map((key) => (
                      <th key={key} className="border px-3 py-2 text-left">{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.details.map((item: any, index: number) => (
                    <tr key={index} className="hover:bg-gray-50">
                      {Object.keys(item).map((key) => (
                        <td key={key} className="border px-3 py-2">
                          {typeof item[key] === "boolean"
                            ? item[key] ? "✔️" : "❌"
                            : item[key] ?? "-"}
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
      )}
    </div>
  );
};

export default ActuationFetcher;
