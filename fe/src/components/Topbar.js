import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Topbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 0);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 shadow-lg transition-all duration-300 ${
        isScrolled ? 'bg-white text-black' : 'bg-gray-800 text-white'
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <h1
          className={`text-2xl font-bold tracking-wide hover:${
            isScrolled ? 'text-gray-700' : 'text-gray-300'
          } transition-all`}
        >
          Naive Bayes
        </h1>

        {/* Menu for larger screens */}
        <ul className="hidden md:flex items-center space-x-6">
          <li>
            <Link
              to="/"
              className={`${
                isActive('/') ? 'text-indigo-400' : ''
              } hover:${
                isScrolled ? 'text-indigo-600' : 'text-indigo-300'
              } transition-all`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/data-training"
              className={`${
                isActive('/data-training') ? 'text-indigo-400' : ''
              } hover:${
                isScrolled ? 'text-indigo-600' : 'text-indigo-300'
              } transition-all`}
            >
              Data Training
            </Link>
          </li>
          <li>
            <Link
              to="/prediction"
              className={`${
                isActive('/prediction') ? 'text-indigo-400' : ''
              } hover:${
                isScrolled ? 'text-indigo-600' : 'text-indigo-300'
              } transition-all`}
            >
              Prediksi
            </Link>
          </li>
          <li>
            <Link
              to="/evaluation"
              className={`${
                isActive('/evaluation') ? 'text-indigo-400' : ''
              } hover:${
                isScrolled ? 'text-indigo-600' : 'text-indigo-300'
              } transition-all`}
            >
              Evaluasi
            </Link>
          </li>
        </ul>

        {/* Logout button */}
        <button
          className={`hidden md:block px-4 py-2 rounded-md transition-all ${
            isScrolled
              ? 'bg-gray-100 text-black hover:bg-gray-200'
              : 'bg-gray-700 text-white hover:bg-gray-600'
          }`}
        >
          Logout
        </button>

        {/* Hamburger Menu Button */}
        <button
          className="block md:hidden focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg
            className={`w-6 h-6 transition-all ${
              isScrolled ? 'text-black' : 'text-white'
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
            />
          </svg>
        </button>
      </div>

      {/* Dropdown Menu for smaller screens */}
      {isMenuOpen && (
        <ul
          className={`md:hidden ${
            isScrolled ? 'bg-white text-black' : 'bg-gray-800 text-white'
          } px-4 py-3 space-y-2`}
        >
          <li>
            <Link
              to="/"
              className={`block ${
                isActive('/') ? 'text-indigo-400' : ''
              } hover:${
                isScrolled ? 'text-indigo-600' : 'text-indigo-300'
              } transition-all`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/data-training"
              className={`block ${
                isActive('/data-training') ? 'text-indigo-400' : ''
              } hover:${
                isScrolled ? 'text-indigo-600' : 'text-indigo-300'
              } transition-all`}
              onClick={() => setIsMenuOpen(false)}
            >
              Data Training
            </Link>
          </li>
          <li>
            <Link
              to="/prediction"
              className={`block ${
                isActive('/prediction') ? 'text-indigo-400' : ''
              } hover:${
                isScrolled ? 'text-indigo-600' : 'text-indigo-300'
              } transition-all`}
              onClick={() => setIsMenuOpen(false)}
            >
              Prediksi
            </Link>
          </li>
          <li>
            <Link
              to="/evaluation"
              className={`block ${
                isActive('/evaluation') ? 'text-indigo-400' : ''
              } hover:${
                isScrolled ? 'text-indigo-600' : 'text-indigo-300'
              } transition-all`}
              onClick={() => setIsMenuOpen(false)}
            >
              Evaluasi
            </Link>
          </li>
          <li>
            <button
              className={`w-full text-left px-4 py-2 rounded-md transition-all ${
                isScrolled
                  ? 'bg-gray-100 text-black hover:bg-gray-200'
                  : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Logout
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Topbar;
