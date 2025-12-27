import "./globals.css";

import { Geist, Geist_Mono } from "next/font/google";

import type { Metadata } from "next";

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
    siteName: "Natan Thomas",
    images: [
      {
        url: "https://www.nathanthomas.dev/images/og/home-page.webp",
        width: 2400,
        height: 1204,
      },
    ], // TODO: Add OG images to metadata here
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <main className="flex justify-center w-full min-h-screen py-10">{children}</main>
      </body>
    </html>
  );
}
