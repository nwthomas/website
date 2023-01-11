import * as React from "react";
import { ThemeEnum, updateCurrentTheme } from "../store/themeSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";

export const DARK_THEME = "dark";
export const LIGHT_THEME = "light";
export const LOCAL_STORAGE_KEY = "theme";
const MATCH_MEDIA_QUERY_NAME = "(prefers-color-scheme: dark)";

// This extends the global Window object with custom values from _document.tsx
declare global {
  interface Window {
    __setPreferredTheme: (newTheme: string) => void;
    __theme: string;
  }
}

// Directly (and only) pull the window object theme value which is useful both in the hook
// below as well as in _app.tsx when the StoreProvider is not available
export function getThemeFromWindowObject() {
  // We must check for typeof window !== "undefined" instead of window !== undefined
  // because typeof does not evaluate window but only get its type
  // https://dev.to/vvo/how-to-solve-window-is-not-defined-errors-in-react-and-next-js-5f97
  if (
    typeof window !== "undefined" &&
    window.__theme &&
    (window.__theme === DARK_THEME || window.__theme === LIGHT_THEME)
  ) {
    return window.__theme;
  }

  return LIGHT_THEME;
}

// Updates the theme using the JavaScript code defined in the _document.tsx file
export function useGetPreferredTheme(): [ThemeEnum | null, () => void] {
  const dispatch = useDispatch();
  // Theme value from Redux (starts as null)
  const userPreferredTheme = useSelector(
    (state: RootState) => state.theme.currentTheme
  );

  // Function to handle match media changes by user in OS
  const handleMatchMediaChange = React.useCallback(
    (event: MediaQueryListEvent) => {
      const newTheme = (event.currentTarget as MediaQueryList).matches
        ? DARK_THEME
        : LIGHT_THEME;

      window.__setPreferredTheme(newTheme);
    },
    []
  );

  // Handles any updates to the theme
  const handleUpdatePreferredTheme = React.useCallback(() => {
    if (
      typeof window !== "undefined" &&
      window.__theme &&
      window.__setPreferredTheme
    ) {
      const newTheme = window.__theme === DARK_THEME ? LIGHT_THEME : DARK_THEME;

      dispatch(updateCurrentTheme(newTheme));
      window.__setPreferredTheme(newTheme);
    }
  }, [dispatch]);

  // Handles setting the theme in Redux on load of hook
  React.useEffect(() => {
    // We must check for typeof window !== "undefined" instead of window !== undefined
    // because typeof does not evaluate window but only get its type
    // https://dev.to/vvo/how-to-solve-window-is-not-defined-errors-in-react-and-next-js-5f97
    if (
      typeof window !== "undefined" &&
      window.__theme &&
      (window.__theme === DARK_THEME || window.__theme === LIGHT_THEME)
    ) {
      const isMatchMediaSupported = typeof window.matchMedia === "function";

      if (isMatchMediaSupported) {
        window
          .matchMedia(MATCH_MEDIA_QUERY_NAME)
          .addEventListener("change", handleMatchMediaChange);
      }

      const windowObjectTheme = getThemeFromWindowObject();
      dispatch(updateCurrentTheme(windowObjectTheme));

      return () => {
        window
          .matchMedia(MATCH_MEDIA_QUERY_NAME)
          .removeEventListener("change", handleMatchMediaChange);
      };
    }
  }, [dispatch, handleMatchMediaChange]);

  return [userPreferredTheme, handleUpdatePreferredTheme];
}
