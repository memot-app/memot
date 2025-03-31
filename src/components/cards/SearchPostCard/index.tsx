"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Post } from "@/constants/types";

interface PostSearchProps {
  posts: Post[];
}

export function PostSearch({ posts }: PostSearchProps) {
  return (
    <div className="bg-white rounded-lg p-4 space-y-4">
      {posts.length === 0 ? (
        <div className="text-gray-500 text-center">該当する投稿はありません。</div>
      ) : (
        posts.map((post, index) => (
          <div key={index} className="w-full bg-white border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                {/* ユーザーアイコンと名前 */}
                <Link href={post.path} className="flex items-center space-x-2 px-4 pt-3">
                  <div className="w-10 h-10 relative rounded-full overflow-hidden">
                    <Image
                      src="/images/profileIcon/buta.png"
                      alt="icon"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="font-semibold text-gray-800">{post.title}</span>
                </Link>

                {/* 投稿内容 */}
                <div className="ml-16 mr-24 pb-4">
                  <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
                </div>
              </div>

              {/* 投稿日時 */}
              <div className="flex flex-col items-center m-5">
                <span className="text-base text-gray-500">{post.timeAgo}</span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
