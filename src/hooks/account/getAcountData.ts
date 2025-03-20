"use client";

import { useState, useEffect, useCallback } from "react";
import supabase from "@/utils/supabase/client";  // ここでSupabaseクライアントをインポート
import { Account } from "@/constants/types";

export const useAccountIdData = (userId: string) => {
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAccountData = useCallback(async () => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);

    try {
      // アカウント情報の取得
      const { data, error } = await supabase
        .from("account")
        .select("id, display_name, user_name, profile_picture, post_count, bio")
        .eq("id", userId)
        .single();

      if (error || !data) {
        throw new Error("アカウント情報が見つかりません。");
      }

      // フォロー数の取得
      const { count: followCount } = await supabase
        .from("follow")
        .select("*", { count: "exact", head: true })
        .eq("follow", userId);

      // フォロワー数の取得
      const { count: followerCount } = await supabase
        .from("follow")
        .select("*", { count: "exact", head: true })
        .eq("follower", userId);

      setAccount({
        ...data,
        followCount: followCount || 0,
        followerCount: followerCount || 0,
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "データの取得に失敗しました。");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchAccountData();
  }, [fetchAccountData]);

  return { account, loading, error, fetchAccountData };
};


export const useUserNameToAccountData = (userName: string | undefined) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [loadingUserId, setLoadingUserId] = useState(true);
  const [errorUserId, setErrorUserId] = useState<string | null>(null);

  const { account, loading, error, fetchAccountData } = useAccountIdData(userId!);

  const fetchUserId = useCallback(async () => {
    if (!userName) return;

    setLoadingUserId(true);
    setErrorUserId(null);

    try {
      // userName に一致する user_id を取得
      const { data, error } = await supabase
        .from("account")
        .select("id")
        .eq("user_name", userName)
        .single();

      if (error || !data) {
        throw new Error("ユーザー名に一致するデータが見つかりません。");
      }

      // user_id をセット
      setUserId(data.id);
    } catch (err: unknown) {
      setErrorUserId(err instanceof Error ? err.message : "ユーザーIDの取得に失敗しました。");
    } finally {
      setLoadingUserId(false);
    }
  }, [userName]);

  useEffect(() => {
    fetchUserId();
  }, [userName, fetchUserId]);  // Add fetchUserId to the dependency array

  // userId が取得できたら useAccountData を実行
  useEffect(() => {
    if (userId) {
      fetchAccountData();
    }
  }, [userId, fetchAccountData]);

  return { account, loading: loadingUserId || loading, error: errorUserId || error };
};
