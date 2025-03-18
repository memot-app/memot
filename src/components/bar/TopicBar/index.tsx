import React, {useState} from "react";

export default function TopicBar() {
  const [selectedDate, setSelectedDate] = useState("今日");

  // 昨日から6日分の日付を取得
  const getDates = () => {
    const today = new Date();
    today.setDate(today.getDate() - 1); // 昨日に設定
    const datesArray = ["今日"];
    for (let i = 0; i < 6; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() - i);
      const day = nextDate.getDate();
      datesArray.push(`${day}日`);
    }
    return datesArray;
  };
  const dates = getDates();

  return (
    <div className="flex flex-col border-2 w-full border-gray-400 rounded-lg p-3 bg-white items-center">
      {/* 均等配置の日付ボタン */}
      <div className="grid grid-cols-7 gap-4 justify-center">
        {dates.map((date, index) => (
          <button
            key={index}
            className={`flex items-center justify-center rounded-full text-base font-bold ${
              selectedDate === date ? "bg-green-500 text-white" : "bg-gray-100 text-gray-500"
            }`}
            style={{ height: 55, width: 55 }}
            onClick={() => setSelectedDate(date)}
          >
            {date}
          </button>
        ))}
      </div>
    </div>
  );
}
