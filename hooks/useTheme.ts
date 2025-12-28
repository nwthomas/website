import { DARK_THEME, LIGHT_THEME, ThemeEnum, updateCurrentTheme } from "@/store/reducers/themeSlice";
import { useDispatch, useSelector } from "react-redux";

import { selectCurrentTheme } from "@/store/selectors/themeSelectors";
import { useEffect } from "react";

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
export function getThemeFromWindowObject(): ThemeEnum | null {
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

  // This will usually not fetch and update Redux fast enough in order to avoid a flicker,
  // so no default is given. This will be updated with the user's preferences when the hook
  // loads in for various components. The user's preference is still set in _document.tsx.
  return null;
}

export interface UseThemeReturn {
  currentTheme: ThemeEnum | null;
  setCurrentTheme: () => void;
}

// Updates the theme using the JavaScript code defined in the _document.tsx file
export function useTheme(): UseThemeReturn {
  const dispatch = useDispatch();
  // Theme value from Redux (starts as null)
  const currentTheme = useSelector(selectCurrentTheme);

  // Handles any updates to the theme
  const setCurrentTheme = () => {
    if (typeof window !== "undefined" && window.__theme && window.__setPreferredTheme) {
      const newTheme = window.__theme === DARK_THEME ? LIGHT_THEME : DARK_THEME;

      dispatch(updateCurrentTheme(newTheme));
      window.__setPreferredTheme(newTheme);
    }
  };

  // Handles setting the theme in Redux on load of hook
  useEffect(() => {
    const windowObjectTheme = getThemeFromWindowObject();

    // Function to handle match media changes by user in OS
    const handleMatchMediaChange = (event: MediaQueryListEvent) => {
      const newTheme = (event.currentTarget as MediaQueryList).matches ? DARK_THEME : LIGHT_THEME;

      dispatch(updateCurrentTheme(newTheme));
      window.__setPreferredTheme(newTheme);
    };

    if (windowObjectTheme) {
      window.matchMedia(MATCH_MEDIA_QUERY_NAME).addEventListener("change", handleMatchMediaChange, { passive: true });

      dispatch(updateCurrentTheme(windowObjectTheme));

      return () => {
        window.matchMedia(MATCH_MEDIA_QUERY_NAME).removeEventListener("change", handleMatchMediaChange);
      };
    }
  }, [dispatch]);

  return { currentTheme, setCurrentTheme };
}
