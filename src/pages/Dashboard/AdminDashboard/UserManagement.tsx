import React, { useEffect, useState, ChangeEvent } from "react";
import axiosInstance from "../../../api/axios";
import toast from "react-hot-toast";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "rider" | "driver";
  status: "active" | "blocked" | "pending";
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get("/admin/users");
      setUsers(data.users);
    } catch {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (userId: string, status: string) => {
    try {
      await axiosInstance.patch(`/admin/users/${userId}`, { status });
      toast.success("User status updated");
      fetchUsers();
    } catch {
      toast.error("Failed to update status");
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(filter.toLowerCase()) ||
      u.email.toLowerCase().includes(filter.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1 className="mb-4 font-bold text-2xl">User Management</h1>
      <input
        type="text"
        placeholder="Search by name/email"
        value={filter}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setFilter(e.target.value)
        }
        className="mb-4 p-2 border rounded w-full"
      />
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <div className="space-y-2">
          {currentUsers.map((user) => (
            <div
              key={user._id}
              className="flex justify-between bg-white shadow p-3 rounded"
            >
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-gray-500 text-sm">{user.email}</p>
                <p className="text-sm">{user.role}</p>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={user.status}
                  onChange={(e) => handleStatusChange(user._id, e.target.value)}
                  className="p-1 border rounded"
                >
                  <option value="active">Active</option>
                  <option value="blocked">Blocked</option>
                  {user.role === "driver" && (
                    <option value="pending">Pending</option>
                  )}
                </select>
              </div>
            </div>
          ))}

          <div className="flex justify-center gap-2 mt-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="bg-gray-200 disabled:opacity-50 px-3 py-1 rounded"
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="bg-gray-200 disabled:opacity-50 px-3 py-1 rounded"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
