import React, { useState } from 'react';

type CoverageItem = {
  function_name: string;
  function_type: string;
};

const Api1: React.FC = () => {
  const [make, setMake] = useState('');
  const [data, setData] = useState<CoverageItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = () => {
    if (!make.trim()) {
      setError("Please enter a car make.");
      return;
    }

    setLoading(true);
    setError("");
    const encodedUrl = encodeURIComponent(
      `http://13.202.193.4:3000/api/fetch_coverage?make=${make}`
    );

    fetch(`https://api.allorigins.win/get?url=${encodedUrl}`)
      .then((res) => res.json())
      .then((result) => {
        const parsed = JSON.parse(result.contents);
        setData(parsed.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch data.");
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
