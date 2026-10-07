import "./globals.css";

import * as stylex from "@stylexjs/stylex";

import { Analytics } from "@/app/components/Analytics";
import { ErrorBoundary } from "@/app/components/ErrorBoundary";
import { Footer } from "./components/Footer";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { Navbar } from "@/app/components/Navbar";
import { Providers } from "@/app/components/Providers";
import { ReactNode } from "react";
import { sharedStyles } from "@/app/styles";

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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // The suppresHydrationWarning is for the script below which runs client-side to set the theme.
    // The user's theme is stored in Postgres (see app/theme/route.ts), and a readable "theme" cookie
    // mirrors it so this script can apply the theme before hydration without waiting on a fetch.
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

                function isTheme(value) {
                  return value === DARK_THEME || value === LIGHT_THEME;
                }

                try {
                  var themeCookie = document.cookie.match(/(?:^|; )theme=([^;]*)/);
                  var savedPreferredTheme = themeCookie && themeCookie[1];

                  if (isTheme(savedPreferredTheme)) {
                    preferredTheme = savedPreferredTheme;
                  }
                } catch (error) {}

                // One-time migration from the old localStorage-based theme. The theme is handed to
                // React via window.__legacyTheme so it can be persisted. This can be removed after
                // a few months once returning visitors have been migrated.
                try {
                  var legacyTheme = localStorage.getItem(THEME_KEY);

                  if (isTheme(legacyTheme)) {
                    if (!preferredTheme) {
                      preferredTheme = legacyTheme;
                      window.__legacyTheme = legacyTheme;
                      // Write the cookie now so the theme isn't lost if saving to the database fails
                      document.cookie = THEME_KEY + "=" + legacyTheme + "; path=/; max-age=31536000; samesite=lax";
                    }
                    localStorage.removeItem(THEME_KEY);
                  }
                } catch (error) {}

                window.__setPreferredTheme = function setPreferredTheme(newTheme) {
                  setTheme(newTheme);

                  try {
                    document.cookie = THEME_KEY + "=" + newTheme + "; path=/; max-age=31536000; samesite=lax";
                  } catch (error) {}
                }

                var userOSThemePreference = window.matchMedia('(prefers-color-scheme: dark)');
                
                setTheme(preferredTheme || (userOSThemePreference.matches ? DARK_THEME : LIGHT_THEME));
              })();
            `,
          }}
        />
      </head>
      <ErrorBoundary>
        <Providers>
          <body className={`${GeistSans.variable} ${GeistMono.variable}`}>
            <div {...stylex.props(styles.shell)}>
              <div {...stylex.props(sharedStyles.centered)}>
                <Navbar />
              </div>
              <main {...stylex.props(styles.main)}>{children}</main>
              <div {...stylex.props(styles.footerWrap)}>
                <Footer />
              </div>
            </div>
            <Analytics />
          </body>
        </Providers>
      </ErrorBoundary>
    </html>
  );
}

const styles = stylex.create({
  footerWrap: {
    display: "flex",
    justifyContent: "center",
    paddingLeft: "1.25rem",
    paddingRight: "1.25rem",
    paddingTop: "2.5rem",
    width: "100%",
  },
  main: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "2.5rem",
    width: "100%",
  },
  shell: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    minHeight: "100svh",
    paddingBottom: {
      default: "2.5rem",
      "@media (min-width: 1024px)": "6.25rem",
      "@media (min-width: 768px) and (max-width: 1023.98px)": "5rem",
    },
    paddingTop: {
      default: "2.5rem",
      "@media (min-width: 1024px)": "6.25rem",
      "@media (min-width: 768px) and (max-width: 1023.98px)": "5rem",
    },
    width: "100%",
  },
});
