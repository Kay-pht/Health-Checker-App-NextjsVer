import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI食生活診断 | Are you healthy?",
  description: "AIがあなたの食生活を診断します。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
