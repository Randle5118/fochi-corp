import type { ReactNode } from "react";
import type { Viewport } from "next";
import { Noto_Sans_JP } from "next/font/google";
import { getMetadata } from "@/lib/seo";
import Header from "@/components/Header";
import SiteBackdrop from "@/components/SiteBackdrop";
import Footer from "@/components/Footer";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-noto-sans-jp",
});

export const metadata = getMetadata();

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2563EB",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja" className={notoSansJP.variable}>
      <body className="flex min-h-screen flex-col">
        {/* 全ページ共通の地。ページごとには置かない。 */}
        <SiteBackdrop />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
