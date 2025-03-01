"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { supabase } from "@/libs/supabase";

// ドキュメントのカラム名を定義
interface Document {
  privacy_policy?: string;
  terms_of_service?: string;
  community_guidelines?: string;
  maintenance_status?: string;
  patch_notes?: string;
  updated_at: string;
  created_at: string;
}

export default function DocumentPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [data, setData] = useState<Document | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // `id` に基づいて取得するカラムを決定
  const columnMap: Record<string, keyof Document> = {
    "privacy-policy": "privacy_policy",
    "terms-of-service": "terms_of_service",
    "community-guidelines": "community_guidelines",
    "maintenance-status": "maintenance_status",
    "patch-notes": "patch_notes",
  };

  const columnName = columnMap[id] || null;

  useEffect(() => {
    if (!columnName) {
      setError("無効なドキュメントIDです。");
      setLoading(false);
      return;
    }

    async function fetchData() {
      const { data, error } = await supabase.from("documents").select("*").single();
      if (error) {
        setError(error.message);
      } else {
        setData(data as Document);
      }
      setLoading(false);
    }

    fetchData();
  }, [columnName]);

  if (loading) {
    return <p className="text-gray-500 text-center">データを読み込み中...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  return (
    <div className="mx-auto flex items-center justify-center w-full min-h-screen bg-white px-4 md:px-8 fixed top-0 left-0">
      <div className="flex flex-col items-center w-full max-w-2xl h-screen">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-5 text-2xl font-bold text-black md:text-3xl"
          aria-label="logo"
        >
          <Image src="/icons/club-icon.svg" alt="Example Image" width={40} height={40} />
          Webut
        </Link>

        <div className="mb-8 w-full text-gray-600 text-sm md:text-base overflow-y-auto h-[60vh] p-4 border border-gray-300 rounded-lg">
          <ReactMarkdown components={{
            h1: (props) => <h1 className="text-gray-700 text-2xl font-bold" {...props} />, 
            h2: (props) => <h2 className="text-gray-600 text-xl font-semibold mt-4" {...props} />, 
            h3: (props) => <h3 className="text-gray-500 text-lg font-semibold mt-3" {...props} />, 
            p: (props) => <p className="text-black mt-2" {...props} />, 
            li: (props) => <li className="text-black ml-6 list-disc" {...props} />, 
            blockquote: (props) => <blockquote className="bg-gray-100 border-l-4 border-gray-500 text-gray-700 p-4 italic" {...props} />
          }}>
            {data ? data[columnName] || "内容がありません。" : "データがありません。"}
          </ReactMarkdown>
        </div>

        <div className="flex flex-row items-end justify-center gap-5">
          <p className="text-gray-500 mb-4">最終更新: {new Date(data?.updated_at || '').toLocaleString()}</p>
          <p className="text-gray-500 mb-4">作成日: {new Date(data?.created_at || '').toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
