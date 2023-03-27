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
            href="/images/backgrounds/noise.webp"
            as="image"
          />
          <link
            rel="preload"
            href="/fonts/LibreBaskervilleBold.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/LibreBaskervilleRegular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/LibreBaskervilleItalic.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/FiraSansBold.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/FiraSansRegular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/FiraSansItalic.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link rel="shortcut icon" href="/images/favicon/favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/images/favicon/favicon.ico"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/images/favicon/favicon.ico"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/images/favicon/favicon.ico"
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


              // Set preload class to avoid transitions while page is loading in
              document.body.classList.add(["preload"]);
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
