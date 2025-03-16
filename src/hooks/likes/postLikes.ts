import { useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { getUser } from "@/context/userProvider";

export const useAddLike = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = getUser();

  const addLike = useCallback(
    async (mome_id: number) => {
      if (!user?.id) {
        setError("ユーザー情報の取得に失敗しました。");
        return null;
      }

      setLoading(true);
      setError(null);

      try {
        // 既存の「いいね」をチェック
        const { data: existingLikes, error: selectError } = await supabase
          .from("likes")
          .select("id")
          .eq("monologue_id", mome_id)
          .eq("user_id", user.id)
          .maybeSingle(); // 0件でもエラーにならない

        if (selectError && selectError.code !== "PGRST116") {
          throw selectError;
        }

        // すでに存在する場合は何もしない
        if (existingLikes) {
          return null;
        }

        // 新しい「いいね」を追加
        const { data, error: insertError } = await supabase
          .from("likes")
          .insert([
            {
              monologue_id: mome_id,
              user_id: user.id,
            },
          ]);

        if (insertError) throw insertError;

        return data;
      } catch (err: any) {
        setError("いいねの追加に失敗しました。");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [user?.id]
  );

  return { addLike, loading, error };
};
