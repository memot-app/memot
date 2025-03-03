import { useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";

export const useCheckFollowExistence = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkFollowExistence = useCallback(
    async (follow: string, follower: string) => {
      if (!follow || !follower) {
        setError("無効なIDが指定されています。");
        return false;
      }

      setLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from("follow")
          .select("id") // idだけ取得することで、データ量を最小化
          .eq("follow", follow)
          .eq("follower", follower);

        if (error) throw error;

        // データがあればtrueを返す
        return data?.length > 0;
      } catch (err: any) {
        setError(err.message || "フォロー関係の確認に失敗しました。");
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { checkFollowExistence, loading, error };
};
