"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Account } from "@/constants/types";

interface UserSearchProps {
  accounts: Account[];
}

export function UserSearch({ accounts }: UserSearchProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const smoothScroll = (delta: number) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: delta, behavior: "smooth" });
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    smoothScroll(e.deltaY);
  };

  return (
    <div className="bg-white rounded-lg p-3">
      <div className="text-2xl mb-2">ユーザー</div>
      {accounts.length === 0 ? (
        <div className="text-gray-500 text-center">該当するユーザーはいません。</div>
      ) : (
        <div
          ref={scrollRef}
          onWheel={handleWheel}
          className="flex space-x-4 overflow-x-auto whitespace-nowrap scrollbar-none"
        >
          {accounts.map((user, index) => (
            <div key={index} className="flex flex-col items-center min-w-[100px] p-2">
              <Link href={`/profile/${user.user_name}`}>
                <div className="w-16 h-16 relative rounded-full overflow-hidden">
                  <Image
                    src="/images/profileIcon/buta.png"
                    alt={`${user.display_name}のアイコン`}
                    fill
                    className="object-cover"
                  />
                </div>
              </Link>
              <span className="font-bold text-gray-800 mt-2 text-ellipsis overflow-hidden whitespace-nowrap max-w-[calc(4rem)]">
                {user.display_name}
              </span>
              <span className="text-sm text-gray-500 text-ellipsis overflow-hidden whitespace-nowrap max-w-[calc(4rem)]">
                {user.user_name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
