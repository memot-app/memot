"use client"
import React from 'react';
import Link from "next/link";
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { supabase } from "@/libs/supabase";
export default async function DocumentPage({ params }: { params: { id: string } }) {
  const { id } = params;

  // `id` に基づいて取得するカラムを決定
  const columnMap: { [key: string]: string } = {
    "privacy-policy": "privacy_policy",
    "terms-of-service": "terms_of_service",
    "community-guidelines": "community_guidelines",
    "maintenance-status": "maintenance_status",
    "patch-notes": "patch_notes"
  };

  const columnName = columnMap[id] || null;

  if (!columnName) {
    return <p className="text-red-500">無効なドキュメントIDです。</p>;
  }

  // Supabaseから全データ取得（テーブルには1つしかない前提）
  const { data, error } = await supabase
    .from("documents")
    .select("*")
    .single();

  if (error || !data) {
    return <p className="text-red-500">データの取得に失敗しました: {error?.message}</p>;
  }

  return (

    <div className="mx-auto flex items-center justify-center w-full min-h-screen bg-white px-4 md:px-8 fixed top-0 left-0">
    
    <div className="flex flex-col items-center w-full max-w-2xl h-screen">
      <Link href="/" className="mb-8 inline-flex items-center gap-5 text-2xl font-bold text-black md:text-3xl" aria-label="logo">
        <Image
          src="/icons/club-icon.svg"
          alt="Example Image"
          width={40}
          height={40}
        />
        Webut
      </Link>
      
      <div className="mb-8 w-full text-gray-600 text-sm md:text-base overflow-y-auto h-[60vh] p-4 border border-gray-300 rounded-lg">
        <ReactMarkdown>{data[columnName]}</ReactMarkdown>
      </div>
      <div className='flex flex-row items-end justify-center gap-5'>
      <p className="text-gray-500 mb-4">最終更新: {new Date(data.updated_at).toLocaleString()}</p>
      <p className="text-gray-500 mb-4">作成日: {new Date(data.created_at).toLocaleString()}</p>
      </div>    
      <Link href="/" className="mt-4 inline-block rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base">ホームに戻る</Link>
    </div>
    
  </div>
  );
}
