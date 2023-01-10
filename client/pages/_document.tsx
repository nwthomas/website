import Document, { Head, Html, Main, NextScript } from "next/document";

import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="preload"
            href="/fonts/ObjectSans400.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/ObjectSans700.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        </Head>
        <body>
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
                document.body.className = newTheme;
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
          ></script>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
