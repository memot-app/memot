import React from "react";
import { BellNotification } from "iconoir-react";

export function NotificationsSection() {
  return (
    <div>
      {/* 通知タイトル */}
      <div className="flex items-center gap-2 text-gray-500 text-lg">
        <BellNotification width="1em" height="1em" />
        <div>通知</div>
      </div>

      {/* 通知一覧（サンプル枠） */}
      <div className="bg-white border border-gray-500 rounded-lg p-4 h-48 flex justify-center items-center">
        <p className="text-gray-400">最新の通知</p>
      </div>
    </div>
  );
}
