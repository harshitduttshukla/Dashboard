import React, { useState } from 'react';



type CoverageItem = {
  function_name: string;
  function_type: string;
};

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/';
console.log("BASE_URL =", BASE_URL);

const Api1: React.FC = () => {
  const [make, setMake] = useState('');
  const [data, setData] = useState<CoverageItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = () => {
    if (!make.trim()) {
      setError('Please enter a car make.');
      return;
    }

    setLoading(true);
    setError('');

    const url = `${BASE_URL}api/fetch_coverage?make=${encodeURIComponent(make)}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((result) => {
        setData(result.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch data.');
        setLoading(false);
      });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg mt-6">
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
        Search Car Make
      </h2>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          value={make}
          onChange={(e) => setMake(e.target.value)}
          placeholder="Enter car make (e.g. Hyundai)"
          className="border border-gray-300 px-4 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-blue-500 font-medium">Loading...</p>}
      {error && <p className="text-red-600 font-medium">{error}</p>}

      {data.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 shadow-sm rounded-md">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="border px-4 py-3 text-left">Function Name</th>
                <th className="border px-4 py-3 text-left">Function Type</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{item.function_name}</td>
                  <td className="border px-4 py-2">{item.function_type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Api1;
