import * as React from "react";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { useGetPreferredTheme } from "../hooks/useGetPreferredTheme";
import { QueryClientProvider, QueryClient } from "react-query";
import { Hydrate } from "react-query/hydration";
import GlobalStyle, { makeMainTheme } from "../styles";
import Navbar from "../components/Navbar";
import "../styles/libs/fonts.css";

// We don't care about cache invalidation given the needs of this app, so data isn't stale
// until >= 1 day
const oneDayMillis = 60000 * 60 * 24;

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: oneDayMillis,
          },
        },
      })
  );
  const [currentTheme] = useGetPreferredTheme();

  const mainTheme = React.useMemo(() => {
    return makeMainTheme(currentTheme);
  }, [currentTheme]);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ThemeProvider theme={mainTheme}>
          <Navbar />
          <GlobalStyle theme={mainTheme} />
          <Component {...pageProps} />
        </ThemeProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
