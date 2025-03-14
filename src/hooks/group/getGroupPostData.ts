import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { Post } from "@/constants/types";
import { getRelativeTimeString } from "@/hooks/timeUtils";
import { getUser } from "@/context/userProvider";

export const useGetGroupPosts = (groupId: string, userId: string | undefined) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(true);
  const offsetRef = useRef(0);
  const LIMIT = 100;
  const { user } = getUser();

  // グループ情報とメンバー情報を取得して、対象ユーザーIDの配列を作成
  const getGroupUserIds = useCallback(async () => {
    if (!userId) throw new Error("ログインしていません。");
    if (!groupId) throw new Error("グループ ID がありません");

    // グループ情報取得
    const { data: groupData, error: groupError } = await supabase
      .from("group")
      .select("*, show_my_posts")
      .eq("host_user_id", userId)
      .eq("group_id", groupId)
      .single();
    if (groupError || !groupData) {
      throw new Error("グループが見つかりません。");
    }
    const showMyPosts = groupData.show_my_posts;

    // グループメンバー取得
    const { data: membersData, error: memberError } = await supabase
      .from("group_member")
      .select("user_id")
      .eq("group_id", groupId);
    if (memberError) throw memberError;

    let userIds = membersData.map((m: any) => m.user_id);
    if (showMyPosts) {
      userIds.push(userId);
    }
    return userIds;
  }, [groupId, userId]);

  // fetchGroupPosts: ページネーション対応で投稿を取得（reset=true なら初回読み込み）
  const fetchGroupPosts = useCallback(
    async (reset: boolean = false) => {
      if (!userId || !groupId) return;
      setError(null);
      try {
        const userIds = await getGroupUserIds();
        const currentOffset = reset ? 0 : offsetRef.current;
        const { data, error } = await supabase
          .from("Memolog")
          .select(
            `
              content,
              id,
              user_id,
              created_at,
              account!inner (
                display_name,
                user_name,
                profile_picture
              ),
              likes (id,user_id)
            `
          )
          .in("user_id", userIds)
          .order("created_at", { ascending: false })
          .range(currentOffset, currentOffset + LIMIT - 1);

        if (error) throw error;
        if (data) {
          const formattedPosts: Post[] = data.map((item: any) => {
            const account = Array.isArray(item.account)
              ? item.account[0]
              : item.account;
            const likesUsers = item.likes ? item.likes.map((like: any) => like.user_id) : [];
            return {
              id: item.id,
              user_id: item.user_id,
              title: account.display_name || "名無しのユーザー",
              content: item.content,
              path: `/${item.user_id}`,
              created_at: item.created_at,
              timeAgo: getRelativeTimeString(item.created_at),
              icon_number: account.profile_picture,
              likes_count: item.likes?.length || 0,
              likes_users: likesUsers,
              is_liked: likesUsers.includes(user?.id),
            };
          });
          if (reset) {
            setPosts(formattedPosts);
          } else {
            setPosts((prev) => [
              ...prev,
              ...formattedPosts.filter((post) => !prev.some((p) => p.id === post.id)),
            ]);
          }
          offsetRef.current = currentOffset + (data?.length || 0);
          setHasMore((data?.length || 0) >= LIMIT);
        }
      } catch (err: any) {
        setError(err.message || "データの取得に失敗しました。");
      }
    },
    [groupId, userId, getGroupUserIds, user?.id]
  );

  // refreshNewPosts: サーバーから最新の投稿を全件取得してマージする
  const refreshNewPosts = useCallback(async () => {
    if (!userId || !groupId) return;
    setError(null);
    try {
      const userIds = await getGroupUserIds();
      const { data, error } = await supabase
        .from("Memolog")
        .select(
          `
            content,
            id,
            user_id,
            created_at,
            account!inner (
              display_name,
              user_name,
              profile_picture
            ),
            likes (id,user_id)
          `
        )
        .in("user_id", userIds)
        .order("created_at", { ascending: false })
        .range(0, LIMIT - 1);

      if (error) throw error;
      if (data) {
        const formattedPosts: Post[] = data.map((item: any) => {
          const account = Array.isArray(item.account)
            ? item.account[0]
            : item.account;
          const likesUsers = item.likes ? item.likes.map((like: any) => like.user_id) : [];
          return {
            id: item.id,
            user_id: item.user_id,
            title: account.display_name || "名無しのユーザー",
            content: item.content,
            path: `/${item.user_id}`,
            created_at: item.created_at,
            timeAgo: getRelativeTimeString(item.created_at),
            icon_number: account.profile_picture,
            likes_count: item.likes?.length || 0,
            likes_users: likesUsers,
            is_liked: likesUsers.includes(user?.id),
          };
        });
        // マージ処理：既存投稿は更新し、存在しない投稿は除去、新規投稿は先頭に追加
        setPosts(formattedPosts);
        offsetRef.current = data.length;
        setHasMore(data.length >= LIMIT);
      }
    } catch (err: any) {
      setError(err.message || "データの取得に失敗しました。");
    }
  }, [groupId, userId, getGroupUserIds, user?.id]);

  // loadMore: さらに投稿を読み込む
  const loadMore = useCallback(async () => {
    if (!hasMore) return;
    try {
      setLoadingMore(true);
      await fetchGroupPosts(false);
    } finally {
      setLoadingMore(false);
    }
  }, [hasMore, fetchGroupPosts]);

  // 初回読み込み
  useEffect(() => {
    if (userId && groupId) {
      const loadInitialPosts = async () => {
        setLoading(true);
        try {
          await fetchGroupPosts(true);
        } finally {
          setLoading(false);
        }
      };
      loadInitialPosts();
    }
  }, [userId, groupId, fetchGroupPosts]);

  return {
    posts,
    loading,
    loadingMore,
    error,
    fetchGroupPosts,
    refreshNewPosts,
    loadMore,
    hasMore,
  };
};