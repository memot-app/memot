"use client";
import React from 'react';
import Link from "next/link";
import Image from 'next/image';

const DocumentPage = () => {
  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-white px-4 md:px-8 fixed top-0 left-0">
      <div className="flex flex-col items-center w-full max-w-2xl h-screen justify-center text-center">
        
        {/* ロゴリンク */}
        <Link href="/" className="mb-8 inline-flex items-center gap-5 text-2xl font-bold text-gray-900 md:text-3xl" aria-label="logo">
          <Image src="/icons/club-icon.svg" alt="Webut Logo" width={40} height={40} />
          Webut
        </Link>
        
        {/* メッセージ */}
        <div className="mb-8 w-full text-gray-900 text-lg md:text-xl font-semibold">
          <h1 className="text-2xl md:text-3xl font-bold">Webut開発者一同から皆様へ</h1>
          <p className="mt-4 text-gray-800 text-base md:text-lg leading-relaxed whitespace-nowrap">
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
