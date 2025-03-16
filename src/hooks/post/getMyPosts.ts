import { useState, useEffect, useCallback } from "react";
import { Post } from "@/constants/types";

export const useMyPosts = (userId: string | undefined) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/post/getMyPost/${userId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "データ取得に失敗しました");
      }

      setPosts(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { posts, loading, error, refresh: fetchPosts };
};
