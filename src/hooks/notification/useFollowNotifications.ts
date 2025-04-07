// hooks/notification/useFollowNotifications.ts

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/userProvider";
import supabase from "@/utils/supabase/client";
import { PostgrestError } from "@supabase/supabase-js";

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

interface Options {
  enabled?: boolean;
}

export const useFollowNotifications = ({ enabled = true }: Options = {}) => {
  const [followNotifications, setFollowNotifications] = useState<FollowNotification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<PostgrestError | null>(null);
  const { user } = useAuth(); // ← Next.js側の認証からユーザーを取得

  const fetchFollowNotifications = useCallback(async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from("follow")
        .select(
          `
          *,
          account:follow (
            display_name,
            profile_picture
          )
        `
        )
        .eq("follower", user.id)
        .eq("active", true)
        .order("created_at", { ascending: false })
        .limit(100);

      if (error) {
        setError(error);
      } else {
        setFollowNotifications(data || []);
      }
    } catch (err) {
      console.error("Fetch failed", err);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  const markFollowAsRead = useCallback(async () => {
    if (!user?.id) return;

    try {
      const { error } = await supabase
        .from("follow")
        .update({ read: true })
        .eq("read", false)
        .eq("follower", user.id);

      if (error) throw error;

      await fetchFollowNotifications(); // 再取得してUI更新
    } catch (err) {
      console.error("Mark as read failed", err);
    }
  }, [user?.id, fetchFollowNotifications]);

  useEffect(() => {
    if (enabled) {
      fetchFollowNotifications();
    }
  }, [fetchFollowNotifications, enabled]);

  const unreadCount = followNotifications.filter((n) => !n.read).length;

  return {
    followNotifications,
    unreadCount,
    loading,
    error,
    fetchFollowNotifications,
    markFollowAsRead,
  };
};
