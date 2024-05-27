// SearchBar.js
import React from 'react';

const SearchBar = () => {
  return (
    <div className="relative m-3 mt-2 ml-6   ">
      <input
        type="text"
        className="w-full py-2  pl-10 pr-4 bg-white border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Recherche..."
      />
      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-4.35-4.35M15.5 10.5a5 5 0 1 0-5 5 5 5 0 0 0 5-5z"
          />
        </svg>
      </div>
    </div>
  );
};

export default SearchBar;
