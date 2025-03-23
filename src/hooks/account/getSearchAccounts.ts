import { useState, useCallback } from "react";
import supabase from "@/utils/supabase/client";
import { Account } from "@/constants/types";

export const useSearchAccounts = () => {
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
      let queryBuilder = supabase
        .from("account")
        .select(
          "id, display_name, user_name, profile_picture, post_count, bio, created_at"
        )
        .limit(20);

      if (query) {
        queryBuilder = queryBuilder.or(
          `display_name.ilike.%${query}%,user_name.ilike.%${query}%`
        );
      }

      const { data, error } = await queryBuilder;
      if (error) throw new Error(error.message);

      setAccounts(data || []);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("ユーザー情報の取得に失敗しました。");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return { accounts, loading, error, searchAccounts };
};
