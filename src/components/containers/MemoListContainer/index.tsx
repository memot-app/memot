"use client";

import { useState, useEffect } from "react";
import { useFollowedPosts } from "@/hooks/post/getFollowUserPost";
import supabase from "@/utils/supabase/client";
import ReloadButton from "@/components/buttons/ReloadButton";
import { PostCard } from "@/components/cards/PostingCard";
import { useSelectedTimeDataContext } from "@/context/selectedTimeDataContext";
import { Post } from "@/constants/types";

export function MemoListContainer() {
  const [userId, setUserId] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { selectedTimeData } = useSelectedTimeDataContext();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Failed to get session:", error.message);
      } else if (session?.user?.id) {
        console.log("User ID:", session.user.id);
        setUserId(session.user.id);
      }
    };

    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session?.user?.id) {
        console.log("User Signed In:", session.user.id);
        setUserId(session.user.id);
      } else if (event === "SIGNED_OUT") {
        console.log("User Signed Out");
        setUserId(null);
      }
    });

    return () => authListener.subscription.unsubscribe();
  }, []);

  const { posts: memos, refreshNewPosts } = useFollowedPosts(userId || "");

  const filterMemosByDate = (memos: Post[]) => {
    if (selectedTimeData === "今日" || selectedTimeData === "") {
      return memos;
    }
    return memos.filter((memo) => {
      const memoDate = new Date(memo.created_at).getDate() + "日";
      return memoDate === selectedTimeData;
    });
  };

  const handleReload = async () => {
    if (!userId) {
      console.warn("User ID is null, skipping reload");
      return;
    }
    console.log("Reloading memos...");
    setIsRefreshing(true);
    await refreshNewPosts();
    setIsRefreshing(false);
  };

  const filteredMemos = filterMemosByDate(memos);

  return (
    <div className="w-full md:min-w-[640px] bg-white rounded-lg">
      <ReloadButton onReload={handleReload} isLoading={isRefreshing} />
      <div className="overflow-hidden rounded-3xl border border-gray-400">
        {filteredMemos.length === 0 ? (
          <p className="text-center p-4">投稿がありません。</p>
        ) : (
          filteredMemos.map((memo) => (
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