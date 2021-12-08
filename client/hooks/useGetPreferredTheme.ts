import * as React from "react";
import type { ThemeEnum } from "../styles/libs/theme";

export const DARK_THEME = "dark";
export const LIGHT_THEME = "light";
export const LOCAL_STORAGE_KEY = "theme";

// This extends the global Window object with custom values from _document.tsx
declare global {
  interface Window {
    __setPreferredTheme: (newTheme: string) => void;
    __theme: string;
  }
}

// Updates the theme using the JavaScript code defined in the _document.tsx file
export function useGetPreferredTheme(): [ThemeEnum | null, () => void] {
  const [userPreferredTheme, setUserPreferredTheme] =
    React.useState<ThemeEnum | null>(null);

  React.useEffect(() => {
    // We must check for typeof window !== "undefined" instead of window !== undefined
    // because typeof does not evaluate window but only get its type
    // https://dev.to/vvo/how-to-solve-window-is-not-defined-errors-in-react-and-next-js-5f97
    if (
      typeof window !== "undefined" &&
      window.__theme &&
      (window.__theme === DARK_THEME || window.__theme === LIGHT_THEME)
    ) {
      setUserPreferredTheme(window.__theme);
    }
  }, []);

  function updatePreferredTheme() {
    if (
      typeof window !== "undefined" &&
      window.__theme &&
      window.__setPreferredTheme
    ) {
      const newTheme = window.__theme === DARK_THEME ? LIGHT_THEME : DARK_THEME;

      setUserPreferredTheme(newTheme);
      window.__setPreferredTheme(newTheme);
    }
  }

  return [userPreferredTheme, updatePreferredTheme];
}
