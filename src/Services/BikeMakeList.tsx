import React, { useEffect, useState } from "react";

const BikeMakeList: React.FC = () => {
  const [bikeMakes, setBikeMakes] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [segment, setSegment] = useState<string>("bike"); // State for the segment input

  const fetchBikeMakes = async () => {
    setLoading(true);
    setError("");

    try {
      const originalUrl = `http://13.202.193.4:3000/api/fetch_make_list?segement=${segment}`;
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(originalUrl)}`;

      const response = await fetch(proxyUrl);
      const result = await response.json();

      if (result.contents) {
        const json = JSON.parse(result.contents);

        if (json.data && Array.isArray(json.data)) {
          // Updated to access the 'name' field
          const makes = json.data.map((item: { name: string }) => item.name);
          setBikeMakes(makes);
        } else {
          setBikeMakes([]);
          setError("No bike makes found.");
        }
      } else {
        setBikeMakes([]);
        setError("Invalid response from proxy.");
      }
    } catch (err) {
      console.error("Error fetching bike makes:", err);
      setBikeMakes([]);
      setError("Failed to fetch bike makes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to handle segment input change
  const handleSegmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSegment(e.target.value);
  };

  // Fetch bike makes when component mounts or segment changes
  useEffect(() => {
    fetchBikeMakes();
  }, [segment]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center text-green-700 mb-4">
        Bike Make List
      </h1>

      <div className="mb-4">
        <label className="block text-gray-700">Enter Segment:</label>
        <input
          type="text"
          value={segment}
          onChange={handleSegmentChange}
          className="w-full p-2 mt-2 border border-gray-300 rounded"
        />
      </div>

      <button
        onClick={fetchBikeMakes}
        className="w-full bg-green-500 text-white p-2 rounded"
      >
        Fetch Bike Makes
      </button>

      {loading && <p className="text-blue-500 text-center">Loading bike makes...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {!loading && bikeMakes.length > 0 && (
        <div className="border border-gray-300 rounded p-4 shadow-sm">
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {bikeMakes.map((make, idx) => (
              <li key={idx}>{make}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BikeMakeList;
