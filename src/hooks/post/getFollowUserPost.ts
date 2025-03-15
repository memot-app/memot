import { useState, useEffect, useCallback } from "react";
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
  account: Account;
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
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPosts = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/followed-posts?userId=${userId}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "投稿の取得に失敗しました");
      }

      const formattedPosts: PublicPost[] = result.posts.map((item: Memolog) => ({
        id: item.id,
        user_id: item.user_id,
        title: item.account.display_name,
        content: item.content,
        path: `/profile/${item.user_id}`,
        created_at: item.created_at,
        timeAgo: getRelativeTimeString(item.created_at),
        icon_number: item.account.profile_picture,
      }));

      setPosts(formattedPosts);
    } catch (err) {
      setError(err instanceof Error ? err.message : "不明なエラーが発生しました");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { posts, loading, error, refetch: fetchPosts };
};
