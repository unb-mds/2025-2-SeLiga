import React from "react";

export const SearchBar = ({ searchTerm, onSearchChange, placeholder }) => (
    <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition duration-150"
    />
);
