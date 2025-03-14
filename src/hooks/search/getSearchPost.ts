import { useState, useCallback, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { getRelativeTimeString } from "@/hooks/timeUtils";
import { Post } from "@/constants/types";
import { getUser } from "@/context/userProvider";

export const useSearchPosts = () => {
  const [searchResults, setSearchResults] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false); 
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [searchText, setSearchText] = useState("");
  const offsetRef = useRef(0);
  const LIMIT = 100;
  const { user } = getUser();

  // 検索結果を取得する関数
  const fetchSearchPosts = useCallback(
    async (reset: boolean = false, queryText?: string) => {
      const effectiveQuery = queryText !== undefined ? queryText : searchText;
      if (!effectiveQuery) {
        setSearchResults([]);
        return;
      }
      if (reset) {
        setLoading(true);
        offsetRef.current = 0;
        setSearchResults([]);
        setHasMore(true);
      }
      setError(null);
      try {
        const { data, error } = await supabase
          .from("Memolog")
          .select(
            `
            content,
            id,
            created_at,
            user_id,
            account!inner (
              display_name,
              user_name,
              profile_picture
            )
            `
          )
          .like("content", `%${effectiveQuery}%`)
          .order("created_at", { ascending: false })
          .range(offsetRef.current, offsetRef.current + LIMIT - 1);

        if (error) throw error;
        if (data) {
          const formattedResults: Post[] = data.map((item) => {
            const account = Array.isArray(item.account)
              ? item.account[0]
              : item.account;
            return {
              id: item.id,
              user_id: item.user_id,
              title: account.display_name,
              content: item.content,
              path: `/profile/${item.user_id}`,
              created_at: item.created_at,
              timeAgo: getRelativeTimeString(item.created_at),
              icon_number: account.profile_picture,
            };
          });
          if (reset) {
            setSearchResults(formattedResults);
          } else {
            // 既存投稿のうち、更新があれば更新し、新規投稿は追加
            setSearchResults((prev) => [
              ...prev,
              ...formattedResults.filter(
                (post) => !prev.some((p) => p.id === post.id)
              ),
            ]);
          }
          offsetRef.current += data.length;
          setHasMore(data.length >= LIMIT);
        }
      } catch (err: any) {
        setError(err.message || "データの取得に失敗しました。");
      } finally {
        if (reset) {
          setLoading(false);
        }
      }
    },
    [searchText, user?.id]
  );

  const refreshNewPosts = useCallback(async () => {
    if (!searchText) return;
    setError(null);
    try {
      const { data, error } = await supabase
        .from("Memolog")
        .select(
          `
          content,
          id,
          created_at,
          user_id,
          account!inner (
            display_name,
            user_name,
            profile_picture
          )
          `
        )
        .like("content", `%${searchText}%`)
        .order("created_at", { ascending: false })
        .range(0, LIMIT - 1);

      if (error) throw error;
      if (data) {
        const formattedResults: Post[] = data.map((item) => {
          const account = Array.isArray(item.account)
            ? item.account[0]
            : item.account;
          return {
            id: item.id,
            user_id: item.user_id,
            title: account.display_name,
            content: item.content,
            path: `/profile/${item.user_id}`,
            created_at: item.created_at,
            timeAgo: getRelativeTimeString(item.created_at),
            icon_number: account.profile_picture,
          };
        });
        setSearchResults(formattedResults);
        offsetRef.current = data.length;
        setHasMore(data.length >= LIMIT);
      }
    } catch (err: any) {
      setError(err.message || "データの取得に失敗しました。");
    }
  }, [searchText, user?.id]);

  // 外部から検索文字列をセットし、初回取得を行うための関数
  const search = useCallback(
    (text: string) => {
      setSearchText(text);
      fetchSearchPosts(true);
    },
    [fetchSearchPosts]
  );

  // 追加取得用の関数
  const loadMore = useCallback(async () => {
    if (!hasMore) return;
    try {
      setLoadingMore(true);
      await fetchSearchPosts(false);
    } finally {
      setLoadingMore(false);
    }
  }, [hasMore, fetchSearchPosts]);

  return {
    searchResults,
    loading,
    error,
    hasMore,
    fetchSearchPosts,
    refreshNewPosts,
    loadMore,
    search,
    searchText,
    loadingMore,
    setSearchText,
  };
};