import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaSave, FaArrowLeft } from 'react-icons/fa';

const EditUserPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState({ name: '', email: '', role: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://127.0.0.1:5000/users/${id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          throw new Error('Failed to fetch user details');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://127.0.0.1:5000/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        setSuccess('User updated successfully');
        navigate('/account-management');
      } else {
        throw new Error('Failed to update user');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <button
        className="flex items-center text-blue-500 hover:underline mb-4"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft className="mr-2" /> Back
      </button>
      {loading ? ( 
        <p className="text-center">Loading users...</p>
      ) : (
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-6">Edit User</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <select
            id="role"
            name="role"
            value={user.role}
            onChange={handleChange}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
        <button
          type="submit"
          className="flex items-center px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700"
        >
          <FaSave className="mr-2" /> Save Changes
        </button>
      </form>
      )}
    </div>
  );
};

export default EditUserPage;
