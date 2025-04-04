"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function LpPage() {
  return (
    <div>
      <div className="flex flex-col h-screen bg-bglp">
        {/* ヘッダー */}
        <header className="flex items-center justify-between px-8 py-4">
          <div className="text-2xl font-bold">めもっと</div>
          {/* 右上にメニュー */}
          <nav className="space-x-6">
            <Link href="#concept">コンセプト</Link>
            <Link href="#features">特徴</Link>
          </nav>
        </header>

        {/* メインエリア */}
        <main className="flex flex-1 items-center justify-center px-8">
          <div className="flex-1 flex items-center justify-around">
            <h1 className="text-6xl font-bold mb-4 leading-relaxed">
              みんなの日常。<br />
              わたしの独り言。
            </h1>
            <div className="relative w-100 h-100 rounded-full overflow-hidden">
              <Image
                src="/images/lp/memot_lp_top.png"
                alt="トップイメージ"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </main>
      </div>
      <footer className="relative w-full bg-white pt-8">
        <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <svg
            className="w-full h-full"
            viewBox="0 0 1440 205"
            preserveAspectRatio="none"
          >
          <path xmlns="http://www.w3.org/2000/svg" d="M554.387 86.3265C341.631 75.1101 94.4805 161.603 0 204.999H1439.7V40.2597C1439.7 40.2597 1443.5 39.5001 1398.21 13.7211C1337.34 -20.9302 1163.76 17.2262 1031.79 75.3107C899.816 133.395 820.332 100.347 554.387 86.3265Z" fill="#5DB53E"/>
          </svg>
        </div>

        {/* ▼ キャラクター画像を並べるエリア */}
        <div className="relative max-w-screen-xl mx-auto flex flex-wrap items-end justify-center gap-8 pb-12">
          <div className="relative w-32 h-32">
            <Image
              src="/images/lp/illust_1.png"
              alt="キャラクター1"
              fill
              className="object-contain"
            />
          </div>
          <div className="relative w-32 h-32">
            <Image
              src="/images/lp/illust_2.png"
              alt="キャラクター2"
              fill
              className="object-contain"
            />
          </div>
          <div className="relative w-32 h-32">
            <Image
              src="/images/lp/illust_3.png"
              alt="キャラクター3"
              fill
              className="object-contain"
            />
          </div>
          <div className="relative w-32 h-32">
            <Image
              src="/images/lp/illust_4.png"
              alt="キャラクター3"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* ▼ コピーライトなど */}
        <div className="text-center pb-4 text-sm text-gray-600">
          ©2025 めもっと
        </div>
      </footer>
    </div>
  );
}