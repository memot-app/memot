"use client";
import React from 'react';
import Link from "next/link";
import Image from 'next/image';

const DocumentPage = () => {
  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-white px-4 md:px-8 fixed top-0 left-0">
      
      {/* スマホ画面時に左上に表示するサイドバーボタン */}
      <button 
        data-drawer-target="default-sidebar" 
        data-drawer-toggle="default-sidebar" 
        aria-controls="default-sidebar" 
        type="button" 
        className="fixed top-3 left-3 z-50 p-2 text-sm text-green-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-200"
      >
        <span className="sr-only">Open sidebar</span>
        {/* アイコンを追加する場合 */}
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>

      <div className="flex flex-col items-center w-full max-w-2xl h-screen justify-center text-center">
        
        {/* ロゴリンク */}
        <Link href="/" className="mb-8 inline-flex items-center gap-5 text-2xl font-bold text-gray-900 md:text-3xl" aria-label="logo">
          <Image src="/icons/club-icon.svg" alt="Webut Logo" width={40} height={40} />
          Webut
        </Link>
        
        {/* メッセージ */}
        <div className="mb-8 w-full text-gray-900 text-lg md:text-xl font-semibold">
          <h1 className="text-2xl md:text-3xl font-bold">Webut開発者一同から皆様へ</h1>
          <p className="mt-4 text-gray-800 text-xl md:text-lg leading-relaxed whitespace-nowrap">
            このアプリを楽しんでいただけると嬉しいです！<br />
            より快適にご利用いただけるよう、皆さんのご意見をお待ちしています。<br />
            フィードバックは、それぞれのプラットフォームやDiscordでお気軽にお寄せください！
          </p>
        </div>
      </div>
    </div>
  );
}

export default DocumentPage;
