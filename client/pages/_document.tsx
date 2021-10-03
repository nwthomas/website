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
          <link rel="icon" href="/favicon.ico" />
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
              
              var WEB2_KEY = "web2";
              var WEB3_KEY = "web3";
              var FORM_KEY = "preferredForm";

              var preferredTheme;
              var preferredForm;

              var handleChangeTheme = function handleChangeTheme() {}

              function setTheme(newTheme) {
                window.__theme = newTheme;
                preferredTheme = newTheme;
                document.body.className = newTheme;
              }

              function setPreferredForm(newFormPreference) {
                window.__preferredForm = newFormPreference;
                preferredForm = newFormPreference;
              }

              try {
                var savedPreferredTheme = localStorage.getItem(THEME_KEY);
                var savedPreferredForm = localStorage.getItem(FORM_KEY);

                if (savedPreferredTheme === DARK_THEME || savedPreferredTheme === LIGHT_THEME) {
                  preferredTheme = savedPreferredTheme;
                }
                if (savedPreferredForm === WEB2_KEY || savedPreferredForm === WEB3_KEY) {
                  preferredForm = savedPreferredForm;
                }
              } catch (error) {}

              window.__setPreferredTheme = function setPreferredTheme(newTheme) {
                setTheme(newTheme);

                try {
                  localStorage.setItem(THEME_KEY, newTheme);
                } catch (error) {}
              }

              window.__setPreferredForm = function setPreferredFrom(newFormPreference) {
                setPreferredForm(newFormPreference);

                try {
                  localStorage.setItem(FORM_KEY, newFormPreference);
                } catch (error) {}
              }

              var userThemePreference = window.matchMedia('(prefers-color-scheme: dark)');
              userThemePreference.addListener(function(event) {
                window.__setPreferredTheme(event.matches ? DARK_THEME : LIGHT_THEME);
              });
              
              setTheme(preferredTheme || (userThemePreference.matches ? DARK_THEME : LIGHT_THEME));
              setPreferredForm(preferredForm || WEB2_KEY);
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
        </body>
      </Html>
    );
  }
}
