import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/lib/supabase";
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

export const GetFollowedPosts = (userId: string | "") => {
  const [posts, setPosts] = useState<PublicPost[]>([]);
  const [error, setError] = useState<PostgrestError | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(true);
  const offsetRef = useRef(0);
  const LIMIT = 100;

  const getFollowedIds = useCallback(async () => {
    const { data: followsData, error: followsError } = await supabase
      .from("follow")
      .select("follow")
      .eq("follower", userId);
    if (followsError) {
      throw followsError;
    }
    let followedIds: string[] = [];
    if (!followsData || followsData.length === 0) {
      followedIds = [userId];
    } else {
      followedIds = followsData.map((item: any) => item.follow);
      followedIds.push(userId);
    }
    return followedIds;
  }, [userId]);

  // 一旦全件置き換えて最新の投稿を取得
  const refreshNewPosts = useCallback(async () => {
    if (!userId) return;
    setError(null);
    try {
      const followedIds = await getFollowedIds();
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
        .range(0, LIMIT - 1);
  
      if (error) {
        setError(error);
        return;
      }
  
      if (data) {
        const formattedPosts: PublicPost[] = data.map((item: Memolog) => {
          const account = Array.isArray(item.account)
            ? item.account[0]
            : item.account;
          return {
            id: item.id,
            user_id: item.user_id,
            title: account.display_name,
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
    } catch (err) {
      setError(err as PostgrestError);
    }
  }, [userId, getFollowedIds]);

  const fetchPosts = useCallback(
    async (reset: boolean = false) => {
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
        if (error) {
          setError(error);
          return;
        }
        if (data) {
          const formattedPosts: PublicPost[] = data.map((item: Memolog) => {
            const account = Array.isArray(item.account)
              ? item.account[0]
              : item.account;
            return {
              id: item.id,
              user_id: item.user_id,
              title: account.display_name,
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
            setPosts((prev) => [
              ...prev,
              ...formattedPosts.filter((post) => !prev.some((p) => p.id === post.id)),
            ]);
          }
          offsetRef.current = currentOffset + (data?.length || 0);
          if ((data?.length || 0) < LIMIT) {
            setHasMore(false);
          } else {
            setHasMore(true);
          }
        }
      } catch (err) {
        setError(err as PostgrestError);
      } 
    },
    [userId, getFollowedIds]
  );

  // さらに読み込む
  const loadMore = useCallback(async () => {
    if (!hasMore) return;
    try {
      setLoadingMore(true);
      await fetchPosts(false);
    } finally {
      setLoadingMore(false);
    }
  }, [hasMore, fetchPosts]);

  // ここで初回読み込みを実行
  useEffect(() => {
    if (!userId) return;
    const loadInitialPosts = async () => {
      setLoading(true);
      try {
        await fetchPosts(true);
      }  finally {
        setLoading(false);
      }
    };
    loadInitialPosts();
  }, [userId, fetchPosts]);

  return { posts, loading, loadingMore, error, loadMore, refreshNewPosts, hasMore };
};