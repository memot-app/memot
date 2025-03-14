import { useState } from "react";
import { supabase } from "@/lib/supabase";

export const useDeleteMemo = (id: number, userId: string) => {
  // userIdを引数として受け取る
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteMemo = async (): Promise<boolean> => {
    if (!userId) {
      setError("ユーザーIDが無効です");
      console.error("メモ削除エラー: ユーザーIDが無効です");
      return false;
    }
    setLoading(true);
    setError(null);

    try {
      // 渡されたuserIdとメモのuser_idが一致するか確認して削除
      const { error } = await supabase
        .from("Memolog")
        .delete()
        .eq("id", id)
        .eq("user_id", userId); // 引数のuserIdとuser_idが一致する場合のみ削除

      if (error) {
        throw error;
      }
      return true;
    } catch (error: any) {
      console.error("メモ削除エラー:", error.message);
      setError(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deleteMemo, loading, error };
};
