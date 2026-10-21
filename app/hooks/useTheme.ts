import { DARK_THEME, LIGHT_THEME, SYSTEM_THEME, ThemeEnum, updateCurrentTheme } from "@/app/store/reducers/themeSlice";
import { useDispatch, useSelector } from "react-redux";

import { selectCurrentTheme } from "@/app/store/selectors/themeSelectors";
import { useEffect } from "react";

export const LOCAL_STORAGE_KEY = "theme";

// This extends the global Window object with custom values from _layout.tsx

declare global {
  interface Window {
    __setPreferredTheme: (newTheme: ThemeEnum) => void;
    __theme: string;
    __themePreference: ThemeEnum;
  }
}

function isThemeEnum(theme: string | null): theme is ThemeEnum {
  return theme === DARK_THEME || theme === LIGHT_THEME || theme === SYSTEM_THEME;
}

// Directly (and only) pull the window object theme preference which is useful both in the hook
// below as well as in _app.tsx when the StoreProvider is not available
export function getThemePreferenceFromWindowObject(): ThemeEnum | null {
  // We must check for typeof window !== "undefined" instead of window !== undefined
  // because typeof does not evaluate window but only get its type
  // https://dev.to/vvo/how-to-solve-window-is-not-defined-errors-in-react-and-next-js-5f97
  if (typeof window !== "undefined" && isThemeEnum(window.__themePreference)) {
    return window.__themePreference;
  }

  return null;
}

export const getThemeFromWindowObject = getThemePreferenceFromWindowObject;

export interface UseThemeReturn {
  currentTheme: ThemeEnum | null;
  setCurrentTheme: (newTheme: ThemeEnum) => void;
}

// Updates the theme using the JavaScript code defined in the _layout.tsx file
export function useTheme(): UseThemeReturn {
  const dispatch = useDispatch();
  // Theme value from Redux (starts as null)
  const currentTheme = useSelector(selectCurrentTheme);

  // Handles any updates to the theme
  const setCurrentTheme = (newTheme: ThemeEnum) => {
    if (typeof window !== "undefined" && window.__setPreferredTheme) {
      dispatch(updateCurrentTheme(newTheme));
      window.__setPreferredTheme(newTheme);
    }
  };

  // Handles setting the theme in Redux on load of hook
  useEffect(() => {
    const windowObjectTheme = getThemePreferenceFromWindowObject();

    if (windowObjectTheme) {
      dispatch(updateCurrentTheme(windowObjectTheme));
    }
  }, [dispatch]);

  return { currentTheme, setCurrentTheme };
}
