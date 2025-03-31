"use client";

import { useState } from "react";
import { useSearchAccounts } from "@/hooks/account/getSearchAccounts";
import { useSearchPosts } from "@/hooks/post/getSearchPost";
import { UserSearch } from "@/components/cards/SearchUserAccountCard";
import { PostSearch } from "@/components/cards/SearchPostCard";

export default function Search() {
  const [query, setQuery] = useState<string>("");
  const { accounts, error, searchAccounts } = useSearchAccounts();
  const { searchResults, search } = useSearchPosts();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim() !== "") {
      searchAccounts(query);
      search(query);
    }
  };

  return (
    <div className="flex flex-col w-full p-7">
      <div className="bg-white border border-gray-500 rounded-lg p-3">
        <input
          type="text"
          placeholder="検索..."
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="w-full p-2 rounded-md focus:outline-none focus:ring-0 focus:border-transparent"
        />
      </div>
      {error && <div className="text-center text-red-500">{error}</div>}
      <UserSearch accounts={accounts} />
      <PostSearch posts={searchResults} />
    </div>
  );
}
