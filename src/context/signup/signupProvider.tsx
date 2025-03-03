import React, { createContext, useState, useContext } from "react";

// Context の型定義
interface UserContextType {
  username: string;
  setUsername: (value: string) => void;
  displayName: string;
  setDisplayName: (value: string) => void;
  selectedIconId: number | null;
  setSelectedIconId: (value: number) => void;
}

// 初期値
const UserContext = createContext<UserContextType | undefined>(undefined);

// プロバイダーコンポーネント
export const SignupProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [selectedIconId, setSelectedIconId] = useState<number | null>(null); 

  return (
    <UserContext.Provider value={{ username, setUsername, displayName, setDisplayName, selectedIconId, setSelectedIconId }}>
      {children}
    </UserContext.Provider>
  );
};

// useContext 用のカスタムフック
export const useSignup = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};