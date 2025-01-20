import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaUserShield, FaEye, FaEyeSlash } from 'react-icons/fa'; // Import ikon

const AddUserPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State untuk toggle password visibility
  const [passwordStrength, setPasswordStrength] = useState(''); // State untuk password strength
  const navigate = useNavigate();

  // Fungsi untuk mengecek kekuatan password
  const checkPasswordStrength = (password) => {
    const lengthCriteria = /.{8,}/; // Minimal 8 karakter
    const numberCriteria = /[0-9]/; // Mengandung angka
    const uppercaseCriteria = /[A-Z]/; // Mengandung huruf besar
    const lowercaseCriteria = /[a-z]/; // Mengandung huruf kecil
    const specialCharCriteria = /[!@#$%^&*(),.?":{}|<>]/; // Mengandung karakter khusus

    if (lengthCriteria.test(password) && numberCriteria.test(password) && uppercaseCriteria.test(password) && lowercaseCriteria.test(password) && specialCharCriteria.test(password)) {
      return 'strong';
    } else if (lengthCriteria.test(password) && numberCriteria.test(password) && (uppercaseCriteria.test(password) || lowercaseCriteria.test(password))) {
      return 'medium';
    } else {
      return 'weak';
    }
  };

  // Fungsi untuk menangani perubahan password
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(checkPasswordStrength(newPassword));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const newUser = {
      name,
      email,
      password,
      role,
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();

      if (response.ok) {
        alert('User successfully added');
        navigate('/account-management');
      } else {
        setError(data.message || 'Failed to add user');
      }
    } catch (error) {
      setError('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-semibold mb-6 text-center text-gray-800">Add New User</h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-lg">
        {/* Name Input */}
        <div className="relative">
          <label htmlFor="name" className="block text-lg font-medium text-gray-700">Full Name</label>
          <div className="relative flex items-center">
            <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-600 text-xl" />
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter full name"
              className="w-full p-4 mt-2 pl-12 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              required
            />
          </div>
        </div>

        {/* Email Input */}
        <div className="relative">
          <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
          <div className="relative flex items-center">
            <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-600 text-xl" />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-4 mt-2 pl-12 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              required
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="relative">
          <label htmlFor="password" className="block text-lg font-medium text-gray-700">Password</label>
          <div className="relative flex items-center">
            <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-600 text-xl" />
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Create a password"
              className="w-full p-4 mt-2 pl-12 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              required
            />
            {/* Toggle Password Visibility */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-indigo-600 text-xl"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {/* Password Strength Indicator */}
          <div className="mt-2">
            <p className={`text-sm ${passwordStrength === 'strong' ? 'text-green-500' : passwordStrength === 'medium' ? 'text-yellow-500' : 'text-red-500'}`}>
              {passwordStrength === 'strong' ? 'Strong password' : passwordStrength === 'medium' ? 'Medium password' : 'Weak password'}
            </p>
          </div>
        </div>

        {/* Role Select */}
        <div className="relative">
          <label htmlFor="role" className="block text-lg font-medium text-gray-700">Role</label>
          <div className="relative flex items-center">
            <FaUserShield className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-600 text-xl" />
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-4 mt-2 pl-12 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className={`w-full p-4 mt-4 bg-indigo-600 text-white font-semibold rounded-md transition-all hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Adding User...' : 'Add User'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUserPage;
