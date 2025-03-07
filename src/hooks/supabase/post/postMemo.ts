import { useState } from "react";

export const usePostMemo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const postMemo = async (content: string, userId: string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/app/api/post/postMemo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content, userId }),
      });

      if (!res.ok) {
        throw new Error("メモの投稿に失敗しました");
      }

      const data = await res.json();
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
