import "../styles/globals.css";

import * as React from "react";

import GlobalStyle, { makeMainTheme } from "../styles";
import { QueryClient, QueryClientProvider } from "react-query";

import { Analytics } from "@vercel/analytics/react";
import { AppProps } from "next/app";
import Head from "next/head";
import { Hydrate } from "react-query/hydration";
import { Provider } from "react-redux";
import { ReactQueryDevtools } from "react-query/devtools";
import { ThemeProvider } from "styled-components";
import { getThemeFromWindowObject } from "../hooks";
import { store } from "../store";
import { useTheme } from "../hooks";

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

// This abstraction of logic is necessary in order to grab the redux currentTheme value
// which is required to trigger updates of the mainTheme after the initial load
function App({ Component, pageProps }: AppProps) {
  const [currentThemeFromRedux] = useTheme();

  const mainTheme = React.useMemo(() => {
    if (!currentThemeFromRedux) {
      const currentThemeFromWindow = getThemeFromWindowObject();

      return makeMainTheme(currentThemeFromWindow);
    }

    return makeMainTheme(currentThemeFromRedux);
  }, [currentThemeFromRedux]);

  return (
    <ThemeProvider theme={mainTheme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

function MyApp(appProps: AppProps) {
  const [queryClient] = React.useState(() => client);

  // See global.tx .preload class for an explanation on why this is needed
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      document.body.classList.remove("preload");
    }
  }, []);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </Head>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={appProps.pageProps.dehydratedState}>
            <App {...appProps} />
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
