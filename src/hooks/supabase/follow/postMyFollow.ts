import { useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useCheckFollowExistence } from "./getCheckMyFollow";

export const useAddFollow = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { checkFollowExistence } = useCheckFollowExistence();

  const addFollow = useCallback(
    async (myId: string, partnerId: string) => {
      if (!myId || !partnerId) {
        setError("ユーザーIDが無効です。");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // **既存のフォローデータがあるか確認**
        const alreadyFollowing = await checkFollowExistence(myId, partnerId);
        if (alreadyFollowing) {
          return;
        }

        // **フォローデータを追加**
        const { error: insertError } = await supabase.from("follow").insert([
          {
            follow: myId,
            follower: partnerId,
          },
        ]);

        if (insertError) throw insertError;

      } catch (err: any) {
        setError(err.message || "フォローデータの追加に失敗しました。");
      } finally {
        setLoading(false);
      }
    },
    [checkFollowExistence]
  );

  return { addFollow, loading, error };
};
