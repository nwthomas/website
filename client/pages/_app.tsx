import "../styles/libs/fonts.css";

import * as React from "react";

import GlobalStyle, { makeMainTheme } from "../styles";
import { QueryClient, QueryClientProvider } from "react-query";

import type { AppProps } from "next/app";
import { Hydrate } from "react-query/hydration";
import Navbar from "../components/Navbar";
import { Provider } from "react-redux";
import { ReactQueryDevtools } from "react-query/devtools";
import { ThemeProvider } from "styled-components";
import { store } from "../store";
import { useGetPreferredTheme } from "../hooks/useGetPreferredTheme";

// We don't care about cache invalidation given the needs of this app, so data isn't stale
// until >= 1 day
const ONE_DAY_MS = 60000 * 60 * 24;

function MyApp({ Component, pageProps }: AppProps) {
  const [currentTheme] = useGetPreferredTheme();
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: ONE_DAY_MS,
          },
        },
      })
  );

  const mainTheme = React.useMemo(() => {
    return makeMainTheme(currentTheme);
  }, [currentTheme]);

  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <ThemeProvider theme={mainTheme}>
              <Navbar />
              <GlobalStyle theme={mainTheme} />
              <Component {...pageProps} currentTheme={currentTheme} />
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
