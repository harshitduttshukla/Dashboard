

import React, { useEffect, useState } from "react";

const OdometerDetails: React.FC = () => {
  const [odometerData, setOdometerData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [make, setMake] = useState<string>("Mahindra");  // Default make
  const [model, setModel] = useState<string>("Bolero");  // Default model
  const [year, setYear] = useState<string>("2021");      // Default year

  const fetchOdometerData = async () => {
    setLoading(true);
    setError("");

    try {
      const originalUrl = `http://13.202.193.4:3000/api/fetch_odometer?make=${make}&model=${model}&year=${year}`;
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(originalUrl)}`;

      const response = await fetch(proxyUrl);
      const result = await response.json();

      if (result.contents) {
        const json = JSON.parse(result.contents);

        if (json.data && Array.isArray(json.data)) {
          setOdometerData(json.data);
        } else {
          setOdometerData([]);
          setError("No odometer data found.");
        }
      } else {
        setOdometerData([]);
        setError("Invalid response from proxy.");
      }
    } catch (err) {
      console.error("Error fetching odometer data:", err);
      setOdometerData([]);
      setError("Failed to fetch odometer data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to handle make, model, and year input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    if (type === "make") setMake(e.target.value);
    if (type === "model") setModel(e.target.value);
    if (type === "year") setYear(e.target.value);
  };

  // Fetch odometer data when component mounts or input changes
  useEffect(() => {
    fetchOdometerData();
  }, [make, model, year]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center text-green-700 mb-4">
        Odometer Details
      </h1>

      <div className="mb-4">
        <label className="block text-gray-700">Make:</label>
        <input
          type="text"
          value={make}
          onChange={(e) => handleInputChange(e, "make")}
          className="w-full p-2 mt-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Model:</label>
        <input
          type="text"
          value={model}
          onChange={(e) => handleInputChange(e, "model")}
          className="w-full p-2 mt-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Year:</label>
        <input
          type="text"
          value={year}
          onChange={(e) => handleInputChange(e, "year")}
          className="w-full p-2 mt-2 border border-gray-300 rounded"
        />
      </div>

      <button
        onClick={fetchOdometerData}
        className="w-full bg-green-500 text-white p-2 rounded"
      >
        Fetch Odometer Data
      </button>

      {loading && <p className="text-blue-500 text-center">Loading odometer data...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {!loading && odometerData.length > 0 && (
        <div className="border border-gray-300 rounded p-4 shadow-sm">
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {odometerData.map((item, idx) => (
              <li key={idx}>
                <strong>Header:</strong> {item.header} <br />
                <strong>PID:</strong> {item.pid} <br />
                <strong>Formula (Metric):</strong> {item.formula_metric} <br />
                <strong>Formula (Imperial):</strong> {item.formula_imperial} <br />
                <strong>Unit (Metric):</strong> {item.unit_metric} <br />
                <strong>Unit (Imperial):</strong> {item.unit_imperial} <br />
                <strong>System:</strong> {item.system} <br />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default OdometerDetails;
