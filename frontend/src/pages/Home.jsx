import React from "react";

export const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-blue-100 dark:from-gray-950 dark:to-gray-900 text-gray-900 dark:text-gray-100 px-4 pt-24 animate-fade-in">
      <div className="max-w-3xl w-full text-center">
        <div className="mb-8">
          <span className="inline-block animate-bounce">
            <svg width="64" height="64" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="16" fill="url(#paint0_linear)" />
              <text x="16" y="23" textAnchor="middle" fontSize="22" fontWeight="bold" fill="white">CH</text>
              <defs>
                <linearGradient id="paint0_linear" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#8B5CF6" />
                  <stop offset="0.5" stopColor="#3B82F6" />
                  <stop offset="1" stopColor="#14B8A6" />
                </linearGradient>
              </defs>
            </svg>
          </span>
        </div>
        <h1 className="text-6xl font-extrabold mb-6 tracking-tight bg-gradient-to-r from-purple-500 via-blue-500 to-teal-400 bg-clip-text text-transparent animate-gradient">CourseHub</h1>
        <p className="text-xl mb-8 text-gray-700 dark:text-gray-300 animate-fade-in">
          <span className="font-semibold text-blue-600 dark:text-purple-400">CourseHub</span> is an open-source platform for sharing knowledge, learning new skills, and connecting with a global community. Discover free courses, contribute your own, and empower others. Built for creators, learners, and everyone in between.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <a href="/register" className="px-8 py-3 rounded-lg font-semibold shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 bg-gradient-to-r from-blue-600 to-purple-700 text-white hover:scale-105">Get Started</a>
          <a href="/courselist" className="px-8 py-3 rounded-lg font-semibold shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 bg-white dark:bg-gray-800 text-blue-700 dark:text-purple-300 hover:scale-105">View Courses</a>
        </div>
        <div className="mt-12 animate-fade-in-up">
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-2">✨ 100% free & open source</p>
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-2">🚀 Modern UI, smooth animations, and dark/light mode</p>
          <p className="text-lg text-gray-500 dark:text-gray-400">🌍 Join, share, and learn with the world</p>
        </div>
      </div>
    </div>
  );
}
