"use client";
import React from "react";
import Link from "next/link";
import Image from 'next/image';
import Lptext from "@/components/ui/lptext";
import Lpimage from "@/components/ui/lpimage";

export default function LpPage() {
  return (
    <div>
      <div className="flex flex-col h-screen bg-bglp">
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
          <div className="flex flex-col-reverse items-center justify-center gap-8 md:flex-row md:justify-around flex-1">
            <h1 className="font-bold mb-4 leading-relaxed md:mb-12 text-[clamp(2.5rem,10vw,5rem)] md:text-[clamp(2.5rem,6vw,3.75rem)]">
              みんなの日常。<br />
              わたしの独り言。
            </h1>
            <div className="relative w-[clamp(300px,60vw,500px)] h-[clamp(300px,60vw,500px)] md:w-[clamp(300px,40vw,500px)] md:h-[clamp(300px,40vw,500px)]rounded-full">
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
      <section className="flex justify-center items-center py-24">
        <div className="relative text-center px-4 flex h-[400px] items-center justify-center">
          {/* 背景のグラデーション円 */}
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="w-[400px] h-[400px] rounded-full bg-primary opacity-10 blur-2xl"></div>
          </div>

          {/* テキスト */}
          <div className="relative z-10 space-y-8">
            <p className="text-2xl sm:text-4xl font-bold">気取らず、つづる。</p>
            <p className="text-2xl sm:text-4xl font-bold">
              <span className="text-primary font-black">“めも”</span>を通じて
            </p>
            <p className="text-2xl sm:text-4xl font-bold">暮らしをそっと分かち合える場所。</p>
          </div>
        </div>
      </section>
      <section className="flex justify-center m-10">
        <div className='space-y-16 w-[900px] items-center justify-center'>
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
      </section>
      <footer className="relative w-full bg-white pt-8 overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-[205px] pointer-events-none">
          <svg
            className="w-full h-full"
            viewBox="0 0 1440 205"
            preserveAspectRatio="none"
          >
          <path xmlns="http://www.w3.org/2000/svg" d="M554.387 86.3265C341.631 75.1101 94.4805 161.603 0 204.999H1439.7V40.2597C1439.7 40.2597 1443.5 39.5001 1398.21 13.7211C1337.34 -20.9302 1163.76 17.2262 1031.79 75.3107C899.816 133.395 820.332 100.347 554.387 86.3265Z" fill="#5DB53E"/>
          </svg>
        </div>

        {/* ▼ キャラクター画像を並べるエリア */}
        <div className="relative w-full h-[300px] max-w-screen-xl mx-auto">
          <div className="absolute bottom-0 left-[50%] w-40 h-40 sm:w-60 sm:h-48">
            <Image
              src="/images/lp/illust_4.png"
              alt="キャラクター4"
              fill
              className="object-contain"
            />
          </div>
          <div className="absolute bottom-8 left-[65%] w-40 h-40 sm:w-48 sm:h-48">
            <Image
              src="/images/lp/illust_1.png"
              alt="キャラクター1"
              fill
              className="object-contain"
            />
          </div>
          <div className="absolute bottom-0 left-[75%] w-40 h-40 md:w-60 md:h-48">
            <Image
              src="/images/lp/illust_2.png"
              alt="キャラクター2"
              fill
              className="object-contain"
            />
          </div>
          <div className="absolute bottom-0 left-[85%] w-40 h-40 md:w-96 md:h-96">
            <Image
              src="/images/lp/illust_3.png"
              alt="キャラクター3"
              fill
              className="object-contain"
            />
          </div>
        </div>

      </footer>
    </div>
  );
}