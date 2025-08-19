import React, { useState } from 'react';

type CommandItem = {
  command: string;
  module: string;
};

const BASE_URL = import.meta.env.VITE_API_BASE_URL 

const Api2: React.FC = () => {
  const [make, setMake] = useState('');
  const [modules, setModules] = useState<string[]>(['Engine']);
  const [functionType, setFunctionType] = useState('scan');
  const [fullScan, setFullScan] = useState(true);
  const [commandData, setCommandData] = useState<CommandItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleScan = () => {
    if (!make.trim()) {
      setError('Please enter a car make.');
      return;
    }

    setLoading(true);
    setError('');

    const moduleStr = encodeURIComponent(JSON.stringify(modules));
    const url = `${BASE_URL}api/fetch_command1?make=${encodeURIComponent(make)}&module=${moduleStr}&function_type=${functionType}&full_scan=${fullScan}`;

    console.log('Request URL:', url);

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((result) => {
        setCommandData(result.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch command data.');
        setLoading(false);
      });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
        Fetch Command Data
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          value={make}
          onChange={(e) => setMake(e.target.value)}
          placeholder="Enter car make (e.g. Honda)"
          className="border border-gray-300 px-4 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={functionType}
          onChange={(e) => setFunctionType(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="scan">Scan</option>
          <option value="read">Read</option>
        </select>

        <select
          multiple
          value={modules}
          onChange={(e) =>
            setModules(Array.from(e.target.selectedOptions, (opt) => opt.value))
          }
          className="border border-gray-300 px-4 py-2 rounded h-28 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Engine">Engine</option>
          <option value="ABS">ABS</option>
          <option value="Airbag">Airbag</option>
        </select>

        <label className="flex items-center gap-2 px-2">
          <input
            type="checkbox"
            checked={fullScan}
            onChange={(e) => setFullScan(e.target.checked)}
            className="accent-blue-600"
          />
          <span className="text-gray-700">Full Scan</span>
        </label>
      </div>

      <button
        onClick={handleScan}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Fetch Commands
      </button>

      {loading && <p className="mt-4 text-blue-500 font-medium">Loading...</p>}
      {error && <p className="mt-4 text-red-600 font-medium">{error}</p>}

      {Array.isArray(commandData) && commandData.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Command Data</h3>
          <table className="min-w-full border border-gray-300 shadow-sm rounded-md">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="border px-4 py-3 text-left">Command</th>
                <th className="border px-4 py-3 text-left">Module</th>
              </tr>
            </thead>
            <tbody>
              {commandData.map((cmd, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{cmd.command}</td>
                  <td className="border px-4 py-2">{cmd.module}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Api2;
