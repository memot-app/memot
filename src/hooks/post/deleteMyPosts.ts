import { useState } from "react";
import supabase from "@/utils/supabase/client";

export const useDeleteMemo = (id: number, userId: string) => {
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
      const { error } = await supabase
        .from("Memolog")
        .delete()
        .eq("id", id)
        .eq("user_id", userId);

      if (error) {
        throw new Error(error.message);
      }
      return true;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("メモ削除エラー:", error.message);
        setError(error.message);
      } else {
        console.error("予期しないエラーが発生しました");
        setError("予期しないエラーが発生しました");
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deleteMemo, loading, error };
};