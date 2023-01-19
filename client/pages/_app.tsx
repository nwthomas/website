import "../styles/libs/fonts.css";

import * as React from "react";

import GlobalStyle, { makeMainTheme } from "../styles";
import { QueryClient, QueryClientProvider } from "react-query";

import { Analytics } from "@vercel/analytics/react";
import { AppProps } from "next/app";
import { Hydrate } from "react-query/hydration";
import Navbar from "../components/Navbar";
import { Provider } from "react-redux";
import { ReactQueryDevtools } from "react-query/devtools";
import { ThemeProvider } from "styled-components";
import { getThemeFromWindowObject } from "../hooks";
import { store } from "../store";

// We don't care about cache invalidation given the needs of this app, so data isn't stale
// until >= 1 day
const ONE_DAY_MS = 60000 * 60 * 24;
const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: ONE_DAY_MS,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => client);

  // See global.tx .preload class for an explanation on why this is needed
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      document.body.classList.remove("preload");
    }
  }, []);

  const mainTheme = React.useMemo(() => {
    const currentTheme = getThemeFromWindowObject();

    return makeMainTheme(currentTheme);
  }, []);

  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <ThemeProvider theme={mainTheme}>
              <GlobalStyle theme={mainTheme} />
              <Navbar />
              <Component {...pageProps} />
            </ThemeProvider>
            {process.env.NEXT_PUBLIC_RUNTIME_ENV === "development" ? (
              <ReactQueryDevtools />
            ) : null}
          </Hydrate>
        </QueryClientProvider>
      </Provider>
      <Analytics />
    </>
  );
}

export default MyApp;
