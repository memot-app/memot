"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Account } from "@/constants/types";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface UserSearchProps {
  accounts: Account[];
}

export function UserSearch({ accounts }: UserSearchProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [visibleItems, setVisibleItems] = useState(1);
  const [scrollIndex, setScrollIndex] = useState(0);

  useEffect(() => {
    if (scrollRef.current) {
      const containerWidth = scrollRef.current.clientWidth;
      const itemWidth = 100 + 16; // item width + margin
      setVisibleItems(Math.floor(containerWidth / itemWidth));
    }
  }, [accounts]);

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const newIndex = direction === "left" ? Math.max(scrollIndex - (visibleItems - 1), 0) : Math.min(scrollIndex + (visibleItems - 1), accounts.length - visibleItems);
    setScrollIndex(newIndex);
  };

  return (
    <div className="bg-white rounded-lg p-5 relative">
      <p className="text-gray-800 text-xl font-bold">ユーザー</p>
      {accounts.length === 0 ? (
        <div className="h-32 flex items-center justify-center">
          <div className="text-gray-500 text-center">該当するユーザーはいません。</div>
        </div>
      ) : (
        <div className="relative flex items-center">
          {scrollIndex > 0 && (
            <button
              onClick={() => handleScroll("left")}
              className="absolute left-[-40px] z-10 bg-white p-2 rounded-full shadow-md"
            >
              <ChevronLeft size={24} />
            </button>
          )}
          <div className="flex space-x-4 overflow-hidden w-full justify-start pl-10 pr-10" ref={scrollRef}>
            {accounts.slice(scrollIndex, scrollIndex + visibleItems).map((user, index) => (
              <div key={index} className="flex flex-col items-center min-w-[100px] p-2 h-32">
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
                <span className="font-bold text-gray-800 mt-2 text-ellipsis overflow-hidden whitespace-nowrap max-w-[4rem]">
                  {user.display_name}
                </span>
                <span className="text-sm text-gray-500 text-ellipsis overflow-hidden whitespace-nowrap max-w-[4rem]">
                  {user.user_name}
                </span>
              </div>
            ))}
          </div>
          {scrollIndex + visibleItems < accounts.length && (
            <button
              onClick={() => handleScroll("right")}
              className="absolute right-[-40px] z-10 bg-white p-2 rounded-full shadow-md"
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}