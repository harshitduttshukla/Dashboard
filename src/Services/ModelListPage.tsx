import React, { useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ModelListPage: React.FC = () => {
  const [makeList] = useState<string[]>([
    "Hyundai",
    "Mahindra",
    "Tata",
    "Honda",
  ]);
  const [selectedMake, setSelectedMake] = useState<string>("Mahindra");
  const [modelList, setModelList] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchModels = async () => {
    if (!selectedMake) return;

    setLoading(true);
    setError("");
    setModelList([]);

    try {
      const trimmedMake = selectedMake.trim();
      const url = `${API_BASE_URL}api/fetch_model_list?make=${encodeURIComponent(trimmedMake)}`;
      console.log("Fetching models from:", url);

      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const json = await response.json();
      console.log("API Response:", json);

      if (Array.isArray(json.data) && json.data.length > 0) {
        const names = json.data.map((item: { name: string }) => item.name);
        setModelList(names);
      } else {
        setError("No models found for the selected make.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch model list. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModels();
  }, [selectedMake]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMake(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      fetchModels();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center text-blue-700 mb-4">
        Model List Viewer
      </h1>

      <div className="mb-6 text-center">
        <label className="mr-2 font-medium text-gray-700">Enter Make:</label>
        <input
          type="text"
          value={selectedMake}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Enter vehicle make (e.g., Mahindra, Hyundai)"
          className="border px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
        />

        <button
          onClick={fetchModels}
          disabled={!selectedMake.trim() || loading}
          className="ml-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded transition-colors"
        >
          {loading ? "Loading..." : "Fetch Models"}
        </button>
      </div>

      {/* Suggestions for common makes */}
      <div className="mb-4 text-center">
        <p className="text-sm text-gray-600 mb-2">Quick suggestions:</p>
        <div className="flex flex-wrap justify-center gap-2">
          {makeList.map((make) => (
            <button
              key={make}
              onClick={() => setSelectedMake(make)}
              className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                selectedMake === make
                  ? "bg-blue-100 border-blue-300 text-blue-700"
                  : "bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {make}
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <div className="text-blue-500 text-center flex items-center justify-center gap-2">
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-500 border-t-transparent"></div>
          <span>Loading models...</span>
        </div>
      )}
      
      {error && <p className="text-red-500 text-center">{error}</p>}

      {!loading && modelList.length > 0 && (
        <div className="border border-gray-300 rounded p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Models for {selectedMake}:
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {modelList.map((model) => (
              <li key={model}>{model}</li>
            ))}
          </ul>
        </div>
      )}

      {!loading && !error && modelList.length === 0 && (
        <p className="text-center text-gray-500">No models available for the selected make.</p>
      )}
    </div>
  );
};

export default ModelListPage;