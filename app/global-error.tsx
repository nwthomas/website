"use client";

import "./globals.css";

import * as Sentry from "@sentry/nextjs";

import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { OrbStage } from "@/app/components/OrbStage";
import { THEME_SCRIPT } from "@/app/utils/themeScript";
import { useEffect } from "react";

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preload" as="image" href="/images/not-found/forest.webp" />
        <title>500 - Internal Server Error | Nathan Thomas</title>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className={`${GeistSans.variable} ${GeistMono.variable}`}>
        <OrbStage title="500 - Internal Server Error" standalone />
      </body>
    </html>
  );
}
