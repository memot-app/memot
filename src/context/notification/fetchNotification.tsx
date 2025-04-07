"use client";

import React, { createContext, useContext } from "react";
import { useUserNotifications } from "@/hooks/notification/useUserNotifications";
import { useLikesNotifications } from "@/hooks/notification/useLikesNotifications";
import { useFollowNotifications } from "@/hooks/notification/useFollowNotifications";

// Notification 型（共通通知）
interface Notification {
  id: number;
  sent: boolean;
  title: string;
  body: string;
  category: string;
  notify_at: string;
  created_at: string;
  read: boolean;
}

// Like 型
interface LikeNotification {
  id: number;
  user_id: string;
  monologue_id: string;
  read: boolean;
  created_at: string;
  account?: {
    display_name: string;
    profile_picture: string;
  };
  memolog?: {
    content: string;
  };
}

// Follow 型
interface FollowNotification {
  id: number;
  user_id: string;
  follower_id: string;
  read: boolean;
  created_at: string;
  account?: {
    display_name: string;
    profile_picture: string;
  };
}

// コンテキストの型
interface NotificationContextType {
  notifications: Notification[];
  likes: LikeNotification[];
  followNotifications: FollowNotification[];
  unkotoneReadCount: number;
  unlikeReadCount: number;
  unfollowReadCount: number;
  markNotificationsAsRead: () => void;
  markLikesAsRead: () => void;
  markFollowAsRead: () => void;
  allFetch: () => void;
  loading: boolean;
  error: Error | null;
}

// Contextの作成
const NotificationContext = createContext<NotificationContextType | null>(null);

// Providerコンポーネント
export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    notifications,
    unreadCount:unkotoneReadCount,
    loading: notificationLoading,
    error: notificationError,
    markNotificationsAsRead,
    fetchNotifications,
  } = useUserNotifications();

  const {
    likes,
    unlikeReadCount,
    markLikesAsRead,
    fetchLikes,
    loading: likesLoading,
  } = useLikesNotifications();

  const {
    followNotifications,
    unreadCount:unfollowReadCount,
    markFollowAsRead,
    fetchFollowNotifications,
    loading: followLoading,
  } = useFollowNotifications();

  const allFetch = () => {
    fetchNotifications();
    fetchLikes();
    fetchFollowNotifications();
  };

  const loading = notificationLoading || likesLoading || followLoading;
  const error = notificationError; // 必要に応じて他のエラーも統合可能

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        likes,
        followNotifications,
        unkotoneReadCount,
        unlikeReadCount,
        unfollowReadCount,
        markNotificationsAsRead,
        markLikesAsRead,
        markFollowAsRead,
        allFetch,
        loading,
        error,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

// Hookとして提供
export const useNotificationContext = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotificationContext must be used within a NotificationProvider");
  }
  return context;
};
