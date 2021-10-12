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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const react_redux_1 = require("react-redux");
const styled_components_1 = require("styled-components");
const useGetPreferredTheme_1 = require("../hooks/useGetPreferredTheme");
const react_query_1 = require("react-query");
const devtools_1 = require("react-query/devtools");
const hydration_1 = require("react-query/hydration");
const styles_1 = __importStar(require("../styles"));
const Navbar_1 = __importDefault(require("../components/Navbar"));
const store_1 = require("../store");
require("../styles/libs/fonts.css");
// We don't care about cache invalidation given the needs of this app, so data isn't stale
// until >= 1 day
const ONE_DAY_MS = 60000 * 60 * 24;
function MyApp({ Component, pageProps }) {
    const [currentTheme, setCurrentTheme] = (0, useGetPreferredTheme_1.useGetPreferredTheme)();
    const [queryClient] = React.useState(() => new react_query_1.QueryClient({
        defaultOptions: {
            queries: {
                staleTime: ONE_DAY_MS,
            },
        },
    }));
    const mainTheme = React.useMemo(() => {
        return (0, styles_1.makeMainTheme)(currentTheme);
    }, [currentTheme]);
    return (<react_redux_1.Provider store={store_1.store}>
      <react_query_1.QueryClientProvider client={queryClient}>
        <hydration_1.Hydrate state={pageProps.dehydratedState}>
          <styled_components_1.ThemeProvider theme={mainTheme}>
            <Navbar_1.default currentTheme={currentTheme} onThemeChangeClick={setCurrentTheme}/>
            <styles_1.default theme={mainTheme}/>
            <Component {...pageProps} currentTheme={currentTheme}/>
          </styled_components_1.ThemeProvider>
          {process.env.NEXT_PUBLIC_RUNTIME_ENV === "development" ? (<devtools_1.ReactQueryDevtools />) : null}
        </hydration_1.Hydrate>
      </react_query_1.QueryClientProvider>
    </react_redux_1.Provider>);
}
exports.default = MyApp;
//# sourceMappingURL=_app.js.map