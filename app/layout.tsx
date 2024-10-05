import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PlausibleProvider from 'next-plausible'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CopyCoach",
  description: "CopyCoach - Your AI Copywriting Coach",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <PlausibleProvider
        domain="copy-coach.com"
        customDomain="https://plausible.longtoshort.tech"
        selfHosted={true}
        enabled={true}
      />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
