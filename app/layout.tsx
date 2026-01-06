import "./globals.css";

import { Analytics } from "@/app/components/Analytics";
import { ErrorBoundary } from "@/app/components/ErrorBoundary";
import { Footer } from "./components/Footer";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { Navbar } from "@/app/components/Navbar";
import { Providers } from "@/app/components/Providers";

export const metadata: Metadata = {
  title: "Nathan Thomas",
  description: "Internet home for Nathan Thomas",
  metadataBase: new URL("https://www.nathanthomas.dev"),
  openGraph: {
    title: "Nathan Thomas",
    description: "Internet home for Nathan Thomas",
    url: "https://www.nathanthomas.dev",
    siteName: "Nathan Thomas",
    locale: "en_US",
    type: "website",
    images: [{ url: "/opengraph-image" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // The suppresHydrationWarning is for the script below which runs client-side to set the theme.
    // This may eventually be upgraded to use a server-side set cookie (and is certainly what would
    // be used in a non-personal production environment). For now, this works great for this site.
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
        <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
          <ErrorBoundary>
            <div className="flex flex-col items-center w-full min-h-svh py-10 md:py-20 lg:py-25 relative">
              <div className="flex justify-center w-full">
                <Navbar />
              </div>
              <main className="flex justify-center w-full pt-10">{children}</main>
              <div className="flex justify-center w-full pt-10 px-5">
                <Footer />
              </div>
            </div>
          </ErrorBoundary>
          <Analytics />
        </body>
      </Providers>
    </html>
  );
}
