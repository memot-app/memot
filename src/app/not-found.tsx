"use client"
import React from 'react';
import Link from "next/link";
import Image from 'next/image';

const NotFound = () => {
  return (
    <div className="mx-auto flex items-center justify-center w-full h-screen bg-white px-4 md:px-8">
      <div className="flex flex-col items-center">
        <Link href="/" className="mb-8 inline-flex items-center gap-5 text-2xl font-bold text-black md:text-3xl" aria-label="logo">
          <Image
            src="/icons/club-icon.svg"
            alt="Example Image"
            width={40}
            height={40}
          />
          Webut
        </Link>
        <p className="mb-4 text-sm font-semibold uppercase text-indigo-500 md:text-base">これは404エラーです</p>
        <h1 className="mb-2 text-center text-2xl font-bold text-gray-800 md:text-3xl">ページが見つかりません</h1>
        <p className="mb-12 max-w-screen-md text-center text-gray-500 md:text-lg">お探しのページは存在しないか、移動した可能性があります。</p>
        <Link href="/" className="inline-block rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base">ホームに戻る</Link>
      </div>
    </div>
  )
}

export default NotFound;
