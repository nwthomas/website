import "./globals.css";

import { Geist, Geist_Mono } from "next/font/google";

import { Analytics } from "@/app/components/Analytics";
import { Footer } from "@/app/components/Footer";
import type { Metadata } from "next";
import { Navbar } from "@/app/components/Navbar";
import { Providers } from "@/app/components/Providers";

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // The suppresHydrationWarning is for the script below which runs client-side to set the theme.
    // I may upgrade the theme logic to use a server-side set cookie (and is certainly what I might
    // use in a non-personal production environment), but this works great for a now for my site.
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                var DARK_THEME = "dark";
                var LIGHT_THEME = "light";
                var THEME_KEY = "theme";
                var preferredTheme;
                var handleChangeTheme = function handleChangeTheme() {}

                function setTheme(newTheme) {
                  window.__theme = newTheme;
                  preferredTheme = newTheme;
                  if (newTheme === DARK_THEME) {
                    document.documentElement.classList.add(DARK_THEME);
                  } else {
                    document.documentElement.classList.remove(DARK_THEME);
                  }
                }

                try {
                  var savedPreferredTheme = localStorage.getItem(THEME_KEY);

                  if (savedPreferredTheme === DARK_THEME || savedPreferredTheme === LIGHT_THEME) {
                    preferredTheme = savedPreferredTheme;
                  }
                } catch (error) {}

                window.__setPreferredTheme = function setPreferredTheme(newTheme) {
                  setTheme(newTheme);

                  try {
                    localStorage.setItem(THEME_KEY, newTheme);
                  } catch (error) {}
                }

                var userOSThemePreference = window.matchMedia('(prefers-color-scheme: dark)');
                
                setTheme(preferredTheme || (userOSThemePreference.matches ? DARK_THEME : LIGHT_THEME));
              })();
            `,
          }}
        />
      </head>
      <Providers>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <div className="flex flex-col items-center w-full min-h-screen py-10 md:py-20 lg:py-30">
            <div className="w-full max-w-xl">
              <Navbar />
            </div>
            <main className="flex justify-center w-full max-w-xl pt-10">{children}</main>
            <div className="w-full max-w-xl">
              <Footer />
            </div>
          </div>
          <Analytics />
        </body>
      </Providers>
    </html>
  );
}
