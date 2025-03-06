import React from "react";
import { Circle } from "iconoir-react";

export function NotificationsSection() {
  return (
    <div>
      {/* 通知タイトル */}
      <div className="flex items-center gap-2 text-gray-500">
        <Circle width={24} height={24} />
        <div>通知</div>
      </div>

      {/* 通知一覧（サンプル枠） */}
      <div className="bg-white border rounded-lg p-4 h-48 shadow-md flex justify-center items-center">
        <p className="text-gray-400">最新の通知</p>
      </div>
    </div>
  );
}
