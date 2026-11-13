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
import { THEME_SCRIPT } from "@/app/utils/themeScript";
import { WebMCP } from "@/app/components/WebMCP";
import { sharedStyles } from "@/app/styles";

const WEBMCP_ORIGIN_TRIAL_TOKEN = process.env.WEBMCP_ORIGIN_TRIAL_TOKEN;

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
    <html lang="en" suppressHydrationWarning>
      <head>
        {WEBMCP_ORIGIN_TRIAL_TOKEN ? <meta httpEquiv="origin-trial" content={WEBMCP_ORIGIN_TRIAL_TOKEN} /> : null}
        <script
          dangerouslySetInnerHTML={{
            __html: THEME_SCRIPT,
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </head>
      <ErrorBoundary>
        <Providers>
          <body
            className={`${GeistSans.variable} ${GeistMono.variable} ${stylex.props(stylex.defaultMarker()).className}`}
          >
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
            <WebMCP />
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
