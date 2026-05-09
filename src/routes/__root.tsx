/// <reference types="vite/client" />
import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";
import * as React from "react";

import appCss from "@/styles/globals.css?url";
import { Analytics } from "@/components/Analytics";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Providers } from "@/components/Providers";
import { pageMeta } from "@/utils/meta";

export const Route = createRootRoute({
  head: () => ({
    meta: pageMeta({
      title: "Nathan Thomas",
      description: "Internet home for Nathan Thomas",
    }),
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
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
                };

                var userOSThemePreference = window.matchMedia('(prefers-color-scheme: dark)');

                setTheme(preferredTheme || (userOSThemePreference.matches ? DARK_THEME : LIGHT_THEME));
              })();
            `,
          }}
        />
        <HeadContent />
      </head>
      <body className="antialiased">
        <ErrorBoundary>
          <Providers>
            <div className="flex flex-col items-center w-full min-h-svh py-10 md:py-20 lg:py-25 relative">
              <div className="flex justify-center w-full">
                <Navbar />
              </div>
              <main className="flex justify-center w-full pt-10">{children}</main>
              <div className="flex justify-center w-full pt-10 px-5">
                <Footer />
              </div>
            </div>
            <Analytics />
          </Providers>
        </ErrorBoundary>
        <Scripts />
      </body>
    </html>
  );
}
