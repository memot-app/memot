"use client";

import Link from "next/link";


export default function Sidebar() {

  return (
    <aside className="w-64 h-screen bg-gray-100 p-4">
      <h2 className="text-lg font-bold mb-4">ドキュメント</h2>
      <ul>
        <li className="mb-2">
          <Link href={`/privacy-policy`} className="text-blue-600 hover:underline">
            プライバシーポリシー
          </Link>
        </li>
        <li className="mb-2">
          <Link href={`/terms-of-service`} className="text-blue-600 hover:underline">
            利用規約
          </Link>
        </li>
        <li className="mb-2">
          <Link href={`/community-guidelines`} className="text-blue-600 hover:underline">
            コミュニティガイドライン
          </Link>
        </li>
        <li className="mb-2">
          <Link href={`/maintenance-status`} className="text-blue-600 hover:underline">
            メンテナンス状況
          </Link>
        </li>
        <li className="mb-2">
          <Link href={`/patch-notes`} className="text-blue-600 hover:underline">
            パッチノート
          </Link>
        </li>
      </ul>
    </aside>
  );
}
