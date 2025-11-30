import { Global, useTheme } from "@emotion/react";

import { createGlobalStyles } from "./libs/global";

export { default as makeMainTheme } from "./libs/theme";
export type { Theme } from "./libs/theme";

export function GlobalStyles() {
  const theme = useTheme();
  const styles = createGlobalStyles(theme);

  return <Global styles={styles} />;
}
