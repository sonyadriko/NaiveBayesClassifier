import React from 'react';
import { Link } from 'react-router-dom';

const Topbar = () => {
  return (
    <div className="bg-gray-700 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl">Naive Bayes</h1>
      <ul className="flex items-center space-x-4">
        <li>
          <Link to="/" className="text-white hover:text-gray-400">Home</Link>
        </li>
        <li>
          <Link to="/data-training" className="text-white hover:text-gray-400">Data Training</Link>
        </li>
        <li>
          <Link to="/prediction" className="text-white hover:text-gray-400">Prediksi</Link>
        </li>
        <li>
          <Link to="/evaluation" className="text-white hover:text-gray-400">Evaluasi</Link>
        </li>
      </ul>
      <button className="bg-gray-800 p-2 rounded hover:bg-gray-600">Logout</button>
    </div>
  );
};

export default Topbar;
