import React, { createContext, useContext, useEffect } from "react";
import { GetGroupData } from "@/hooks/group/getGroupData";

interface GroupDataType {
  groupData: any[]; 
  loading: boolean;
  error: string | null;
  refreshGroups: () => Promise<void>;
}

const GroupDataContext = createContext<GroupDataType | undefined>(undefined);

export const GroupDataProvider = ({ children }: { children: React.ReactNode }) => {
  const { getGroupData, loading, error, groupData } = GetGroupData();

  useEffect(() => {
    getGroupData();
  }, [getGroupData]);

  return (
    <GroupDataContext.Provider value={{ groupData, loading, error, refreshGroups: getGroupData }}>
      {children}
    </GroupDataContext.Provider>
  );
};

export const useGroupDataContext = () => {
  const context = useContext(GroupDataContext);
  if (context === undefined) {
    throw new Error("useGroupDataContext must be used within a GroupDataProvider");
  }
  return context;
};