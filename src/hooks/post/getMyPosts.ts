import { useState, useEffect, useCallback, useRef } from "react";
import supabase from "@/utils/supabase/client";
import { getRelativeTimeString } from "@/hooks/timeUtils";
import { Post } from "@/constants/types";

export const useMyPosts = (userId: string | undefined) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const offsetRef = useRef(0);
  const LIMIT = 100;

  const fetchMyPosts = useCallback(async (reset: boolean = false) => {
    if (!userId) {
      if (reset) setLoading(false);
      return;
    }
    if (reset) {
      setLoading(true);
      offsetRef.current = 0;
      setPosts([]);
      setHasMore(true);
    }
    setError(null);
    try {
      const { data, error } = await supabase
        .from("Memolog")
        .select(
          `
          content,
          id,
          user_id,
          created_at,
          account!inner (
            display_name,
            user_name,
            profile_picture
          )
          `
        )
        .eq("user_id", userId)
        .eq("is_public", true)
        .order("created_at", { ascending: false })
        .range(offsetRef.current, offsetRef.current + LIMIT - 1);

      if (error) throw error;

      if (data) {
        const formattedPosts: Post[] = data.map((item) => {
          const account = Array.isArray(item.account) ? item.account[0] : item.account;
          return {
            id: item.id,
            user_id: userId,
            title: account.display_name || "名無しのユーザー",
            content: item.content,
            path: `/profile/${account.user_name}`,
            created_at: item.created_at,
            timeAgo: getRelativeTimeString(item.created_at),
            icon_number: account.profile_picture,
          };
        });
        
        setPosts((prev) => reset ? formattedPosts : [...prev, ...formattedPosts]);
        offsetRef.current += data.length;
        setHasMore(data.length >= LIMIT);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "データの取得に失敗しました。");
      } else {
        setError("データの取得に失敗しました。");
      }
    } finally {
      if (reset) {
        setLoading(false);
      }
    }
  }, [userId]);

  useEffect(() => {
    if (!userId) return;
    fetchMyPosts(true);
  }, [userId, fetchMyPosts]);

  return {
    posts,
    loading,
    error,
    fetchMore: () => fetchMyPosts(false),
    hasMore,
    refresh: () => fetchMyPosts(true),
    loadingMore,
  };
};
