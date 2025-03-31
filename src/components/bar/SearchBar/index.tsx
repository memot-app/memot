"use client"; 

import React, { useState } from "react";
import { Search } from "iconoir-react";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export function SearchBar({ placeholder = "検索", onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (onSearch) {
      onSearch(e.target.value); // 検索ワードを親に渡す
    }
  };

  return (
    <div className="flex items-center bg-white border border-gray-500 rounded-xl p-3">
      <Search color="gray" height={18} width={18} />

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
