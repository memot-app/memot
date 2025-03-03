import { useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useCheckFollowExistence } from "./getCheckMyFollow";

export const useDeleteMyFollow = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { checkFollowExistence } = useCheckFollowExistence();

  const deleteMyFollow = useCallback(
    async (myId: string, partnerId: string): Promise<boolean> => {
      if (!myId || !partnerId) {
        setError("ユーザーIDが無効です");
        return false;
      }

      setLoading(true);
      setError(null);

      try {
        // **フォローデータが存在するか確認**
        const followExists = await checkFollowExistence(myId, partnerId);
        if (!followExists) {
          return false;
        }

        // **フォロー関係が存在する場合に削除**
        const { error } = await supabase
          .from("follow")
          .delete()
          .eq("follow", myId)
          .eq("follower", partnerId);

        if (error) throw error;

        return true;
      } catch (err: any) {
        setError(err.message || "フォロー解除に失敗しました");
        return false;
      } finally {
        setLoading(false);
      }
    },
    [checkFollowExistence]
  );

  return { deleteMyFollow, loading, error };
};
