import React from 'react';
import { SearchBar } from "@/components/bar/SearchBar";
import { RoomsSection } from "@/components/cards/RoomsSectionCard";
import { NotificationsSection } from "@/components/cards/NotificationsSectionCard";

export function RightSideBar() {
  return (
    <div className="hidden md:flex flex-col flex-growb bg-D p-4 gap-4">
      {/* 検索バー */}
      <SearchBar />

      {/* ルーム一覧 */}
      <RoomsSection />

      {/* 通知一覧 */}
      <NotificationsSection />

    </div>
  );
}
