'use client';

import React, { useState } from "react";
import { Search } from "iconoir-react";
import { usePathname, useRouter } from 'next/navigation';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export function SearchBar({ placeholder = "検索", onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // フォームのリロード防止
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  if (pathname === "/search") return null;

  return (
    <form onSubmit={handleSubmit} className="flex items-center bg-white border border-gray-500 rounded-xl p-3">
      <Search color="gray" height={18} width={18} />
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
        className="w-full p-2 rounded-md focus:outline-none focus:ring-0 focus:border-transparent"
      />
    </form>
  );
}
