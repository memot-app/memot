"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function DocumentSideBar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* ハンバーガーメニュー（開いている時は非表示） */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)} 
          className="fixed top-6 left-6 z-50 p-3 text-sm text-green-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-200"
        >
          <span className="sr-only">Open sidebar</span>
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      )}

      {/* サイドバー */}
      <aside 
        className={`fixed top-0 left-0 z-40 w-72 h-screen transition-transform bg-white shadow-lg ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="h-full px-10 py-10 overflow-y-auto">
          {/* ロゴ（クリックでサイドバーを閉じる） */}
          <Link
            href="/"
            className="mb-12 flex items-center gap-5 text-xl font-bold text-black md:text-2xl"
            aria-label="logo"
            onClick={() => setIsOpen(false)}
          >
            <Image src="/icons/club-icon.svg" alt="Example Image" width={30} height={30} />
            Webut
          </Link>

          <ul className="space-y-5 font-medium">
            {[
              { href: "/document/privacy-policy", label: "プライバシーポリシー" },
              { href: "/document/terms-of-service", label: "利用規約" },
              { href: "/document/community-guidelines", label: "コミュニティガイドライン" },
              { href: "/document/maintenance-status", label: "メンテナンス状況" },
              { href: "/document/patch-notes", label: "パッチノート" },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link 
                  href={href} 
                  className={`flex items-center p-3 rounded-lg ${
                    pathname === href ? "text-[#5DB53E] font-semibold" : "text-[#404040] hover:text-gray-400"
                  }`}
                  onClick={() => setIsOpen(false)} // メニュー選択で閉じる
                >
                  <span className="flex-1 whitespace-nowrap">{label}</span>
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