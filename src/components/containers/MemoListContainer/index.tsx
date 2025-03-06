"use client";
import React, { useState, useEffect } from "react";
import { MemoLogType } from "@/types";
import ReloadButton from "@/components/buttons/ReloadButton";
import { PostCard } from "@/components/cards/PostingCard";
import { formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";

// 仮データを用意
const mockMemos: MemoLogType[] = Array.from({ length: 15 }, (_, i) => ({
  id: `mock-${i}`,
  content: `これは仮のメモ ${i + 1} です。`,
  created_at: new Date(Date.now() - i * 1000 * 60 * 5).toISOString(), // 5分間隔で過去のデータを作成
  account: {
    display_name: `User ${i + 1}`,
    user_name: `user${i + 1}`,
    profile_picture: i % 10, // アイコン用の仮の数字
  },
}));

export const MemoListContainer = () => {
  const [memos, setMemos] = useState<MemoLogType[]>(mockMemos);

  // リロードボタン用の仮の関数（実際にはデータを変更しない）
  const getMemos = () => {
    console.log("仮のメモデータをリロードしました。");
    setMemos([...mockMemos]); // 同じデータを再セット（実際のAPIとは異なり、変化はしない）
  };

  return (
    <div className="w-fullmd:min-w-[640px] bg-white rounded-full">
      <ReloadButton onReload={getMemos} />
      <div className=" overflow-hidden rounded-3xl  border-2 border-gray-400 ">
        {memos.map((memo: MemoLogType) => (
          <PostCard
            key={memo.id}
            title={memo.account.display_name || "No Name"}
            content={memo.content}
            path={memo.account.user_name}
            icon_number={memo.account.profile_picture}
            timeAgo={formatDistanceToNow(new Date(memo.created_at), {
              addSuffix: true,
              locale: ja,
            })}
          />
        ))}
      </div>
    </div>
  );
};
