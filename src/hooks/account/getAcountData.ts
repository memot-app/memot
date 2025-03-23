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



export const useAccountNameData = (userName: string) => {
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAccountData = useCallback(async () => {
    if (!userName) return;
    
    setLoading(true);
    setError(null);

    try {
      // アカウント情報の取得
      const { data, error } = await supabase
        .from("account")
        .select("id, display_name, user_name, profile_picture, post_count, bio")
        .eq("user_name", userName)
        .single();

      if (error || !data) {
        throw new Error("アカウント情報が見つかりません。");
      }

      // フォロー数の取得
      const { count: followCount } = await supabase
        .from("follow")
        .select("*", { count: "exact", head: true })
        .eq("follow", data.id);

      // フォロワー数の取得
      const { count: followerCount } = await supabase
        .from("follow")
        .select("*", { count: "exact", head: true })
        .eq("follower", data.id);

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
  }, [userName]);

  useEffect(() => {
    fetchAccountData();
  }, [fetchAccountData]);

  return { account, loading, error, fetchAccountData };
};

