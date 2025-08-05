import React from 'react';

interface DecodedArrayItem {
  pid: string;
  data: string;
  decodedFaultArray: Record<string, string>; // faultCode: status
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
    <div className="p-2 text-xs max-h-48 overflow-y-auto space-y-2">
      {/* Decoded Fault Codes */}
      <div>
        <h3 className="font-semibold mb-1">Decoded Fault Codes</h3>
        {DecodeArray && DecodeArray.length > 0 ? (
          DecodeArray.map((decoded, idx) => (
            <div key={idx} className="bg-gray-100 p-2 rounded mb-2 border">
              <p><strong>System:</strong> {decoded.system}</p>
              <p><strong>PID:</strong> {decoded.pid}</p>
              <p><strong>Protocol:</strong> {decoded.protocol}</p>
              <p><strong>Header:</strong> {decoded.header}</p>
              <p><strong>Data:</strong> {decoded.data}</p>
              <ul className="list-disc pl-5 mt-1">
                {Object.entries(decoded.decodedFaultArray || {}).map(([code, status]) => (
                  <li key={code}>{code}: {status}</li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">No decoded fault data available.</p>
        )}
      </div>

      {/* Raw Scan Results */}
      <div>
        <h3 className="font-semibold mt-3 mb-1">Raw Scan Results</h3>
        {ScanArray && ScanArray.length > 0 ? (
          <ul className="list-disc pl-5">
            {ScanArray.map((item, index) => (
              <li key={index}>
                <strong>{item.system}</strong> — PID: {item.pid} — Data: {item.data}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No scan data available.</p>
        )}
      </div>
    </div>
  );
};

export default ScanDcodeArr;
