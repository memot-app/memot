"use client";

import { useState, useEffect } from "react";
import { useSearchAccounts } from "@/hooks/account/getSearchAccounts";
import { useSearchPosts } from "@/hooks/post/getSearchPost";
import { UserSearch } from "@/components/cards/SearchUserAccountCard";
import { PostSearch } from "@/components/cards/SearchPostCard";
import { Search } from "iconoir-react";

export default function Searching() {
  const [query, setQuery] = useState<string>("");
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const { accounts, error, searchAccounts } = useSearchAccounts();
  const { searchResults, search } = useSearchPosts();
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (isSearching && query.trim() !== "") {
      searchAccounts(query);
      search(query);
      setSearchHistory((prevHistory) => {
        const newHistory = prevHistory.includes(query)
          ? prevHistory
          : [query, ...prevHistory];
        return newHistory.slice(0, 6);
      });
      setIsSearching(false);
    }
  }, [isSearching, query, searchAccounts, search]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setIsSearching(true);
    }
  };

  const handleHistoryClick = (item: string) => {
    setQuery(item);
    setIsSearching(true);
  };

  const handleCancel = () => {
    setQuery("");
  };

  return (
    <div className="flex flex-col w-full p-7 ">
      <div className="flex items-center">
        <div className={`flex justify-between items-center rounded-lg p-3 relative transition-all duration-300 ${query ? "w-[80%]" : "w-full"} bg-gray-200`}>
          <Search color="gray" height={18} width={18} />
          <input
            type="text"
            placeholder="ユーザーや投稿を検索"
            value={query}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="p-2 rounded-md focus:outline-none focus:ring-0 focus:border-transparent w-full"
          />
        </div>
        {query && (
          <button
            onClick={handleCancel}
            className="text-gray-600 hover:text-gray-800 transition w-1/5">
            キャンセル
          </button>
        )}
      </div>

      {query === "" ? (
        <div className="bg-white p-5 rounded-lg">
          <p className="text-gray-800 text-xl font-bold">最近さがしたもの</p>
          {searchHistory.length > 0 ? (
            <ul className="mt-2">
              {searchHistory.map((item, index) => (
                <li 
                  key={index} 
                  className="leading-[3] text-gray-600 text-lg cursor-pointer hover:text-gray-900"
                  onClick={() => handleHistoryClick(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : (
        <div>
          {error && <div className="text-center text-red-500">{error}</div>}
          <UserSearch accounts={accounts} />
          <PostSearch posts={searchResults} />
        </div>
      )}
    </div>
  );
}
