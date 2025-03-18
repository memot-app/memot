"use client";

import React, { useState } from "react";
import { Post } from "@/constants/types";
import ReloadButton from "@/components/buttons/ReloadButton";
import { PostCard } from "@/components/cards/PostingCard";

// 仮データを用意
const mockMemos: Post[] = Array.from({ length: 15 }, (_, i) => ({
  id: i, // `number` 型に修正
  user_id: `user-${i + 1}`, // `user_id` を追加
  title: `仮のタイトル ${i + 1}`, // `title` を適切に設定
  content: `これは仮のメモ ${i + 1} です。`,
  path: `/user${i + 1}`, // `path` を適用
  created_at: new Date(Date.now() - i * 1000 * 60 * 5).toISOString(), // 5分間隔の過去データ
  timeAgo: "", // 一旦空で定義（後で `formatDistanceToNow` を適用）
  icon_number: i % 10, // `icon_number` に直接数値をセット
}));

export const MemoListContainer = () => {
  const [memos, setMemos] = useState<Post[]>(mockMemos);

  // リロードボタン用の仮の関数（実際にはデータを変更しない）
  const getMemos = () => {
    console.log("仮のメモデータをリロードしました。");
    setMemos([...mockMemos]); // 同じデータを再セット（実際のAPIとは異なり、変化はしない）
  };

  return (
    <div className="w-full md:min-w-[640px] bg-white rounded-lg -z-50">
      <ReloadButton onReload={getMemos} />
      <div className="overflow-hidden rounded-3xl border-2 border-gray-400">
        {memos.map((memo) => (
          <PostCard
            key={memo.id}
            title={memo.title}
            content={memo.content}
            path={memo.path}
            icon_number={memo.icon_number}
            timeAgo={memo.created_at} 
          />
        ))}
      </div>
    </div>
  );
};
