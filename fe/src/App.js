import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Ganti Switch dengan Routes
import Topbar from './components/Topbar';
import DataTraining from './pages/DataTraining';
import Home from './pages/Home';  // Import Home page
import Prediction from './pages/Prediction';  // Import Prediksi page
import Evaluation from './pages/Evaluation';  // Import Evaluasi page
import './index.css';

function App() {
  return (
    <Router>
      <div>
        <Topbar />
        <div className="flex main-content">
          <div className="flex-1 p-6">
          <Routes>
              {/* Menambahkan routing untuk setiap halaman */}
              <Route path="/" element={<Home />} />
              <Route path="/data-training" element={<DataTraining />} />
              <Route path="/prediction" element={<Prediction />} />
              <Route path="/evaluation" element={<Evaluation />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
