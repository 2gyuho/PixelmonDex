import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "픽셀몬 위키",
  description: "픽셀몬 모드 포켓몬 도감, 도구, 카레 레시피 정보",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
        <footer className="text-center text-gray-600 text-xs py-6 border-t border-white/5 mt-12">
          픽셀몬 위키 — 비공식 사이트
        </footer>
      </body>
    </html>
  );
}
