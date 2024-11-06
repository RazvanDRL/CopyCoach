import type { Viewport, Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PlausibleProvider from 'next-plausible'
const inter = Inter({ subsets: ["latin"] });
// import OpenReplayWrapper from '@/components/OpenReplayWrapper'

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#007FFF"
};

export const metadata: Metadata = {
  metadataBase: new URL("https://copy-coach.com"),
  title: "CopyCoach: AI-Powered Copywriting Training & Exercises",
  description: "Transform your copywriting skills with AI-guided practice exercises and instant feedback. Write better headlines, emails, and ads through interactive training.",
  alternates: {
    canonical: "https://copy-coach.com",
    languages: {
      "en-US": "https://copy-coach.com",
    },
  },
  keywords: [
    "copycoach",
    "copy coach",
    "copywriting",
    "copywriting ai",
    "copywriting exercises",
    "copywriting training",
    "ai copywriting",
    "ai copywriting exercises",
    "ai copywriting training",
    "copywriting tool",
    "copywriting practice",
    "copywriting skills",
    "copywriting improvement",
    "copywriting feedback",
    "copywriting ai tool",
    "copywriting ai practice",
    "copywriting ai training",
    "copywriting ai exercises",
    "copywriting ai feedback",
  ],
  openGraph: {
    siteName: "CopyCoach",
    type: "website",
    locale: "en_US",
    title: "CopyCoach: AI-Powered Copywriting Training & Exercises",
    description: "Transform your copywriting skills with AI-guided practice exercises and instant feedback. Write better headlines, emails, and ads through interactive training.",
    images: [
      {
        url: "https://copy-coach.com/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "CopyCoach - Learn copywriting by doing"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "CopyCoach: AI-Powered Copywriting Training & Exercises",
    description: "Transform your copywriting skills with AI-guided practice exercises and instant feedback.",
    creator: "@trycopycoach",
    images: ["https://copy-coach.com/opengraph-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: "index, follow",
  },
  applicationName: "CopyCoach - Learn copywriting by doing",
  appleWebApp: {
    title: "CopyCoach - Learn copywriting by doing",
    statusBarStyle: "default",
    capable: true
  },
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        type: "image/x-icon"
      },
      {
        url: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png"
      },
      {
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png"
      },
      {
        url: "/favicon-96x96.png",
        sizes: "96x96",
        type: "image/png"
      },
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png"
      }
    ],
    shortcut: [
      {
        url: "/favicon.ico",
        type: "image/x-icon"
      }
    ],
    apple: [
      {
        url: "/apple-icon-57x57.png",
        sizes: "57x57",
        type: "image/png"
      },
      {
        url: "/apple-icon-60x60.png",
        sizes: "60x60",
        type: "image/png"
      },
      {
        url: "/apple-icon-72x72.png",
        sizes: "72x72",
        type: "image/png"
      },
      {
        url: "/apple-icon-76x76.png",
        sizes: "76x76",
        type: "image/png"
      },
      {
        url: "/apple-icon-114x114.png",
        sizes: "114x114",
        type: "image/png"
      },
      {
        url: "/apple-icon-120x120.png",
        sizes: "120x120",
        type: "image/png"
      },
      {
        url: "/apple-icon-144x144.png",
        sizes: "144x144",
        type: "image/png"
      },
      {
        url: "/apple-icon-152x152.png",
        sizes: "152x152",
        type: "image/png"
      },
      {
        url: "/apple-icon-180x180.png",
        sizes: "180x180",
        type: "image/png"
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PlausibleProvider
          domain="copy-coach.com"
          customDomain="https://plausible.longtoshort.tech"
          selfHosted={true}
          enabled={true}
        >
          {children}
          {/* <OpenReplayWrapper /> */}
        </PlausibleProvider>
      </body>
    </html>
  );
}
