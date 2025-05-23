import React from "react";
import Link from "next/link";
import Image from 'next/image';
import Lptext from "@/components/ui/lptext";

export default function LpPage() {
  return (
    <div>
      <div className="flex flex-col h-screen min-h-[700px] bg-bglp">
        <header className="flex items-center justify-between px-8 py-4">
          <div className="relative w-40 h-12">
            <Image
              src="/images/lp/memot_namelogo.png"
              alt="トップイメージ"
              fill
              className="object-contain"
            />
          </div>
          <nav className="space-x-6 hidden md:block">
            <Link href="#concept" className="font-bold">コンセプト</Link>
            <Link href="#features" className="font-bold">特徴</Link>
          </nav>
        </header>
        {/* メインエリア */}
        <main className="flex flex-1 items-center justify-center px-8">
          <div className="flex flex-col-reverse items-center gap-8 md:flex-row justify-around flex-1">
            <h1 className="font-bold mb-4 leading-relaxed md:mb-12 text-[clamp(2.5rem,10vw,5rem)] md:text-[clamp(2.5rem,6vw,3.75rem)]">
              みんなの日常。<br />
              わたしのめも。
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
      <section id="concept" className="flex justify-center items-center py-24">
        <div className="relative text-center px-4 flex h-[400px] items-center justify-center">
          {/* 背景のグラデーション円 */}
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="w-[400px] h-[400px] rounded-full bg-primary opacity-10 blur-2xl"></div>
          </div>
          <div className="relative z-10 space-y-8">
            <p className="text-2xl sm:text-4xl font-bold">気取らず、つづる。</p>
            <p className="text-2xl sm:text-4xl font-bold">
              <span className="text-primary font-black">“めも”</span>を通じて
            </p>
            <p className="text-2xl sm:text-4xl font-bold">暮らしをそっと分かち合える場所。</p>
          </div>
        </div>
      </section>
      <section id="features" className="flex justify-center items-center m-10">
        <div className='space-y-20 w-[900px] items-center justify-center md:space-y-16'>
          <div className='flex flex-col items-center gap-10 md:flex-row md:gap-20'>
            <div className="flex flex-col space-y-8">
              <div className="w-80 h-102 bg-primary rounded-3xl flex items-center justify-center ">
                <Image src={"/images/lp/feature/feature_1.png"} alt="Webut Logo" width={170} height={160} />
              </div>
            </div>
            <Lptext title_num={"01"} title={"影響力のない場"} text={`フォロワーやいいねの数、インプレッションなどの評価にとらわれず、誰もが自分らしい暮らしのひとときを気軽に共有できる、穏やかで心地よい場所です。`}/>
          </div>
          <div className='flex flex-col-reverse items-center gap-10 md:flex-row md:gap-20'>
            <Lptext title_num={"02"} title={"めもの場"} text={`返信やDMなどを気にせず、自分だけの気軽な空間で日々の暮らしを記録し、ありのままの日常をそっと共有できます。`}/>
            <div className="flex flex-col space-y-8">
              <div className="w-80 h-102 bg-primary rounded-3xl flex items-center justify-center overflow-hidden">
                <Image src={"/images/lp/feature/feature_2.png"} alt="Webut Logo" width={170} height={160} />
              </div>
            </div>
          </div>
          <div className='flex flex-col items-center gap-10 md:flex-row md:gap-20'>
          <div className="flex flex-col space-y-8">
              <div className="w-80 h-102 bg-primary rounded-3xl flex items-end justify-center overflow-hidden">
                <Image src={"/images/lp/feature/feature_3.png"} alt="Webut Logo" width={300} height={160}/>
              </div>
            </div>
            <Lptext title_num={"03"} title={"情報の種の場"} text={`AIがあなたの投稿にそっと寄り添い、暮らしに役立つ情報やちょっとした励ましを届けてくれる、優しい情報の種が生まれる場所です。`}/>
          </div>
        </div>
      </section>
      <section className="flex flex-col mt-24 items-center justify-center w-[80%] max-w-[900px] h-45 bg-[#F7F4F2] rounded-4xl mx-auto relative">
        <p className="text-[clamp(2rem,5vw,2.8rem)] font-bold">2025年リリース予定</p>
        <p className="text-sm whitespace-nowrap  text-black absolute bottom-6 left-1/2 -translate-x-1/2">※IOS・Android・Webで提供予定</p>
      </section>
      <footer className="relative w-full bg-white pt-8 overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-[205px] pointer-events-none">
        <div className="absolute  w-60 h-12">
            <Image
              src="/images/lp/memot_namelogo.png"
              alt="トップイメージ"
              fill
              className="object-contain"
            />
          </div>
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
          <div className="absolute bottom-0 left-[55%] w-60 h-60 md:w-60 md:h-48 md:left-[42%]">
            <Image
              src="/images/lp/illust_4.png"
              alt="キャラクター1"
              fill
              className="object-contain"
            />
          </div>
          <div className="absolute bottom-8 left-[62%] w-40 h-40 md:w-48 md:h-36 hidden md:block">
            <Image
              src="/images/lp/illust_1.png"
              alt="キャラクター2"
              fill
              className="object-contain"
            />
          </div>
          <div className="absolute bottom-0 left-[75%] w-40 h-40 md:w-60 md:h-48 hidden md:block">
            <Image
              src="/images/lp/illust_2.png"
              alt="キャラクター3"
              fill
              className="object-contain"
            />
          </div>
          <div className="absolute bottom-0 left-[85%] w-40 h-40 md:w-96 md:h-96 hidden md:block">
            <Image
              src="/images/lp/illust_3.png"
              alt="キャラクター4"
              fill
              className="object-contain"
            />
          </div>
        </div>
        <div className="absolute bottom-2 right-4 text-xs text-white">
          © 2025 めもっと
        </div>
      </footer>
    </div>
  );
}