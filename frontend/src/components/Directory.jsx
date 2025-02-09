import React, { useState, useEffect } from "react";
import axios from "axios";

const UsersList = () => {
  // States for storing user data, filtered data, and loading/error states
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states for inputs like name, email, etc.
  const [filter, setFilter] = useState({
    name: "",
    email: "",
    role: "",
  });

  // Fetch all users data when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users");
        setUsers(response.data.users);  // Assuming 'users' is the key with the data
        setFilteredUsers(response.data.users);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch users");
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Handle the filter input changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({
      ...filter,
      [name]: value,
    });
  };

  // Filter users based on filter state
  useEffect(() => {
    const applyFilter = () => {
      const filtered = users.filter((user) => {
        return (
          user.fullname.toLowerCase().includes(filter.name.toLowerCase()) &&
          user.email.toLowerCase().includes(filter.email.toLowerCase()) &&
          (filter.role ? user.role.toLowerCase().includes(filter.role.toLowerCase()) : true)
        );
      });
      setFilteredUsers(filtered);
    };
    applyFilter();
  }, [filter, users]);

  // Loading and error handling
  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
      {/* Filter Form */}
      <div className="mb-4">
        <input
          type="text"
          name="name"
          placeholder="Filter by name"
          value={filter.name}
          onChange={handleFilterChange}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          name="email"
          placeholder="Filter by email"
          value={filter.email}
          onChange={handleFilterChange}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          name="role"
          placeholder="Filter by role"
          value={filter.role}
          onChange={handleFilterChange}
          className="border p-2"
        />
      </div>

      {/* Users Table */}
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 border">Full Name</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Role</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center py-4">No users found</td>
            </tr>
          ) : (
            filteredUsers.map((user) => (
              <tr key={user._id} className="border-b">
                <td className="px-4 py-2">{user.fullname}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.role}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
