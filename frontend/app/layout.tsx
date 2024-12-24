import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI食生活診断テスト",
  description: "AIがあなたの食生活を診断します。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
