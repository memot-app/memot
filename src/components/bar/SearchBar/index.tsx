"use client"; 

import React, { useState } from "react";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export function SearchBar({ placeholder = "検索...", onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (onSearch) {
      onSearch(e.target.value); // 検索ワードを親に渡す
    }
  };

  return (
    <div className="bg-white border border-gray-500 rounded-lg p-3">
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
        className="w-full p-2 rounded-md focus:outline-none focus:ring-0 focus:border-transparent"
      />
    </div>
  );
}
