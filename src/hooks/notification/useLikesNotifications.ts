// hooks/notification/useLikesNotifications.ts

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/userProvider";
import supabase from "@/utils/supabase/client";
import { PostgrestError } from "@supabase/supabase-js";

interface LikeNotification {
  id: number;
  created_at: string;
  user_id: string;
  monologue_id: string;
  read: boolean;
  account?: {
    display_name: string;
    profile_picture: string;
  };
  memolog?: {
    content: string;
  };
}

interface RawLikeNotification {
  id: number;
  created_at: string;
  user_id: string;
  monologue_id: string;
  read: boolean;
  account: {
    display_name: string;
    profile_picture: string;
  }[];
  memolog: {
    content: string;
  }[];
}

export const useLikesNotifications = () => {
  const [likes, setLikes] = useState<LikeNotification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<PostgrestError | null>(null);
  const { user } = useAuth();

  const fetchLikes = useCallback(async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const { data, error: supabaseError } = await supabase
        .from("likes")
        .select(`
          id,
          created_at,
          user_id,
          monologue_id,
          read,
          account:user_id (
            display_name,
            profile_picture
          ),
          memolog:monologue_id (
            content
          )
        `)
        .limit(100)
        .neq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (supabaseError) throw supabaseError;

      const formatted: LikeNotification[] = (data as RawLikeNotification[]).map((like) => ({
        ...like,
        account: like.account?.[0],
        memolog: like.memolog?.[0],
      }));

      setLikes(formatted);
    } catch (err) {
      setError(err as PostgrestError);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  const markLikesAsRead = useCallback(async () => {
    try {
      const { error } = await supabase
        .from("likes")
        .update({ read: true })
        .eq("read", false)
        .neq("user_id", user?.id);

      if (error) throw error;
      await fetchLikes();
    } catch (err) {
      setError(err as PostgrestError);
    }
  }, [user?.id, fetchLikes]);

  useEffect(() => {
    fetchLikes();
  }, [fetchLikes]);

  const unlikeReadCount = likes.filter((n) => !n.read).length;

  return {
    likes,
    fetchLikes,
    loading,
    error,
    unlikeReadCount,
    markLikesAsRead,
  };
};
