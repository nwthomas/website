import "../styles/libs/fonts.css";

import * as React from "react";

import GlobalStyle, { makeMainTheme } from "../styles";
import { QueryClient, QueryClientProvider } from "react-query";

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
              <Navbar />
              <GlobalStyle theme={mainTheme} />
              <Component {...pageProps} />
            </ThemeProvider>
            {process.env.NEXT_PUBLIC_RUNTIME_ENV === "development" ? (
              <ReactQueryDevtools />
            ) : null}
          </Hydrate>
        </QueryClientProvider>
      </Provider>
    </>
  );
}

export default MyApp;
