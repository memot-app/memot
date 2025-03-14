import { useState, useEffect } from "react";
import { Account } from "@/constants/types";

// API レスポンスの型を定義
interface AccountResponse extends Account {
  error?: string;
}

/**
 * 指定したユーザーIDのアカウント情報を取得するカスタムフック
 */
export const useAccountData = (userId: string | undefined) => {
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setError("ユーザーIDが必要です");
      setLoading(false);
      return;
    }

    const fetchAccountData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/account/${userId}`);
        const data: AccountResponse = await response.json();

        if (!response.ok) {
          throw new Error(data.error ?? "データの取得に失敗しました");
        }

        setAccount({
          id: data.id,
          display_name: data.display_name,
          user_name: data.user_name,
          profile_picture: data.profile_picture,
          post_count: data.post_count,
          bio: data.bio,
          followCount: data.followCount ?? 0,
          followerCount: data.followerCount ?? 0,
        });
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("不明なエラーが発生しました");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAccountData();
  }, [userId]);

  return { account, loading, error };
};
