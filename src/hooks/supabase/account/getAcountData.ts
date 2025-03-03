import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { Account } from "@/constants/types";

export const GetAccountData = (userId: string | undefined) => {
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAccountData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // まず account テーブルから基本情報を取得
      const { data } = await supabase
        .from("account")
        .select("id,display_name,user_name,profile_picture,post_count,bio")
        .eq("id", userId);

      if (data && data.length > 0) {
        // フォロー数の取得（このユーザーがフォローしている数）
        const { count: followCount } = await supabase
          .from("follow")
          .select("*", { count: "exact", head: true })
          .eq("follow", userId);

        // フォロワー数の取得（このユーザーをフォローしている数）
        const { count: followerCount } = await supabase
          .from("follow")
          .select("*", { count: "exact", head: true })
          .eq("follower", userId);

        const extendedAccount: Account = {
          ...data[0],
          followCount: followCount || 0,
          followerCount: followerCount || 0,
        };

        setAccount(extendedAccount);
      } else {
        setError("アカウント情報が見つかりません。");
      }
    } catch (err: any) {
      setError(err.message || "アカウント情報の取得に失敗しました。");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchAccountData();
  }, [fetchAccountData]);

  return { account, loading, error, fetchAccountData };
};