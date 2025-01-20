import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AccountManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch all users
  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://127.0.0.1:5000/users/', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        throw new Error('Failed to fetch users');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete a user
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://127.0.0.1:5000/users/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert('User deleted successfully');
        setUsers(users.filter((user) => user.id !== id));
      } else {
        throw new Error('Failed to delete user');
      }
    } catch (err) {
      alert(err.message);
    }
  };

  // Navigate to Add User page
  const handleAddUser = () => {
    navigate('/add-user');
  };

  // Navigate to Edit User page
  const handleEditUser = (id) => {
    navigate(`/edit-user/${id}`);
  };

  // View User details
  const handleViewUser = (id) => {
    navigate(`/view-user/${id}`);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-semibold mb-6 text-center text-gray-800">Account Management</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-700">User List</h2>
        <button
          onClick={handleAddUser}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700"
        >
          <FaPlus className="mr-2" /> Add User
        </button>
      </div>

      {loading ? (
        <p className="text-center">Loading users...</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Role</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                <td className="border border-gray-300 px-4 py-2">{user.role}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    onClick={() => handleViewUser(user.id)}
                    className="text-blue-500 hover:underline mr-4"
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={() => handleEditUser(user.id)}
                    className="text-green-500 hover:underline mr-4"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-500 hover:underline"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AccountManagementPage;
