"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const document_1 = __importStar(require("next/document"));
const styled_components_1 = require("styled-components");
class MyDocument extends document_1.default {
    static getInitialProps(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const sheet = new styled_components_1.ServerStyleSheet();
            const originalRenderPage = ctx.renderPage;
            try {
                ctx.renderPage = () => originalRenderPage({
                    enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props}/>),
                });
                const initialProps = yield document_1.default.getInitialProps(ctx);
                return Object.assign(Object.assign({}, initialProps), { styles: (<>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>) });
            }
            finally {
                sheet.seal();
            }
        });
    }
    render() {
        return (<document_1.Html lang="en">
        <document_1.Head>
          <link rel="icon" href="/favicon.ico"/>
          <link rel="preload" href="/fonts/ObjectSans400.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/>
          <link rel="preload" href="/fonts/ObjectSans700.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/>
        </document_1.Head>
        <body>
          <script dangerouslySetInnerHTML={{
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
            }}></script>
          <document_1.Main />
          <document_1.NextScript />
          <script id="twitter-wjs" type="text/javascript" async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
        </body>
      </document_1.Html>);
    }
}
exports.default = MyDocument;
//# sourceMappingURL=_document.js.map