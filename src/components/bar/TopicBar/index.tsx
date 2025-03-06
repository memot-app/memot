import React from "react";

export default function TopicBar() {
  return (
    <div className="flex flex-col border-2 w-full  border-gray-400 rounded-lg p-3 bg-white items-center">
      {/* 均等配置の日付ボタン */}
      <div className="grid grid-cols-7 gap-4 justify-center">
        <button
          className="flex items-center justify-center rounded-full bg-green-500 text-white font-bold text-base"
          style={{ height: 55, width: 55 }}
        >
          今日
        </button>
        {[24, 21, 20, 19, 18, 17].map((day) => (
          <button
            key={day}
            className="flex items-center justify-center rounded-full bg-gray-100 text-gray-500 text-base"
            style={{ height: 55, width: 55 }}
          >
            {day}日
          </button>
        ))}
      </div>
    </div>
  );
}
