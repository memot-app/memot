import { useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { Account } from "@/constants/types";

export const GetSearchAccounts = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const searchAccounts = useCallback(async (query: string | null) => {

    if (!query || query.trim() === "") {
      setAccounts([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const queryBuilder = supabase
        .from("account")
        .select(
          `
        id,
        display_name,
        user_name,
        profile_picture,
        post_count,
        bio,
        created_at
        `
        )
        .limit(20);

      // クエリがある場合はフィルターを追加
      if (query) {
        queryBuilder.or(
          `display_name.ilike.%${query}%,user_name.ilike.%${query}%`
        );
      }
      const { data, error } = await queryBuilder;

      if (error) throw error;

      setAccounts(data || []);
    } catch (err: any) {
      setError(err.message || "ユーザー情報の取得に失敗しました。");
    } finally {
      setLoading(false);
    }
  }, []);

  return { accounts, loading, error, searchAccounts };
};
