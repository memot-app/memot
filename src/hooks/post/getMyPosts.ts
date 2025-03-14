import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { getRelativeTimeString } from "@/hooks/timeUtils";
import { Post } from "@/constants/types";
import { getUser } from "@/context/userProvider";

export const GetMyPosts = (userId: string | undefined) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const offsetRef = useRef(0);
  const LIMIT = 100;
  const { user } = getUser();

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
            path: `/profile/${item.user_id}`,
            created_at: item.created_at,
            timeAgo: getRelativeTimeString(item.created_at),
            icon_number: account.profile_picture,
          };
        });
        if (reset) {
          setPosts(formattedPosts);
        } else {
          // 既存投稿のうち、更新があれば更新し、新規投稿は追加
          setPosts((prev) => [
            ...prev,
            ...formattedPosts.filter((post) => !prev.some((p) => p.id === post.id)),
          ]);
        }
        offsetRef.current += data.length;
        setHasMore(data.length >= LIMIT);
      }
    } catch (err: any) {
      setError(err.message || "データの取得に失敗しました。");
    } finally {
      if (reset) {
        setLoading(false);
      }
    }
  }, [userId, user?.id]);

  // refreshNewPosts：全件取得して state を完全に置き換える（削除・更新も反映）
  const refreshNewPosts = useCallback(async () => {
    if (!userId) return;
    setError(null);
    try {
      const { data, error } = await supabase
        .from("Memolog")
        .select(
          `
          content,
          id,
          created_at,
          user_id,
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
        .range(0, LIMIT - 1);

      if (error) throw error;
      if (data) {
        const formattedPosts: Post[] = data.map((item) => {
          const account = Array.isArray(item.account) ? item.account[0] : item.account;
          return {
            id: item.id,
            user_id: userId,
            title: account.display_name || "名無しのユーザー",
            content: item.content,
            path: `/profile/${item.user_id}`,
            created_at: item.created_at,
            timeAgo: getRelativeTimeString(item.created_at),
            icon_number: account.profile_picture,
          };
        });
        setPosts(formattedPosts);
        offsetRef.current = data.length;
        setHasMore(data.length >= LIMIT);
      }
    } catch (err: any) {
      setError(err.message || "データの取得に失敗しました。");
    }
  }, [userId, user?.id]);

  const loadMore = useCallback(async () => {
    if (!hasMore) return;
    try {
      setLoadingMore(true);
      await fetchMyPosts(false);
    } finally {
      setLoadingMore(false);
    }
  }, [hasMore, fetchMyPosts]);

  useEffect(() => {
    if (!userId) return;
    const loadInitialPosts = async () => {
      setLoading(true);
      try {
       await fetchMyPosts(true);
      } finally {
        setLoading(false);
      }
    }
    loadInitialPosts();
  }, [userId, fetchMyPosts]);

  return {
    posts,
    loading,
    error,
    loadMore,
    hasMore,
    refreshNewPosts,
    loadingMore,
  };
};