import "./globals.css";

import * as stylex from "@stylexjs/stylex";

import { Analytics } from "@/app/components/Analytics";
import { BottomBlur } from "@/app/components/BottomBlur";
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
  description: "Nathan Thomas is a software engineer, writer, and teacher from San Francisco, CA",
  metadataBase: new URL("https://www.nathanthomas.dev"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Nathan Thomas",
    description: "Nathan Thomas is a software engineer, writer, and teacher from San Francisco, CA",
    url: "https://www.nathanthomas.dev",
    siteName: "Nathan Thomas",
    locale: "en_US",
    type: "website",
    images: [{ url: "/opengraph-image" }],
  },
};

// Structured data so search engines can identify the site and the person it belongs to
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.nathanthomas.dev/#website",
      name: "Nathan Thomas",
      url: "https://www.nathanthomas.dev",
      publisher: { "@id": "https://www.nathanthomas.dev/#person" },
    },
    {
      "@type": "Person",
      "@id": "https://www.nathanthomas.dev/#person",
      name: "Nathan Thomas",
      url: "https://www.nathanthomas.dev",
      jobTitle: "Software Engineer",
      sameAs: ["https://github.com/nwthomas", "https://x.com/nwthomas", "https://nathanthomas.substack.com/"],
    },
  ],
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
                var preferredTheme;
                var userOSThemePreference = window.matchMedia('(prefers-color-scheme: dark)');

                function setTheme(newTheme) {
                  window.__theme = newTheme;
                  preferredTheme = newTheme;
                  if (newTheme === DARK_THEME || (newTheme === SYSTEM_THEME && userOSThemePreference.matches)) {
                    document.documentElement.classList.add(DARK_THEME);
                  } else {
                    document.documentElement.classList.remove(DARK_THEME);
                  }
                }

                try {
                  var savedPreferredTheme = localStorage.getItem(THEME_KEY);

                  if (savedPreferredTheme === DARK_THEME || savedPreferredTheme === LIGHT_THEME || savedPreferredTheme === SYSTEM_THEME) {
                    preferredTheme = savedPreferredTheme;
                  }
                } catch (error) {}

                window.__setPreferredTheme = function setPreferredTheme(newTheme) {
                  setTheme(newTheme);

                  try {
                    localStorage.setItem(THEME_KEY, newTheme);
                  } catch (error) {}
                }

                userOSThemePreference.addEventListener('change', function () {
                  if (preferredTheme === SYSTEM_THEME) {
                    setTheme(SYSTEM_THEME);
                  }
                });

                setTheme(preferredTheme || SYSTEM_THEME);
              })();
            `,
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
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
            <BottomBlur />
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
    // Lets full-bleed children size against the page width without the scrollbar gutter that 100vw includes
    containerType: "inline-size",
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
