"use client";
import React from 'react';
import Link from "next/link";
import Image from 'next/image';

const DocumentPage = () => {
  return (
    <div className="flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-16 ml-0 sm:ml-0 lg:ml-64">
      
      {/* スマホ画面時に左上に表示するサイドバーボタン */}
      <button 
        data-drawer-target="default-sidebar" 
        data-drawer-toggle="default-sidebar" 
        aria-controls="default-sidebar" 
        type="button" 
        className="fixed top-4 left-4 z-50 p-3 text-sm text-green-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-200"
      >
        <span className="sr-only">Open sidebar</span>
      </button>

      <div className="flex flex-col items-center w-full max-w-xs sm:max-w-md md:max-w-2xl min-h-screen justify-center text-center">
        
        {/* ロゴリンク */}
        <Link href="/" className="mb-8 inline-flex items-center gap-5 text-2xl font-bold text-gray-900 md:text-3xl" aria-label="logo">
          <Image src="/icons/club-icon.svg" alt="Webut Logo" width={40} height={40} />
          Webut
        </Link>
        
        {/* メッセージ */}
        <div className="mb-8 w-full text-gray-900 text-lg md:text-xl font-semibold">
          <h1 className="text-2xl md:text-3xl font-bold">Webut開発者一同から皆様へ</h1>
          <p className="mt-4 text-gray-800 text-xl md:text-lg leading-relaxed">
            このアプリを楽しんでいただけると嬉しいです！<br />
            快適にご利用いただけるよう、皆さんのご意見をお待ちしています。<br />
            フィードバックは、それぞれのプラットフォームやDiscordでお気軽にお寄せください！
          </p>
        </div>
      </div>
    </div>
  );
}

export default DocumentPage;
