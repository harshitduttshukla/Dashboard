import React from 'react';

interface DecodedArrayItem {
  pid: string;
  data: string;
  decodedFaultArray: Record<string, string>;
  header: string;
  protocol: string;
  system: string;
}

interface ScanResItem {
  data: string;
  header: string;
  make: string;
  pid: string;
  protocol: string;
  system: string;
}

interface ScanProps {
  ScanArray: ScanResItem[] | null;
  DecodeArray: DecodedArrayItem[] | null;
}

const ScanDcodeArr: React.FC<ScanProps> = ({ ScanArray, DecodeArray }) => {
  return (
    <div className="w-screen h-screen overflow-auto p-6 bg-white text-sm mt-8">
      <h1 className="text-xl font-bold mb-4">Scan Results & Decoded Faults</h1>

      {/* Decoded Fault Codes Table */}
      <div className="mb-10">
        <h2 className="font-semibold mb-2 text-lg">Decoded Fault Codes</h2>
        {DecodeArray && DecodeArray.length > 0 ? (
          <table className="table-auto w-full border border-gray-300 text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-4 py-2">System</th>
                <th className="border px-4 py-2">PID</th>
                <th className="border px-4 py-2">Protocol</th>
                <th className="border px-4 py-2">Header</th>
                <th className="border px-4 py-2">Decoded Faults</th>
                <th className="border px-4 py-2">Data</th>
              </tr>
            </thead>
            <tbody>
              {DecodeArray.map((decoded, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{decoded.system}</td>
                  <td className="border px-4 py-2">{decoded.pid}</td>
                  <td className="border px-4 py-2">{decoded.protocol}</td>
                  <td className="border px-4 py-2">{decoded.header}</td>
                  <td className="border px-4 py-2">
                    <ul className="list-disc pl-5">
                      {Object.entries(decoded.decodedFaultArray).map(([code, status]) => (
                        <li key={code}>
                          {code}: {status}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="border px-4 py-2">{decoded.data}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500 italic">No decoded fault data available.</p>
        )}
      </div>

      {/* Raw Scan Results Table */}
      <div>
        <h2 className="font-semibold mb-2 text-lg">Raw Scan Results</h2>
        {ScanArray && ScanArray.length > 0 ? (
          <table className="table-auto w-full border border-gray-300 text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-4 py-2">System</th>
                <th className="border px-4 py-2">PID</th>
                <th className="border px-4 py-2">Make</th>
                <th className="border px-4 py-2">Header</th>
                <th className="border px-4 py-2">Protocol</th>
                <th className="border px-4 py-2">Data</th>
              </tr>
            </thead>
            <tbody>
              {ScanArray.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{item.system}</td>
                  <td className="border px-4 py-2">{item.pid}</td>
                  <td className="border px-4 py-2">{item.make}</td>
                  <td className="border px-4 py-2">{item.header}</td>
                  <td className="border px-4 py-2">{item.protocol}</td>
                  <td className="border px-4 py-2">{item.data}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500 italic">No scan data available.</p>
        )}
      </div>
    </div>
  );
};

export default ScanDcodeArr;
