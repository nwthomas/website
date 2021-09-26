import * as React from "react";
import type { AppProps } from "next/app";
import {
  DARK_THEME,
  useGetPreferredTheme,
} from "../hooks/useGetPreferredTheme";
import GlobalStyle, { makeMainTheme } from "../styles";

function MyApp({ Component, pageProps }: AppProps) {
  const [currentTheme, setCurrentTheme] = useGetPreferredTheme();

  const mainTheme = React.useMemo(() => {
    return makeMainTheme(currentTheme || DARK_THEME);
  }, [currentTheme]);
  console.log(mainTheme);
  return (
    <>
      <GlobalStyle theme={mainTheme} />
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
