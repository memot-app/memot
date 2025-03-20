import React from "react";
import { Circle } from "iconoir-react";

export function RoomsSection() {
  return (
    <div>
      {/* ルームタイトル */}
      <div className="flex items-center gap-2 text-gray-500">
        <Circle width={24} height={24} />
        <div>ルーム（DM）</div>
      </div>

      {/* ルーム一覧（サンプル枠） */}
      <div className="bg-white border rounded-lg p-4 h-48 flex justify-center items-center">
        <p className="text-gray-400">DM一覧</p>
      </div>
    </div>
  );
}
