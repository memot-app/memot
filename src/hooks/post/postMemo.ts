"use client";

import { useState } from "react";
import supabase from "@/utils/supabase/client"; // クライアント側のsupabaseインスタンスを使用

export const usePostMemo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const postMemo = async (content: string) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from("Memolog")
        .insert([{ content}])
        .select("*")
        .single();

      if (error) throw error;

      return data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("メモ送信エラー:", err.message);
        setError(err.message || "メモ送信に失敗しました。");
      } else {
        console.error("メモ送信エラー:", err);
        setError("メモ送信に失敗しました。");
      }
      return undefined;
    } finally {
      setLoading(false);
    }
  };

  return { postMemo, loading, error };
};
