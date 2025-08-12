import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderAndValue from '../ReusedCompontets/HeaderAndValue';

interface SpecialFunctionItem {
  make: string;
  module: string;
  model: string;
  function_type: string;
  command_type: string;
  item_number: string;
  variant: string;
  license_plate: string;
  scan_ended: string;
  hard_coded: boolean;
  scan_start_time: string;
  scan_end_time: string;
  user_email: string;
  scanResArray: any;
}

interface Filters {
  email: string;
  make: string;
  module: string;
  model: string;
  function_type: string;
  command_type: string;
  item_number: string;
  variant: string;
  license_plate: string;
  scan_ended: string;
  hard_coded: string;
  scan_start_time: string;
  scan_end_time: string;
}

const ITEMS_PER_PAGE = 30;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/';

const SpecialFunctionsDetail = () => {
  const [functionsData, setFunctionsData] = useState<SpecialFunctionItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({
    email: '',
    make: '',
    module: '',
    model: '',
    function_type: '',
    command_type: '',
    item_number: '',
    variant: '',
    license_plate: '',
    scan_ended: '',
    hard_coded: '',
    scan_start_time: '',
    scan_end_time: '',
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

      const response = await fetch(`${API_BASE_URL}api/SpecialFunctions?${params.toString()}`);

      if (!response.ok) throw new Error('Failed to fetch special functions data');

      const json = await response.json();
      if (json && Array.isArray(json.scans)) {
        setFunctionsData(json.scans);
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
      <h2 className="text-xl font-bold mb-4">Special Functions</h2>
      {error && <p className="text-red-500">{error}</p>}

      {/* Filters Section */}
      <div className="flex flex-wrap gap-4 mb-6">
        {Object.keys(filters).map((key) => (
          <div key={key} className="flex flex-col w-52">
            <label className="mb-1 font-semibold capitalize">
              {key.replace(/_/g, ' ')}
            </label>
            <input
              type={
                key.includes('time')
                  ? 'date'
                  : key === 'hard_coded'
                  ? 'checkbox'
                  : 'text'
              }
              placeholder={key.replace(/_/g, ' ')}
              className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={
                key === 'hard_coded'
                  ? undefined
                  : filters[key as keyof Filters]
              }
              checked={
                key === 'hard_coded'
                  ? filters[key as keyof Filters] === 'true'
                  : undefined
              }
              onChange={(e) =>
                handleFilterChange(
                  key as keyof Filters,
                  key === 'hard_coded'
                    ? (e.target as HTMLInputElement).checked.toString()
                    : e.target.value
                )
              }
            />
          </div>
        ))}
        <button
          onClick={() => {
            setPage(1);
            fetchData();
          }}
          className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition-all self-end"
        >
          Filter
        </button>
      </div>

      {/* Table */}
      <table className="min-w-full bg-white border border-gray-200 text-sm">
        <thead>
          <tr>
            <HeaderAndValue header={true} Title="Email" />
            <HeaderAndValue header={true} Title="Make" />
            <HeaderAndValue header={true} Title="Module" />
            <HeaderAndValue header={true} Title="Model" />
            <HeaderAndValue header={true} Title="Function Type" />
            <HeaderAndValue header={true} Title="Command Type" />
            <HeaderAndValue header={true} Title="Item Number" />
            <HeaderAndValue header={true} Title="Variant" />
            <HeaderAndValue header={true} Title="License Plate" />
            <HeaderAndValue header={true} Title="Scan Ended" />
            <HeaderAndValue header={true} Title="Hard Coded" />
            <HeaderAndValue header={true} Title="Start Time" />
            <HeaderAndValue header={true} Title="End Time" />
            <HeaderAndValue header={true} Title="Show" />
          </tr>
        </thead>
        <tbody>
          {functionsData.map((item, index) => (
            <tr key={index}>
              <HeaderAndValue Title={item.user_email} />
              <HeaderAndValue Title={item.make} />
              <HeaderAndValue Title={item.module} />
              <HeaderAndValue Title={item.model} />
              <HeaderAndValue Title={item.function_type} />
              <HeaderAndValue Title={item.command_type} />
              <HeaderAndValue Title={item.item_number} />
              <HeaderAndValue Title={item.variant} />
              <HeaderAndValue Title={item.license_plate} />
              <HeaderAndValue Title={item.scan_ended} />
              <HeaderAndValue Title={item.hard_coded ? 'Yes' : 'No'} />
              <HeaderAndValue Title={new Date(item.scan_start_time).toLocaleString()} />
              <HeaderAndValue Title={new Date(item.scan_end_time).toLocaleString()} />
              <td className="border px-4 py-2">
                <button
                  onClick={() =>
                    navigate('/SpecialFunctions/details', {
                      state: { 
                        ScanArray: item.scanResArray,
                        start_time : item.scan_start_time,
                        end_time : item.scan_end_time,
                        email : item.user_email,
                        make : item.make,

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

      {/* Pagination */}
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

export default SpecialFunctionsDetail;
