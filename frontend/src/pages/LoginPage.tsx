import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Untuk navigasi setelah login
import 'animate.css';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  // Mengecek apakah token sudah ada di localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/'); // Jika sudah ada token, arahkan ke halaman utama
    }
  }, [navigate]);

  // Fungsi untuk menangani submit login
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Reset error sebelum submit

    try {
      const response = await fetch('http://127.0.0.1:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Jika login sukses, simpan token dan arahkan ke halaman utama
        localStorage.setItem('token', data.access_token); // Simpan token di localStorage
        localStorage.setItem('role', data.role);
        navigate('/'); // Redirect ke halaman utama setelah login berhasil
      } else {
        setError(data.message || 'Login failed');
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError('Error: ' + error.message); // Menampilkan error jika terjadi masalah jaringan
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="w-full max-w-md p-10 bg-white rounded-lg shadow-xl animate__animated animate__fadeIn">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back!</h2>

        {/* Menampilkan pesan error jika ada */}
        {error && (
          <div className="text-red-500 text-center mb-4 p-3 border border-red-500 rounded-md bg-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your email address"
              required
            />
          </div>
          
          <div className="mb-5">
            <label htmlFor="password" className="block text-lg font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your password"
              required
            />
          </div>
          
          <div className="text-center mb-5">
            <button
              type="submit"
              className={`w-full p-4 bg-blue-600 text-white font-semibold rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>

          {/* <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="/register" className="text-blue-500 hover:underline">Sign up</a>
            </p>
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
