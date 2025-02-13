import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Topbar from './components/Topbar';
import DataTraining from './pages/DataTraining';
import Home from './pages/Home';
import Prediction from './pages/Prediction';
import Evaluation from './pages/Evaluation';
import LoginPage from './pages/LoginPage';
import AccountManagementPage from './pages/AccountManagementPage';
import AddUserPage from './pages/AddUserPage';
import EditUserPage from './pages/EditUserPage';
import ViewUserPage from './pages/ViewUserPage';
import './index.css';

function App() {
  // Fungsi untuk memeriksa apakah pengguna sudah login berdasarkan token
  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return token !== null; // Jika token ada, berarti sudah login
  };

  return (
    <Router>
      <div>
        <Routes>
          {/* Route untuk halaman login */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* Halaman yang membutuhkan autentikasi */}
          <Route
            path="/"
            element={
              isAuthenticated() ? (
                <>
                  <Topbar /> {/* Menampilkan Topbar untuk halaman selain login */}
                  <div className="flex main-content">
                    <div className="flex-1 p-6">
                      <Home />
                    </div>
                  </div>
                </>
              ) : (
                <Navigate to="/login" /> // Jika belum login, redirect ke login
              )
            }
          />
          
          {/* Route lainnya yang juga memerlukan autentikasi */}
          <Route
            path="/data-training"
            element={
              isAuthenticated() ? (
                <>
                  <Topbar />
                  <div className="flex main-content">
                    <div className="flex-1 p-6">
                      <DataTraining />
                    </div>
                  </div>
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          
          <Route
            path="/prediction"
            element={
              isAuthenticated() ? (
                <>
                  <Topbar />
                  <div className="flex main-content">
                    <div className="flex-1 p-6">
                      <Prediction />
                    </div>
                  </div>
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          
          <Route
            path="/evaluation"
            element={
              isAuthenticated() ? (
                <>
                  <Topbar />
                  <div className="flex main-content">
                    <div className="flex-1 p-6">
                      <Evaluation />
                    </div>
                  </div>
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/account-management"
            element={
              isAuthenticated() ? (
                <>
                  <Topbar />
                  <div className="flex main-content">
                    <div className="flex-1 p-6">
                      <AccountManagementPage />
                    </div>
                  </div>
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/add-user"
            element={
              isAuthenticated() ? (
                <>
                  <Topbar />
                  <div className="flex main-content">
                    <div className="flex-1 p-6">
                      <AddUserPage  />
                    </div>
                  </div>
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/edit-user/:id"
            element={
              isAuthenticated() ? (
                <>
                  <Topbar />
                  <div className="flex main-content">
                    <div className="flex-1 p-6">
                      <EditUserPage  />
                    </div>
                  </div>
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/view-user/:id"
            element={
              isAuthenticated() ? (
                <>
                  <Topbar />
                  <div className="flex main-content">
                    <div className="flex-1 p-6">
                      <ViewUserPage  />
                    </div>
                  </div>
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
