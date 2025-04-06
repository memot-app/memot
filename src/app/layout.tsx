import type { Metadata } from "next";
import "./globals.css";
import { Noto_Sans_JP } from 'next/font/google'
import { GoogleAnalytics } from "@next/third-parties/google";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const siteUrl = publicRuntimeConfig.siteUrl;

const notoSansJp = Noto_Sans_JP({
  subsets: ['latin'],
  preload: false,
  variable: '--font-noto-sans-jp',
})

export const metadata: Metadata = {
  title: "めもっと",
  description: "気取らず、つづる。“めも”を通じて暮らしをそっと分かち合える、めも共有サービス。",
  openGraph: { images: `${siteUrl}/images/lp/ogp.png` },
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
