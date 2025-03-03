// SearchLogContext.tsx
import React, { createContext, useContext, useState } from "react";

interface SearchLogContextType {
  searchLog: string[];
  addSearchTerm: (term: string) => void;
  selectedSearchTerm: string;
  setSelectedSearchTerm: (term: string) => void;
}

const SearchLogContext = createContext<SearchLogContextType>({
  searchLog: [],
  addSearchTerm: () => {},
  selectedSearchTerm: "",
  setSelectedSearchTerm: () => {},
});

export const SearchLogProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [searchLog, setSearchLog] = useState<string[]>([]);
  const [selectedSearchTerm, setSelectedSearchTerm] = useState("");

  const addSearchTerm = (term: string) => {
    if (term.trim().length === 0) return; // 空白のみの入力を無視
    setSearchLog((prevLog) => {
      const updatedLog = [term, ...prevLog];
      return updatedLog.length > 6 ? updatedLog.slice(0, 6) : updatedLog;
    });
    // 必要に応じて、選択された検索語にも設定する
    setSelectedSearchTerm(term);
  };

  return (
    <SearchLogContext.Provider value={{ searchLog, addSearchTerm, selectedSearchTerm, setSelectedSearchTerm }}>
      {children}
    </SearchLogContext.Provider>
  );
};

export const useSearchLog = () => {
  return useContext(SearchLogContext);
};