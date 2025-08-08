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
  start_time: string;
  end_time: string;
  license_plate: string;
  email: string;
  app_version: string;
  scan_ended: string;
  functiones: string;
  type: string;
}

const ScanDcodeArr: React.FC<ScanProps> = ({
  ScanArray,
  DecodeArray,
  start_time,
  end_time,
  license_plate,
  email,
  app_version,
  functiones,
  type,
  scan_ended
}) => {
  const calculateDuration = () => {
    const start = new Date(start_time);
    const end = new Date(end_time);
    const diffInMs = end.getTime() - start.getTime();

    if (isNaN(diffInMs)) return 'N/A';

    const seconds = Math.floor(diffInMs / 1000);
    // const minutes = Math.floor(seconds / 60);
    // const remainingSeconds = seconds % 60;

    return ` ${seconds}s`;
  };

  return (
    <div className="w-screen h-screen overflow-auto p-8 bg-white text-sm">
      <h1 className="text-2xl font-bold mb-6">Scan Results & Decoded Faults</h1>

      {/* Scan Detail Section */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Scan Details</h2>
        <table className="table-auto border border-collapse w-full text-left">
          <tbody>
            <tr className="border">
              <td className="border px-4 py-2 font-medium">Start Time</td>
              <td className="border px-4 py-2">{start_time}</td>
              <td className="border px-4 py-2 font-medium">End Time</td>
              <td className="border px-4 py-2">{end_time}</td>
            </tr>
            <tr className="border">
              <td className="border px-4 py-2 font-medium">License Plate</td>
              <td className="border px-4 py-2">{license_plate}</td>
              <td className="border px-4 py-2 font-medium">Email</td>
              <td className="border px-4 py-2">{email}</td>
            </tr>
            <tr className="border">
              <td className="border px-4 py-2 font-medium">App Version</td>
              <td className="border px-4 py-2">{app_version}</td>
              <td className="border px-4 py-2 font-medium">Function</td>
              <td className="border px-4 py-2">{functiones}</td>
            </tr>
            <tr className="border">
              <td className="border px-4 py-2 font-medium">Type</td>
              <td className="border px-4 py-2">{type}</td>
              <td className="border px-4 py-2 font-medium">Scan Duration</td>
              <td className="border px-4 py-2">{calculateDuration()}</td>
            </tr>
            <tr className="border">
              <td className="border px-4 py-2 font-medium">Row Count</td>
              <td className="border px-4 py-2" >{ScanArray?.length || 0}</td>
              <td className="border px-4 py-2 font-medium">Scan Ended</td>
              <td className="border px-4 py-2 ">{scan_ended}</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Decoded Fault Codes Section */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Decoded Fault Codes</h2>
        {DecodeArray && DecodeArray.length > 0 ? (
          <table className="table-auto w-full border border-collapse text-left">
            <thead className="bg-gray-100">
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
      </section>

      {/* Raw Scan Results Section */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Raw Scan Results</h2>
        {ScanArray && ScanArray.length > 0 ? (
          <table className="table-auto w-full border border-collapse text-left">
            <thead className="bg-gray-100">
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
      </section>
    </div>
  );
};

export default ScanDcodeArr;
