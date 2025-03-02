"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      <button 
        data-drawer-target="default-sidebar" 
        data-drawer-toggle="default-sidebar" 
        aria-controls="default-sidebar" 
        type="button" 
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-green-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-200"
      >
        <span className="sr-only">Open sidebar</span>
      </button>
      <aside 
        id="default-sidebar" 
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" 
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-white">
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
                >
                  <span className="flex-1 ms-3 whitespace-nowrap">{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}
