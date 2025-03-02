"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { useParams } from "next/navigation";
import { useDocumentContext, Document } from "@/context/DocumentContext";

// `id` に基づいて取得するカラムを決定
const columnMap: Record<string, keyof Document> = {
  "privacy-policy": "privacy_policy",
  "terms-of-service": "terms_of_service",
  "community-guidelines": "community_guidelines",
  "maintenance-status": "maintenance_status",
  "patch-notes": "patch_notes",
};

export default function DocumentPage() {
  const params = useParams();
  const id = params?.id as string;
  const columnName = columnMap[id];

  const { data, loading, error } = useDocumentContext();

  if (!columnName) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500 text-center">無効なドキュメントIDです。</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 text-center">データを読み込み中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500 text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex items-center justify-center px-4 md:px-8 ml-0 lg:ml-0 sm:ml-64 mt-12">
      <div className="flex flex-col items-center w-full max-w-2xl h-screen">
        <div className="mb-8 w-full h-full text-gray-600 text-sm md:text-base overflow-y-auto p-4 border-2 border-gray-700 rounded-lg">
          <ReactMarkdown components={{
            h1: (props) => <h1 className="text-gray-950 text-2xl font-bold" {...props} />,
            h2: (props) => <h2 className="text-gray-900 text-xl font-semibold mt-4" {...props} />,
            h3: (props) => <h3 className="text-gray-600 text-lg font-semibold mt-3" {...props} />,
            p: (props) => <p className="text-black mt-2" {...props} />,
            li: (props) => <li className="text-black ml-6 list-disc" {...props} />,
            blockquote: (props) => <blockquote className="bg-gray-100 border-l-4 border-gray-500 text-gray-700 p-4 italic" {...props} />,
          }}>
            {data ? data[columnName] || "内容がありません。" : "データがありません。"}
          </ReactMarkdown>
        </div>

        <div className="flex flex-row items-end justify-center gap-5">
          <p className="text-gray-500 mb-4">最終更新: {new Date(data?.updated_at || '').toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
