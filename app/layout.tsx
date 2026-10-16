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
                var SYSTEM_THEME = "system";
                var THEME_KEY = "theme";
                var themePreference;
                var userOSThemePreference = window.matchMedia('(prefers-color-scheme: dark)');

                function getOSTheme() {
                  return userOSThemePreference.matches ? DARK_THEME : LIGHT_THEME;
                }

                function setTheme(newTheme) {
                  themePreference = newTheme;
                  window.__theme = newTheme;

                  // System mode follows the OS preference; otherwise apply the chosen theme.
                  var appliedTheme = newTheme === SYSTEM_THEME ? getOSTheme() : newTheme;

                  if (appliedTheme === DARK_THEME) {
                    document.documentElement.classList.add(DARK_THEME);
                  } else {
                    document.documentElement.classList.remove(DARK_THEME);
                  }
                }

                try {
                  var savedThemePreference = localStorage.getItem(THEME_KEY);

                  if (
                    savedThemePreference === DARK_THEME ||
                    savedThemePreference === LIGHT_THEME ||
                    savedThemePreference === SYSTEM_THEME
                  ) {
                    themePreference = savedThemePreference;
                  }
                } catch (error) {}

                // With no saved preference, follow the OS theme.
                setTheme(themePreference || SYSTEM_THEME);

                userOSThemePreference.addEventListener("change", function () {
                  if (themePreference === SYSTEM_THEME) {
                    setTheme(SYSTEM_THEME);
                  }
                });

                window.__setPreferredTheme = function setPreferredTheme(newTheme) {
                  if (
                    newTheme === DARK_THEME ||
                    newTheme === LIGHT_THEME ||
                    newTheme === SYSTEM_THEME
                  ) {
                    setTheme(newTheme);
                  }

                  try {
                    localStorage.setItem(THEME_KEY, themePreference);
                  } catch (error) {}
                }
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
