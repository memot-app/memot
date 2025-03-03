import React, { createContext, useContext, useState } from "react";

// Context を作成
const ImageIconContext = createContext<{
  value: string;
  setValue: (newValue: string) => void;
}>({
  value: "/assets/images/profileIcon/rion.png", // Web版では文字列のパスを使用
  setValue: () => {},
});

// Context Provider コンポーネント
export const ImageIconProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [value, setValue] = useState<string>("/assets/images/profileIcon/rion.png");

  return (
    <ImageIconContext.Provider value={{ value, setValue }}>
      {children}
    </ImageIconContext.Provider>
  );
};

// Context を利用するカスタムフック
export const useImageIconContext = () => useContext(ImageIconContext);