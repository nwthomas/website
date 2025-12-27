import "./globals.css";

import { Geist, Geist_Mono } from "next/font/google";
import { THEME_DARK_MODE, THEME_LIGHT_MODE } from "./components/ThemeSwitch";

import { Analytics } from "./components/Analytics";
import type { Metadata } from "next";
import { Navbar } from "./components/Navbar";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nathan Thomas",
  description: "Internet home for Nathan Thomas",
  metadataBase: new URL("https://www.nathanthomas.dev"),
  openGraph: {
    title: "Nathan Thomas",
    description: "Internet home for Nathan Thomas",
    url: "https://www.nathanthomas.dev",
    siteName: "Nathan Thomas",
    images: [
      {
        url: "https://www.nathanthomas.dev/images/og/home-page.webp",
        width: 2400,
        height: 1204,
      },
    ], // TODO: Add more (and update) OG images to metadata here
    locale: "en_US",
    type: "website",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  const theme = localStorage.getItem('theme');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const resolved = theme ?? (prefersDark ? '${THEME_DARK_MODE}' : '${THEME_LIGHT_MODE}');
                  document.documentElement.classList.add(resolved);
                } catch {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="flex flex-col items-center w-full min-h-screen px-5 py-10 md:py-20 lg:py-30">
          <div className="w-full max-w-xl">
            <Navbar />
          </div>
          <main className="flex justify-center w-full max-w-xl pt-5">{children}</main>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
