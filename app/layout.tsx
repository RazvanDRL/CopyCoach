import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PlausibleProvider from 'next-plausible'
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "CopyCoach",
    template: "%s | CopyCoach",
  },
  description: "CopyCoach - Your AI Copywriting Coach",
  twitter: {
    card: "summary_large_image",
    title: "CopyCoach",
    description: "CopyCoach - Your AI Copywriting Coach",
    images: ["/opengraph-image.png"],
  },
  openGraph: {
    images: ["/opengraph-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
<<<<<<< Updated upstream
  return (
    <html lang="en">
      <head>
        <meta property="og:url" content="https://copy-coach.com" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="CopyCoach" />
        <meta property="og:description" content="CopyCoach - Your AI Copywriting Coach" />
        <meta property="og:image" content="https://copy-coach.com/opengraph-image.png" />
        <link rel="icon" type="image/png" href="/favicon-48x48.png" sizes="48x48" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="CopyCoach" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <PlausibleProvider
        domain="copy-coach.com"
        customDomain="https://plausible.longtoshort.tech"
        selfHosted={true}
        enabled={true}
      />
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
=======

    return (
        <html lang="en">
            <head>
                <meta property="og:url" content="https://copy-coach.com" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="CopyCoach" />
                <meta property="og:description" content="CopyCoach - Your AI Copywriting Coach" />
                <meta property="og:image" content="https://copy-coach.com/opengraph-image.png" />
                <link rel="icon" type="image/png" href="/favicon-48x48.png" sizes="48x48" />
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
                <link rel="shortcut icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <meta name="apple-mobile-web-app-title" content="CopyCoach" />
                <link rel="manifest" href="/site.webmanifest" />
            </head>
            <PlausibleProvider
                domain="copy-coach.com"
                customDomain="https://plausible.longtoshort.tech"
                selfHosted={true}
                enabled={true}
            />
            <body className={inter.className}>
                {/* <OnbordaProvider>
                    <Onborda
                        steps={steps}
                        showOnborda={true}
                        shadowRgb="55,48,163"
                        shadowOpacity="0.8"
                        cardComponent={TourCard}
                        cardTransition={{ duration: 0.3, type: "tween" }}
                    > */}
                {children}
                {/* </Onborda>
                </OnbordaProvider> */}
            </body>
        </html>
    );
>>>>>>> Stashed changes
}
