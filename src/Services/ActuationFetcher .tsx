import React, { useState } from 'react';

const ActuationFetcher = () => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const originalUrl = `http://13.202.193.4:3000/api/fetch_actuation_command?make=${make}&model=${model}&year=${year}`;
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(originalUrl)}`;

    try {
      const res = await fetch(proxyUrl);
      const json = await res.json();
      const parsed = JSON.parse(json.contents);
      const firstData = parsed.data[0];
      setData(firstData);
    } catch (error) {
      console.error('Fetch error:', error);
    }

    setLoading(false);
  };

  return (
    <div className="p-4">
      <div className="flex gap-2 mb-4">
        <input
          className="border px-2 py-1"
          placeholder="Make"
          value={make}
          onChange={(e) => setMake(e.target.value)}
        />
        <input
          className="border px-2 py-1"
          placeholder="Model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />
        <input
          className="border px-2 py-1"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-1 rounded"
          onClick={fetchData}
        >
          Fetch
        </button>
      </div>

      {loading && <p>Loading...</p>}

      {data && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">{data.actuation_type}</h2>
          <p className="italic text-gray-700 mb-4">{data.message}</p>

          {/* Dynamically render table */}
          {data.details && data.details.length > 0 && (
            <table className="w-full border-collapse border border-gray-400">
              <thead>
                <tr className="bg-gray-200">
                  {Object.keys(data.details[0]).map((key) => (
                    <th key={key} className="border px-2 py-1 text-left">{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.details.map((item: any, index: number) => (
                  <tr key={index}>
                    {Object.keys(item).map((key) => (
                      <td key={key} className="border px-2 py-1">
                        {typeof item[key] === 'boolean'
                          ? item[key] ? '✔️' : '❌'
                          : item[key] ?? '-'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default ActuationFetcher;
