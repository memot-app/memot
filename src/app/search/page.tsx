"use client";

import { useState } from "react";
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim() !== "") {
      searchAccounts(query);
      search(query);
      
      setSearchHistory((prevHistory) => {
        // すでに履歴にある場合は追加しない
        const newHistory = prevHistory.includes(query)
          ? prevHistory
          : [query, ...prevHistory];
  
        // 最新6件のみ保持（古いものを削除）
        return newHistory.slice(0, 6);
      });
     

      setQuery(""); // 検索後、入力欄をクリア
    }
  };

  const handleCancel = () => {
    setQuery(""); // 入力欄をクリア
  };

  return (
    <div className="flex flex-col w-full p-7">
      <div className="flex items-center">
      <div className={`flex items-center bg-white border border-gray-500 rounded-lg p-3 justify-between relative transition-all duration-300 ${query ? "w-[80%]" : "w-full"}`}>
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
            className="absolute left-250 text-gray-600 hover:text-gray-800 transition">
            キャンセル
          </button>
        )}
      
      </div>

      {/* 検索バーが空のとき、最近の検索履歴を表示 */}
      {query === "" ? (
        <div className="mt-3 bg-white p-3 rounded-lg">
          <p className="text-gray-800 text-xl font-bold">最近さがしたもの</p>
          {searchHistory.length > 0 ? (
            <ul className="mt-2">
              {searchHistory.map((item, index) => (
                <li key={index} className="leading-[3] text-gray-600 text-lg">
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ):(
    <div>
      {error && <div className="text-center text-red-500">{error}</div>}
      <UserSearch accounts={accounts} />
      <PostSearch posts={searchResults} />
    </div>
     )}
    
    </div>
  );
}

