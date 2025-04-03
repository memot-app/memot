"use client";
import React from 'react';
import Link from "next/link";
import Image from 'next/image';
import Lptext from "@/components/ui/lptext";
import Lpimage from "@/components/ui/lpimage";

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
          <div className='space-y-16'>
            <div className='flex items-center gap-20 '>
              <Lpimage image={"/images/Group_623.png"}/>
              <Lptext title_num={"01"} title={"影響力のない場"} text={`フォロワーの数やいいねの表示、インプレッションなどの評価指標がないため、みんなそれぞれの日常として投稿ができます。`}/>
            </div>
            <div className='flex items-center gap-20 transform translate-x-8'>
              <Lptext title_num={"02"} title={"独り言の場"} text={`返信やDM機能を設けず、純粋に自分の日常を記録・共有する独り言として利用でき、余計なストレスを軽減します。`}/>
              <Lpimage image={"/images/Group_623.png"}/>
            </div>
            <div className='flex items-center gap-20'>
            <Lpimage image={"/images/Group_623.png"}/>
              <Lptext title_num={"03"} title={"情報の種の場"} text={`あなたの日常の一言や小さな出来事が、家族や友人、そして新たな出会いの会話のきっかけとなる空間です。直後のチャットではなく、間をおいた共有が自然なつながりを育みます。`}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocumentPage;
