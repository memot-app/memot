"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import supabase from "@/utils/supabase/client";
import { PostgrestError } from "@supabase/supabase-js";
import { getRelativeTimeString } from "@/hooks/timeUtils";

// 投稿データの型定義
interface Account {
  display_name: string;
  user_name: string;
  profile_picture: number;
}

interface Memolog {
  user_id: string;
  content: string;
  id: number;
  created_at: string;
  account: Account | Account[];
}

export interface PublicPost {
  id: number;
  user_id: string;
  title: string;
  content: string;
  path: string;
  created_at: string;
  timeAgo: string;
  icon_number: number;
}

export const useFollowedPosts = (userId: string | "") => {
  const [posts, setPosts] = useState<PublicPost[]>([]);
  const [error, setError] = useState<PostgrestError | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const offsetRef = useRef(0);
  const LIMIT = 100;

  const getFollowedIds = useCallback(async () => {
    if (!userId) return [];
    const { data: followsData, error: followsError } = await supabase
      .from("follow")
      .select("follower, follow")
      .eq("follow", userId);
    
    if (followsError) throw followsError;

    const followedIds = followsData?.map((item) => item.follower) || [];
    followedIds.push(userId); // 自分の投稿も含める
    return followedIds;
  }, [userId]);

  const fetchPosts = useCallback(
    async (reset = false) => {
      if (!userId) return;
      setError(null);
      try {
        const followedIds = await getFollowedIds();
        const currentOffset = reset ? 0 : offsetRef.current;
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
          .in("user_id", followedIds)
          .eq("is_public", true)
          .order("created_at", { ascending: false })
          .range(currentOffset, currentOffset + LIMIT - 1);

        if (error) throw error;

        const formattedPosts: PublicPost[] = data.map((item: Memolog) => {
          const account = Array.isArray(item.account) ? item.account[0] : item.account;
          return {
            id: item.id,
            user_id: item.user_id,
            title: account.display_name,
            content: item.content,
            path: `/profile/${account.user_name}`,
            created_at: item.created_at,
            timeAgo: getRelativeTimeString(item.created_at),
            icon_number: account.profile_picture,
          };
        });

        if (reset) {
          setPosts(formattedPosts);
        } else {
          setPosts((prev) => [
            ...prev,
            ...formattedPosts.filter((post) => !prev.some((p) => p.id === post.id)),
          ]);
        }

        offsetRef.current = currentOffset + (data.length || 0);
        setHasMore(data.length >= LIMIT);
      } catch (err) {
        setError(err as PostgrestError);
      }
    },
    [userId, getFollowedIds]
  );

  const refreshNewPosts = useCallback(async () => {
    await fetchPosts(true);
  }, [fetchPosts]);

  const loadMore = useCallback(async () => {
    if (!hasMore) return;
    setLoadingMore(true);
    try {
      await fetchPosts(false);
    } finally {
      setLoadingMore(false);
    }
  }, [hasMore, fetchPosts]);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    fetchPosts(true).finally(() => setLoading(false));
  }, [userId, fetchPosts]);

  return { posts, loading, loadingMore, error, loadMore, refreshNewPosts, hasMore };
};
