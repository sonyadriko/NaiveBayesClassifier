import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Topbar from "./components/Topbar";
import DataTraining from "./pages/DataTrainingPage";
import Home from "./pages/HomePage";
import Prediction from "./pages/PredictionPage";
import Evaluation from "./pages/EvaluationPage";
import LoginPage from "./pages/LoginPage";
import "./index.css";

const App: React.FC = () => {
  // Fungsi untuk memeriksa apakah pengguna sudah login berdasarkan token
  const isAuthenticated = (): boolean => {
    const token = localStorage.getItem("token");
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
                  <Topbar />
                  <div className="flex main-content">
                    <div className="flex-1 p-6">
                      <Home />
                    </div>
                  </div>
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Route lainnya dengan proteksi autentikasi */}
          {[
            { path: "/data-training", element: <DataTraining /> },
            { path: "/prediction", element: <Prediction /> },
            { path: "/evaluation", element: <Evaluation /> },
            // { path: "/account-management", element: <AccountManagementPage /> },
            // { path: "/add-user", element: <AddUserPage /> },
            // { path: "/edit-user/:id", element: <EditUserPage /> },
            // { path: "/view-user/:id", element: <ViewUserPage /> },
          ].map(({ path, element }) => (
            <Route
              key={path}
              path={path}
              element={
                isAuthenticated() ? (
                  <>
                    <Topbar />
                    <div className="flex main-content">
                      <div className="flex-1 p-6">{element}</div>
                    </div>
                  </>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          ))}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
