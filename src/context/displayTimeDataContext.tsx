import React, { createContext, useContext, useState } from "react";

// Context を作成
const DisplayTimeDataContext = createContext<{
  displayTimeData: string;
  setDisplayTimeData: (newDisplayTimeData: string) => void;
}>({
  displayTimeData: "", // 初期値を空文字列に設定
  setDisplayTimeData: () => {},
});

// Context Provider コンポーネント
export const DisplayTimeDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [displayTimeData, setDisplayTimeData] = useState<string>("");

  return (
    <DisplayTimeDataContext.Provider
      value={{ displayTimeData, setDisplayTimeData }}
    >
      {children}
    </DisplayTimeDataContext.Provider>
  );
};

// Context を利用するカスタムフック
export const useDisplayTimeDataContext = () =>
  useContext(DisplayTimeDataContext);
