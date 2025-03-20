"use client";

import { useState, useEffect } from "react";
import { useFollowedPosts } from "@/hooks/post/getFollowUserPost";
import supabase from "@/utils/supabase/client";
import ReloadButton from "@/components/buttons/ReloadButton";
import { PostCard } from "@/components/cards/PostingCard";

export function MemoListContainer() {
  const [userId, setUserId] = useState<string | null>(null);
  const { posts: memos, loading, refreshNewPosts } = useFollowedPosts(userId!);
  const [isRefreshing, setIsRefreshing] = useState(false); // 名前を変更

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Failed to get session:", error.message);
      } else if (session) {
        setUserId(session.user?.id ?? null);
      }

      const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
        if (event === "SIGNED_IN") {
          setUserId(session?.user?.id ?? null);
        } else if (event === "SIGNED_OUT") {
          setUserId(null);
        }
      });

      return () => authListener.subscription.unsubscribe();
    };

    checkSession();
  }, []);

  const handleReload = async () => {
    setIsRefreshing(true);
    await refreshNewPosts();
    setIsRefreshing(false);
  };

  return (
    <div className="w-full md:min-w-[640px] bg-white rounded-lg p-4">
      {/* リロードボタン */}
      <ReloadButton onReload={handleReload} isLoading={isRefreshing} />

      {/* 投稿リスト */}
      <div className="overflow-hidden rounded-3xl border-2 border-gray-400">
        {loading ? (
          <p className="text-center p-4">読み込み中...</p>
        ) : memos.length === 0 ? (
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
