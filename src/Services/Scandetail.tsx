import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

interface ScanItem {
  id: number;
  email: string;
  model: string;
  vin: string;
  license_plate: string;
  scan_ended: string;
  make: string;
  function: string;
  type: string;
  country_id: number;
  scan_end_time: string;
  scan_start_time: string;
  app_version: string;
  pdf_report: string;
  scanResArray: ScanResItem[] | null;
  decodedArray: DecodedArrayItem[] | null;
}

interface Filters {
  email: string;
  make: string;
  model: string;
  license_plate: string;
  country_id: string;
  scan_start_time: string;
  scan_end_time: string;
  type: string;
  app_version: string;
}

const ITEMS_PER_PAGE = 30;

const Scandetail = () => {
  const [scans, setScans] = useState<ScanItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({
    email: '',
    make: '',
    model: '',
    license_plate: '',
    country_id: '',
    scan_start_time: '',
    scan_end_time: '',
    type: '',
    app_version: '',
  });
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: ITEMS_PER_PAGE.toString(),
        ...filters,
      });

      const response = await fetch(`http://localhost:3000/api/ScanDetail?${params.toString()}`);

      if (!response.ok) throw new Error('Failed to fetch scan report');

      const json = await response.json();
      if (json && Array.isArray(json.scans)) {
        setScans(json.scans);
        setTotal(json.total || 0);
      } else {
        setError('Invalid response format');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Something went wrong');
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  const handleFilterChange = (field: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-4 ml-8">
      <h2 className="text-xl font-bold mb-4">Scan Details</h2>
      {error && <p className="text-red-500">{error}</p>}

      <div className="flex flex-wrap gap-4 mb-6">
        {Object.keys(filters).map((key) => (
          <input
            key={key}
            type={key.includes('time') ? 'date' : key === 'country_id' ? 'number' : 'text'}
            placeholder={key}
            className="border border-gray-300 px-4 py-2 rounded-md w-52 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters[key as keyof Filters]}
            onChange={(e) => handleFilterChange(key as keyof Filters, e.target.value)}
          />
        ))}
        <button
          onClick={() => {
            setPage(1);
            fetchData();
          }}
          className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition-all"
        >
          Filter
        </button>
      </div>

      <table className="min-w-full bg-white border border-gray-200 text-sm">
        <thead>
          <tr>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Start Time</th>
            <th className="border px-4 py-2">End Time</th>
            <th className="border px-4 py-2">Model</th>
            <th className="border px-4 py-2">License Plate</th>
            <th className="border px-4 py-2">VIN</th>
            <th className="border px-4 py-2">Scan Ended</th>
            <th className="border px-4 py-2">Make</th>
            <th className="border px-4 py-2">Country</th>
            <th className="border px-4 py-2">Funtion</th>

            <th className="border px-4 py-2">Type</th>
            <th className="border px-4 py-2">App Version</th>
            <th className="border px-4 py-2">PDF Report</th>
            <th className="border px-4 py-2">Show</th>
          </tr>
        </thead>
        <tbody>
          {scans.map((scan) => (
            <tr key={scan.id}>
              <td className="border px-4 py-2">{scan.email}</td>
              <td className="border px-4 py-2">{new Date(scan.scan_start_time).toLocaleString()}</td>
              <td className="border px-4 py-2">{new Date(scan.scan_end_time).toLocaleString()}</td>
              <td className="border px-4 py-2">{scan.model}</td>
              <td className="border px-4 py-2">{scan.license_plate}</td>
              <td className="border px-4 py-2">{scan.vin}</td>
              <td className="border px-4 py-2">{scan.scan_ended}</td>
              <td className="border px-4 py-2">{scan.make}</td>
              <td className="border px-4 py-2">{scan.country_id}</td>
              <td className="border px-4 py-2">{scan.function}</td>
              <td className="border px-4 py-2">{scan.type}</td>
              <td className="border px-4 py-2">{scan.app_version}</td>
              <td className="border px-4 py-2">
                {scan.pdf_report ? (
                  <a
                    href={scan.pdf_report}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    View Report
                  </a>
                ) : (
                  'No Report'
                )}
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() =>
                    navigate('/ObdScanReport/details', {
                      state: {
                        ScanArray: scan.scanResArray,
                        DecodeArray: scan.decodedArray,
                        start_time : scan.scan_start_time,
                        end_time : scan.scan_end_time,
                        license_plate : scan.scan_end_time,
                        email : scan.email,
                        App_version : scan.app_version,
                        scan_ended : scan.scan_ended,
                        functiones : scan.function,
                        type : scan.type
                      },
                    })
                  }
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex justify-center items-center space-x-2">
        <button
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>

        <span className="font-semibold">
          Page {page} of {totalPages}
        </span>

        <button
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Scandetail;
