import React, { useEffect, useState } from "react";

const ModelListPage: React.FC = () => {
  const [makeList, setMakeList] = useState<string[]>([
    "Hyundai",
    "Maruti",
    "Mahindra",
    "Tata",
    "Honda",
  ]);
  const [selectedMake, setSelectedMake] = useState<string>("Mahindra");
  const [modelList, setModelList] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchModels = async () => {
    setLoading(true);
    setError("");

    try {
      const trimmedMake = selectedMake.trim();
      const originalUrl = `http://13.202.193.4:3000/api/fetch_model_list?make=${trimmedMake}`;
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(originalUrl)}`;

      const response = await fetch(proxyUrl);
      const result = await response.json();

      if (result.contents) {
        const json = JSON.parse(result.contents);

        if (json.data && Array.isArray(json.data)) {
          // Extract model names from the `data` array
          const names = json.data.map((item: { name: string }) => item.name);
          setModelList(names);
        } else {
          setModelList([]);
          setError("No models found for selected make.");
        }
      } else {
        setModelList([]);
        setError("Invalid response from proxy.");
      }
    } catch (err) {
      console.error("Error fetching model list:", err);
      setModelList([]);
      setError("Failed to fetch model list. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModels();
  }, [selectedMake]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center text-blue-700 mb-4">
        Model List Viewer
      </h1>

      <div className="mb-6 text-center">
        <label className="mr-2 font-medium text-gray-700">Select Make:</label>
        <select
          value={selectedMake}
          onChange={(e) => setSelectedMake(e.target.value)}
          className="border px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {makeList.map((make, idx) => (
            <option key={idx} value={make}>
              {make}
            </option>
          ))}
        </select>
      </div>

      {loading && <p className="text-blue-500 text-center">Loading models...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {!loading && modelList.length > 0 && (
        <div className="border border-gray-300 rounded p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Models for {selectedMake}:
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {modelList.map((model, idx) => (
              <li key={idx}>{model}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ModelListPage;
