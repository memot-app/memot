"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useNotificationContext } from "@/context/notification/fetchNotification";
import { getRelativeTimeString } from "@/hooks/timeUtils";

const transformMapping = {
  kotone: (item: { id: string; notify_at: string; body: string }) => ({
    id: item.id,
    title: "ことね",
    icon: "/images/ai-icon1.png",
    path: null,
    notify_at: item.notify_at,
    body: item.body,
  }),
  like: (item: { id: string; account?: { display_name: string; profile_picture?: string }; user_id: string; created_at: string; memolog?: { content: string } }) => ({
    id: item.id,
    title: `${item.account?.display_name}さんがあなたのめもにいいねしました。`,
    path: `/profile/${item.user_id}`,
    icon: item.account?.profile_picture || "/images/iine.png",
    notify_at: item.created_at,
    body: item.memolog?.content,
  }),
  follow: (item: { id: string; account?: { display_name: string; profile_picture?: string }; follow: string; updated_at: string }) => ({
    id: item.id,
    title: `${item.account?.display_name}さんがあなたをフォローしました。`,
    path: `/profile/${item.follow}`,
    icon: item.account?.profile_picture || "/images/follow.png",
    notify_at: item.updated_at,
    body: null,
  }),
};

const headerMapping = {
  kotone: "ことね🌙💬",
  like: "いいね",
  follow: "フォロー",
};

const urlPattern = /(https?:\/\/[^\s)]+)/g;
const getTruncatedUrl = (url: string) => {
  try {
    const parsed = new URL(url);
    return parsed.hostname;
  } catch {
    return url;
  }
};

const parseContentWithLinks = (text: string) =>
  text.split("\n").map((line, i) => (
    <p key={i} className="font-semibold text-gray-700">
      {line.split(urlPattern).map((part, j) => {
        if (urlPattern.test(part)) {
          return (
            <a
              key={j}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              {getTruncatedUrl(part)}
            </a>
          );
        }
        return <React.Fragment key={j}>{part}</React.Fragment>;
      })}
    </p>
  ));

export default function NotificationDetailPage() {
  const params = useParams();
  const idStr = Array.isArray(params.id) ? params.id[0] : params.id;
  const { notifications, likes, followNotifications, markNotificationsAsRead, markLikesAsRead, markFollowAsRead } = useNotificationContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let markPromise = null;
    if (idStr === "kotone") markPromise = markNotificationsAsRead();
    else if (idStr === "like") markPromise = markLikesAsRead();
    else if (idStr === "follow") markPromise = markFollowAsRead();

    if (!markPromise) {
      setLoading(false);
      return;
    }
    markPromise.finally(() => setLoading(false));
  }, [idStr, markNotificationsAsRead, markLikesAsRead, markFollowAsRead]);

  let dataSource = [];
  if (idStr === "like") dataSource = likes;
  else if (idStr === "kotone") dataSource = notifications.filter(n => n.category === "kotone");
  else if (idStr === "follow") dataSource = followNotifications;
  else dataSource = notifications;

  const transformedData = dataSource.map(transformMapping[idStr]) as Array<{
    id: string;
    title: string;
    icon: string;
    path: string | null;
    notify_at: string;
    body: string | null;
  }>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {loading ? (
        <p>読み込み中...</p>
      ) : transformedData.length === 0 ? (
        <p className="text-center text-gray-500">データはありません。</p>
      ) : (
        <div className="space-y-6">
          {transformedData.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-4 p-4 rounded-lg"
            >
              <Link href={item.path || "#"}>
                <Image
                  src={item.icon}
                  width={56}
                  height={56}
                  className="rounded-full"
                  alt="icon"
                />
              </Link>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <p className="font-bold text-gray-800">{item.title}</p>
                  <span className="text-sm text-gray-500">
                    {getRelativeTimeString(item.notify_at)}
                  </span>
                </div>
                {item.body && (
                  <div className="mt-2 bg-gray-100 p-3 rounded">
                    {parseContentWithLinks(item.body)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );  
}
