import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { Follow } from "@/constants/types";

export const useMutualFollow = () => {
  const [mutualFollow, setMutualFollow] = useState<Follow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMutualFollow = useCallback(async (userId: string | undefined) => {
    if (!userId) {
      setError("ログインしていません。");
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
            id,
            follow,
            follower,
            created_at,
            follow_account:account!follower (
                id,
                user_name,
                profile_picture,
                display_name
            )
        `
        )
        .or(`(follow.eq.${userId},follower.eq.${userId})`)
        .order("created_at", { ascending: false });

      if (error) throw error;

      // 相互フォロー判定
      const followSet = new Set(
        data.map((item) => `${item.follow}:${item.follower}`)
      );
      const mutualFollowData = data.filter((item) =>
        followSet.has(`${item.follower}:${item.follow}`)
      );

      const formattedFollows: Follow[] = (mutualFollowData || []).map(
        (item) => {
          const account = Array.isArray(item.follow_account)
            ? item.follow_account[0]
            : item.follow_account;

          return {
            id: item.id,
            follow: item.follow,
            follower: item.follower,
            display_name: account?.display_name || "名無しのユーザー",
            user_id: account?.id,
            user_name: account?.user_name,
            created_at: item.created_at,
            icon_number: account?.profile_picture,
          };
        }
      );

      setMutualFollow(formattedFollows);
    } catch (err: any) {
      setError(err.message || "データの取得に失敗しました。");
    } finally {
      setLoading(false);
    }
  }, []);

  return { mutualFollow, loading, error, fetchMutualFollow };
};
