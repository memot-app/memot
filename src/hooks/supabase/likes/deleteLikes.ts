import { useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { getUser } from "@/context/userProvider";

export const useDeleteLike = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = getUser();

  const deleteLike = useCallback(
    async (mome_id: number) => {
      if (!user?.id) {
        setError("ユーザー情報の取得に失敗しました。");
        return null;
      }

      setLoading(true);
      setError(null);

      try {
        // 既存の「いいね」をチェック
        const { data: existingLike, error: selectError } = await supabase
          .from("likes")
          .select("id")
          .eq("monologue_id", mome_id)
          .eq("user_id", user.id)
          .single();

        if (selectError && selectError.code !== "PGRST116") {
          throw selectError;
        }

        // すでに「いいね」が存在しない場合は何もしない
        if (!existingLike) {
          return null;
        }

        // 「いいね」を削除
        const { error: deleteError } = await supabase
          .from("likes")
          .delete()
          .eq("monologue_id", mome_id)
          .eq("user_id", user.id);

        if (deleteError) throw deleteError;

        return true;
      } catch (err: any) {
        setError("いいねの削除に失敗しました。");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [user?.id]
  );

  return { deleteLike, loading, error };
};
