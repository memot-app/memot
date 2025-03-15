import { useState } from "react";
import supabase from "@/utils/supabase/client";

export const usePostMemo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const postMemo = async (content: string, userId: string) => {
    setLoading(true);
    setError(null);

    try {
      // 認証トークンの取得
      const { data: session } = await supabase.auth.getSession();
      const token = session?.session?.access_token;
      if (!token) {
        throw new Error("認証トークンが取得できませんでした");
      }

      const res = await fetch("/api/post/post-memo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ content, userId }),
      });

      if (!res.ok) {
        throw new Error("メモの投稿に失敗しました");
      }

      const data = await res.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message || "メモ送信に失敗しました。");
      } else {
        setError("メモ送信に失敗しました。");
      }
      return undefined;
    } finally {
      setLoading(false);
    }
  };

  return { postMemo, loading, error };
};
