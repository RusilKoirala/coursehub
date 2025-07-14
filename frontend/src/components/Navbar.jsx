import React, { useEffect, useState, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaSun, FaMoon, FaUserCircle, FaCog, FaSignOutAlt } from "react-icons/fa";
import { AuthContext } from "../context/authContext";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(() => {
    // Initialize theme from localStorage or system preference
    if (typeof window !== "undefined") {
      if (localStorage.theme === "dark") return true;
      if (
        !("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      )
        return true;
    }
    return false;
  });

  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-gradient-to-r dark:from-gray-950 dark:to-gray-900 backdrop-blur border-b border-gray-200 dark:border-gray-800 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100"
        >
          <span className="rounded-lg px-2 py-1 bg-gradient-to-r from-purple-500 via-blue-500 to-teal-400 text-white shadow-sm animate-pulse flex items-center">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block mr-2 align-middle">
              <circle cx="16" cy="16" r="16" fill="url(#paint0_linear)" />
              <text x="16" y="21" textAnchor="middle" fontSize="16" fontWeight="bold" fill="white">CH</text>
              <defs>
                <linearGradient id="paint0_linear" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#8B5CF6" />
                  <stop offset="0.5" stopColor="#3B82F6" />
                  <stop offset="1" stopColor="#14B8A6" />
                </linearGradient>
              </defs>
            </svg>
            CourseHub
          </span>
        </Link>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-3 py-1 rounded-lg font-medium transition-colors ${
              isActive
                ? "bg-blue-100 dark:bg-purple-900 text-blue-700 dark:text-purple-300"
                : "text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800"
            }`
          }
        >
          Home
        </NavLink>
        {user ? (
          <>
            <NavLink
              to="/courselist"
              className={({ isActive }) =>
                `px-3 py-1 rounded-lg font-medium transition-colors ${
                  isActive
                    ? "bg-blue-100 dark:bg-purple-900 text-blue-700 dark:text-purple-300"
                    : "text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800"
                }`
              }
            >
              Courses
            </NavLink>
            {user.role === "Admin" && (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `px-3 py-1 rounded-lg font-medium transition-colors ${
                    isActive
                      ? "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300"
                      : "text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-800"
                  }`
                }
              >
                Admin Dashboard
              </NavLink>
            )}
            <div className="relative ml-2">
              <button
                className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 rounded-full px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                onClick={() => setDropdownOpen((open) => !open)}
                aria-label="Profile menu"
              >
                <FaUserCircle className="text-xl" />
                {user.name}
                <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2 z-50 animate-fade-in">
                  <button
                    className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition text-left"
                    onClick={() => { setDropdownOpen(false); navigate('/settings'); }}
                  >
                    <FaCog /> Settings
                  </button>
                  <button
                    className="w-full flex items-center gap-2 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 transition text-left"
                    onClick={() => { setDropdownOpen(false); logout(); navigate('/login'); }}
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `px-3 py-1 rounded-lg font-medium transition-colors ${
                  isActive
                    ? "bg-blue-100 dark:bg-purple-900 text-blue-700 dark:text-purple-300"
                    : "text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800"
                }`
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                `px-3 py-1 rounded-lg font-medium transition-colors ${
                  isActive
                    ? "bg-blue-100 dark:bg-purple-900 text-blue-700 dark:text-purple-300"
                    : "text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800"
                }`
              }
            >
              Register
            </NavLink>
          </>
        )}
        {/* Theme toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          aria-label="Toggle Dark Mode"
          className="ml-2 rounded-full p-2 bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-purple-900 transition-colors shadow"
        >
          {darkMode ? (
            <FaSun size={18} className="text-yellow-400" />
          ) : (
            <FaMoon size={18} className="text-purple-400" />
          )}
        </button>
      </div>
    </nav>
  );
}
