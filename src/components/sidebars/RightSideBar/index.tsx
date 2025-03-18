import React from 'react';
import { SearchBar } from "@/components/bar/SearchBar";
// import { RoomsSection } from "@/components/cards/RoomsSectionCard";
import { NotificationsSection } from "@/components/cards/NotificationsSectionCard";

export function RightSideBar() {
  return (
<div className="h-screen flex flex-col flex-grow p-4 gap-4 border-none z-10">

      {/* 検索バー */}
      <SearchBar />

      {/* ルーム一覧 */}
      {/* <RoomsSection /> */}

      {/* 通知一覧 */}
      <NotificationsSection />

    </div>
  );
}
