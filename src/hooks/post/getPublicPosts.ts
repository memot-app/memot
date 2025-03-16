import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { PostgrestError } from "@supabase/supabase-js";
import { getRelativeTimeString } from "@/hooks/timeUtils";

// 投稿データの型をインターフェースとして定義
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
  account: Account | Account[]; // ネストされた account
}

interface PublicPost {
  id: number;
  user_id: string;
  title: string;
  content: string;
  path: string;
  created_at: string;
  timeAgo: string;
  icon_number: number;
}

export const GetPublicPosts = () => {
  const [posts, setPosts] = useState<PublicPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<PostgrestError | null>(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
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
        .eq("is_public", true)
        .order("created_at", { ascending: false });

      if (error) {
        setError(error);
        console.error("Error fetching posts:", error);
      } else if (data) {
        const formattedPosts: PublicPost[] = data.map((item: Memolog) => {
          const account = Array.isArray(item.account)
            ? item.account[0]
            : item.account; // 配列の場合に対応
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
      }
    } catch (error) {
      setError(error as PostgrestError);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { posts, setPosts, loading, error, fetchPosts };
};
