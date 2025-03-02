"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* ハンバーガーボタン */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="fixed top-3 left-3 z-50 p-2 text-sm text-green-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-200"
      >
        <span className="sr-only">Open sidebar</span>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>

      {/* サイドバー */}
      <aside 
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform bg-white ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                href="/"
                className="p-4 inline-flex items-center gap-5 text-xl font-bold text-black md:text-2xl"
                aria-label="logo"
              >
                <Image src="/icons/club-icon.svg" alt="Example Image" width={30} height={30} />
                Webut
              </Link>
            </li>
            {[
              { href: "/privacy-policy", label: "プライバシーポリシー" },
              { href: "/terms-of-service", label: "利用規約" },
              { href: "/community-guidelines", label: "コミュニティガイドライン" },
              { href: "/maintenance-status", label: "メンテナンス状況" },
              { href: "/patch-notes", label: "パッチノート" },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link 
                  href={href} 
                  className={`flex items-center p-2 rounded-lg ${pathname === href ? " text-[#5DB53E] font-semibold" : "text-[#404040] hover:text-gray-400"}`}
                  onClick={() => setIsOpen(false)} // クリックで閉じる
                >
                  <span className="flex-1 ms-3 whitespace-nowrap">{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* 背景クリックでサイドバーを閉じる */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black opacity-50 sm:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
