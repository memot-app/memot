import React, { createContext, useContext, useState } from "react";

// Context を作成
const SelectedTimeDataContext = createContext<{
  selectedTimeData: string;
  setSelectedTimeData: (newSelectedTimeData: string) => void;
}>({
  selectedTimeData: "", // 初期値を空文字列に設定
  setSelectedTimeData: () => {},
});

// Context Provider コンポーネント
export const SelectedTimeDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedTimeData, setSelectedTimeData] = useState<string>("");

  return (
    <SelectedTimeDataContext.Provider
      value={{ selectedTimeData, setSelectedTimeData }}
    >
      {children}
    </SelectedTimeDataContext.Provider>
  );
};

// Context を利用するカスタムフック
export const useSelectedTimeDataContext = () =>
  useContext(SelectedTimeDataContext);
