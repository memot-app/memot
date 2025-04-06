import type { Metadata } from "next";
import "./globals.css";
import { Noto_Sans_JP } from 'next/font/google'
import { GoogleAnalytics } from "@next/third-parties/google";

const notoSansJp = Noto_Sans_JP({
  subsets: ['latin'],
  preload: false,
  variable: '--font-noto-sans-jp',
})

export const metadata: Metadata = {
  metadataBase:
    process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
      ? new URL("https://lp.memot.app")
      : undefined,
  title: "めもっと",
  description: "気取らず、つづる。“めも” を通じて暮らしをそっと分かち合える、めも共有サービス。",
  openGraph: { 
    title: "めもっと",
    description: "気取らず、つづる。“めも” を通じて暮らしをそっと分かち合える、めも共有サービス。",
    images: `/images/lp/ogp.png`, 
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "めもっと",
    description: "気取らず、つづる。“めも” を通じて暮らしをそっと分かち合える、めも共有サービス。",
    images: `/images/lp/ogp.png`,
  },
};


export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

  return (
    <html lang="ja" className="scroll-smooth">
      <body className={notoSansJp.variable}>
          {children}
          {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  );
}
