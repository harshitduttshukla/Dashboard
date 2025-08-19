import React, { useEffect, useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface User {
  [key: string]: string | number | boolean | null;
}

interface Filters {
  email: string;
  plan: string;
  status: string;
}

const ITEMS_PER_PAGE = 20; 

const UsersTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filters, setFilters] = useState<Filters>({ email: '', plan: '', status: '' });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchUsers = async () => {
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams();
      if (filters.email) params.append('email', filters.email);
      if (filters.plan) params.append('plan', filters.plan);
      if (filters.status) params.append('status', filters.status);

     
      params.append('page', page.toString());
      params.append('limit', ITEMS_PER_PAGE.toString());

      const response = await fetch(`${API_BASE_URL}api/users?${params.toString()}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setUsers(data.users || []);
      setTotal(data.total || 0); // है
    } catch (err) {
      console.error('Fetch error:', err);
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]); // ✅ page बदलते ही API call होगी

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  return (
    <div className="flex min-h-screen bg-gray">
      <div className="flex-1 p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 ml-6">User List</h2>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <input
            type="text"
            placeholder="Email"
            className="border border-gray-300 px-4 py-2 rounded-md w-52 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.email}
            onChange={(e) => setFilters({ ...filters, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="Plan"
            className="border border-gray-300 px-4 py-2 rounded-md w-52 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.plan}
            onChange={(e) => setFilters({ ...filters, plan: e.target.value })}
          />
          <input
            type="text"
            placeholder="Status"
            className="border border-gray-300 px-4 py-2 rounded-md w-52 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          />
          <button
            onClick={() => { setPage(1); fetchUsers(); }}
            className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition-all"
          >
            Filter
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          {loading ? (
            <p className="p-4 text-gray-500">Loading...</p>
          ) : error ? (
            <p className="p-4 text-red-500">{error}</p>
          ) : users.length === 0 ? (
            <p className="p-4 text-gray-500">No users found.</p>
          ) : (
            <table className="w-full text-sm border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  {Object.keys(users[0]).map((key) => (
                    <th
                      key={key}
                      className="px-4 py-2 text-left text-gray-700 font-medium border-b border-gray-300 whitespace-nowrap"
                    >
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    {Object.values(user).map((val, i) => (
                      <td
                        key={i}
                        className="px-4 py-2 border-b border-gray-200 text-gray-800 whitespace-nowrap"
                      >
                        {val === null || val === undefined ? '-' : String(val)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* ✅ Pagination controls */}
        <div className="mt-4 flex justify-center items-center space-x-2">
          <button
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </button>

          <span className="font-semibold">
            Page {page} of {totalPages || 1}
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
    </div>
  );
};

export default UsersTable;
