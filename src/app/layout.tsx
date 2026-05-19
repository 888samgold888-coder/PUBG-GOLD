import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PUBG Rank Boost - Professional Ranking Service",
  description: "Get boosted to your dream rank in PUBG with our professional service. Fast, secure, and reliable rank boosting.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
