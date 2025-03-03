import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Post } from "@/constants/types"; // 型をインポート

export const PostMemo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const postMemo = async (
    content: string,
    userId: string
  ): Promise<any | undefined> => {
    setLoading(true);
    setError(null);

    try {
      // Memolog テーブルに投稿を挿入し、挿入したデータをそのまま返す
      const { data, error } = await supabase
        .from("Memolog")
        .insert([
          {
            content: content,
            is_public: true,
            user_id: userId,
          },
        ])
        .select("*")
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (err: any) {
      console.error("メモ送信エラー:", err.message);
      setError(err.message || "メモ送信に失敗しました。");
      return undefined;
    } finally {
      setLoading(false);
    }
  };

  return { postMemo, loading, error };
};