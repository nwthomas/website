import * as React from "react";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { useGetPreferredTheme } from "../hooks/useGetPreferredTheme";
import GlobalStyle, { makeMainTheme } from "../styles";
import "../styles/libs/fonts.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [currentTheme, setCurrentTheme] = useGetPreferredTheme();

  const mainTheme = React.useMemo(() => {
    return makeMainTheme(currentTheme);
  }, [currentTheme]);

  return (
    <ThemeProvider theme={mainTheme}>
      <GlobalStyle theme={mainTheme} />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
export default MyApp;
