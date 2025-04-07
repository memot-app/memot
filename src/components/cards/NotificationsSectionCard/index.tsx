"use client";
import React from "react";
import Image from "next/image";
import {  useRouter } from 'next/navigation';
import { useNotificationContext } from "@/context/notification/fetchNotification";
const iconMap: Record<string, string> = {
  "kotone": "/images/ai-icon1.png",
  "like": "/images/iine.png",
  "follow": "/images/follow.png",
};

export function NotificationsSectionCard() {
  const { 
    notifications, 
    unkotoneReadCount,
    likes, 
    unlikeReadCount, 
    followNotifications, 
    unfollowReadCount, 
    // error,
    // markNotificationsAsRead,
    // markLikesAsRead,
    // markFollowAsRead
  } = useNotificationContext();
  const router = useRouter();

  const categories = [
    {
      label: "ことね🌙💬",
      key: "kotone",
      body: notifications.length > 0 ? notifications[0].body : "通知はありません。",
      at_time: notifications.length > 0 ? notifications[0].notify_at : "",
      read: unkotoneReadCount,
      icon: "kotone",
      color: "#1D3557",
    },
    {
      label: "いいね",
      key: "like",
      body: likes.length > 0 ? `${likes[0].account!.display_name}さんがあなたのめもにいいねしました。` : "通知はありません。",
      at_time: likes.length > 0 ? likes[0].created_at : "",
      read: unlikeReadCount,
      icon: "like",
      color: "#E63946",
    },
    {
      label: "フォロー",
      key: "follow",
      body: followNotifications.length > 0 ? `${followNotifications[0].account!.display_name}さんがあなたをフォローしました。` : "通知はありません。",
      at_time: followNotifications.length > 0 ? followNotifications[0].created_at : "",
      read: unfollowReadCount,
      icon: "follow",
      color: "#1D3557",
    },
  ];

  return (
    <div className="space-y-4">
      {categories.map((cat) => (
        <div
          key={cat.key}
          onClick={() => router.push(`/notification/${cat.key}`)}
          className="flex items-center bg-white rounded-2xl p-4 shadow-sm hover:bg-gray-50 cursor-pointer"
        >
          {/* Icon */}
          <div className="w-14 h-14 relative mr-5">
            <Image
              src={iconMap[cat.icon]}
              alt={`${cat.label} icon`}
              width={56}
              height={56}
              className="rounded-full object-cover"
            />
          </div>

          {/* Text */}
          <div className="flex-1">
            <div className="text-base font-semibold text-gray-800">
              {cat.label}
            </div>
          </div>
          {/* Unread Count */}
          {cat.read !== 0 && (
            <div className="bg-red-500 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center">
              {cat.read}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
