import { Geist, Geist_Mono } from "next/font/google";
import DocumentSideBar from "@/components/sidebars/DocumentSideBar";
import { DocumentProvider } from "@/context/DocumentContext";
import supabase from "@/utils/supabase/client";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function DocumentLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // 🔹 サーバーコンポーネント内で Supabase からデータを取得
  const { data, error } = await supabase.from("documents").select("*").single();

  return (
    <html lang="ja">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <DocumentProvider initialData={data || null} error={error?.message || null}>
          <DocumentSideBar />
          {children}
        </DocumentProvider>
      </body>
    </html>
  );
}
