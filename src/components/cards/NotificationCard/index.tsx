"use client";

import React, { useEffect, useState } from "react";
import { ProfileButton } from "@/components/buttons/ProfileButton";
import { useRouter } from "next/navigation";

interface NotificationProps {
  id: number;
  type: "like" | "system";
  message: string;
  path: string;
  timeAgo: string;
  icon_number: number;
}

const sampleNotifications: NotificationProps[] = [
  {
    id: 1,
    type: "system",
    message: "新しい機能が追加されました！詳細はこちら: https://example.com",
    path: "/notifications/1",
    timeAgo: "5分前",
    icon_number: 1,
  },
  {
    id: 2,
    type: "like",
    message: "あなたの投稿がいいねされました！",
    path: "/posts/123",
    timeAgo: "10分前",
    icon_number: 2,
  },
  {
    id: 3,
    type: "system",
    message: "メンテナンスのお知らせ。詳細はこちら: https://example.com",
    path: "/maintenance",
    timeAgo: "30分前",
    icon_number: 3,
  },
];

const parseContentWithLinks = (text: string) => {
  const urlPattern = /(https?:\/\/[^\s]+)/g;
  return text.split("\n").map((line, lineIndex) => (
    <span key={lineIndex} style={{ display: "block", whiteSpace: "pre-wrap" }}>
      {line.split(urlPattern).map((part, index) =>
        urlPattern.test(part) ? (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            {part.length > 20 ? `${part.slice(0, 17)}...` : part}
          </a>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </span>
  ));
};

export function NotificationCard() {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);
  const router = useRouter();

  useEffect(() => {
    console.log("NotificationCard がマウントされました");  // ← 確認ログ
    setNotifications(sampleNotifications);
  }, []);

  if (notifications.length === 0) {
    console.log("通知データがありません");
    return <div className="p-4 text-gray-500">通知はありません</div>;
  }

  return (
    <div className="w-full p-4 bg-gray-100 rounded-lg">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="flex items-start mb-4 cursor-pointer"
          onClick={() => router.push(notification.path)}
        >
          <ProfileButton path={notification.path} icon_number={notification.icon_number} />
          <div
            className={`max-w-xs p-3 rounded-lg shadow-md ml-2 ${
              notification.type === "like" ? "bg-pink-200 text-gray-800" : "bg-contentbg text-gray-800"
            }`}
          >
            <p className="text-sm">{parseContentWithLinks(notification.message)}</p>
            <span className="block text-xs text-gray-500 text-right mt-1">{notification.timeAgo}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
