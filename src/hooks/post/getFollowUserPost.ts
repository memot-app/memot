import { useState, useEffect, useCallback } from "react";
import { Post } from "@/constants/types";

export const useFollowedPosts = (userId: string | undefined) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/post/followed-posts?userId=${userId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "投稿の取得に失敗しました");
      }

      setPosts(data.posts as Post[]); // 型変換せずそのままセット
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "不明なエラーが発生しました");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { posts, loading, error, refresh: fetchPosts };
};
