import Document, { Html, Head, Main, NextScript } from "next/document";
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
              var LOCAL_STORAGE_KEY = "theme";
              var preferredTheme;

              window.__onThemeChange = function (newTheme) {};

              function setTheme(newTheme) {
                window.__theme = newTheme;
                preferredTheme = newTheme;
                document.body.className = newTheme;
                window.__onThemeChange(newTheme);
              }

              try {
                var savedPreferredTheme = localStorage.getItem(LOCAL_STORAGE_KEY);

                if (savedPreferredTheme === DARK_THEME || savedPreferredTheme === LIGHT_THEME) {
                  preferredTheme = savedPreferredTheme;
                }
              } catch (error) {}

              window.__setPreferredTheme = function setPreferredTheme(newTheme) {
                setTheme(newTheme);

                try {
                  localStorage.setItem(LOCAL_STORAGE_KEY, newTheme);
                } catch (error) {}
              }

              var userThemePreference = window.matchMedia('(prefers-color-scheme: dark)');
              userThemePreference.addListener(function(event) {
                window.__setPreferredTheme(event.matches ? DARK_THEME : LIGHT_THEME);
              });
              
              setTheme(preferredTheme || (userThemePreference.matches ? DARK_THEME : LIGHT_THEME));
            })();
            `,
            }}
          ></script>
          <Main />
          <NextScript />
          <script
            id="twitter-wjs"
            type="text/javascript"
            async
            src="https://platform.twitter.com/widgets.js"
            charSet="utf-8"
          ></script>
          <style>@ fontface {}</style>
        </body>
      </Html>
    );
  }
}
