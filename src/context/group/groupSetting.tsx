import React, { createContext, useContext, useState, ReactNode } from "react";

export interface GroupSettingState {
  roomName: string;
  includeOwnPosts: boolean;
  selectedUsers: any[];
  setRoomName: React.Dispatch<React.SetStateAction<string>>;
  setIncludeOwnPosts: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedUsers: React.Dispatch<React.SetStateAction<any[]>>;
}

interface GroupSettingProviderProps {
  initialValues: {
    roomName: string;
    includeOwnPosts: boolean;
    selectedUsers: any[];
  };
  children: ReactNode;
}

const GroupSettingContext = createContext<GroupSettingState | undefined>(undefined);

export const GroupSettingProvider = ({
  initialValues,
  children,
}: GroupSettingProviderProps) => {
  const [roomName, setRoomName] = useState(initialValues.roomName);
  const [includeOwnPosts, setIncludeOwnPosts] = useState(initialValues.includeOwnPosts);
  const [selectedUsers, setSelectedUsers] = useState(initialValues.selectedUsers);

  return (
    <GroupSettingContext.Provider value={{ roomName, setRoomName, includeOwnPosts, setIncludeOwnPosts, selectedUsers, setSelectedUsers }}>
      {children}
    </GroupSettingContext.Provider>
  );
};

export const useGroupSetting = () => {
  const context = useContext(GroupSettingContext);
  if (!context) {
    throw new Error("useGroupSetting must be used within a GroupSettingProvider");
  }
  return context;
};