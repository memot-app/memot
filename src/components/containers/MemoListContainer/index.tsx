"use client";

import { useState, useEffect } from "react";
import { useFollowedPosts } from "@/hooks/post/getFollowUserPost";
import supabase from "@/utils/supabase/client";
import ReloadButton from "@/components/buttons/ReloadButton";
import { PostCard } from "@/components/cards/PostingCard";

export function MemoListContainer() {
  const [userId, setUserId] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // ユーザーIDを取得
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Failed to get session:", error.message);
      } else if (session?.user?.id) {
        console.log("User ID:", session.user.id); // デバッグログ
        setUserId(session.user.id);
      }
    };

    checkSession();

    // 認証状態の変更を監視
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session?.user?.id) {
        console.log("User Signed In:", session.user.id); // デバッグログ
        setUserId(session.user.id);
      } else if (event === "SIGNED_OUT") {
        console.log("User Signed Out"); // デバッグログ
        setUserId(null);
      }
    });

    return () => authListener.subscription.unsubscribe();
  }, []);

  // ユーザーIDが取得できるまで待つ
  const { posts: memos, refreshNewPosts } = useFollowedPosts(userId || "");

  // リロード処理
  const handleReload = async () => {
    if (!userId) {
      console.warn("User ID is null, skipping reload");
      return;
    }
    console.log("Reloading memos..."); // デバッグログ
    setIsRefreshing(true);
    await refreshNewPosts();
    setIsRefreshing(false);
  };

  return (
    <div className="w-full md:min-w-[640px] bg-white rounded-lg">
      {/* リロードボタン */}
      <ReloadButton onReload={handleReload} isLoading={isRefreshing} />

      {/* 投稿リスト */}
      <div className="overflow-hidden rounded-3xl border border-gray-400">
        {memos.length === 0 ? (
          <p className="text-center p-4">投稿がありません。</p>
        ) : (
          memos.map((memo) => (
            <PostCard
              key={memo.id}
              title={memo.title}
              content={memo.content}
              path={memo.path}
              icon_number={memo.icon_number}
              timeAgo={memo.created_at}
            />
          ))
        )}
      </div>
    </div>
  );
}
