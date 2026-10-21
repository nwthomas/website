import { DARK_THEME, LIGHT_THEME, SYSTEM_THEME, ThemeEnum, updateCurrentTheme } from "@/app/store/reducers/themeSlice";
import { useDispatch, useSelector } from "react-redux";

import { selectCurrentTheme } from "@/app/store/selectors/themeSelectors";
import { useEffect } from "react";

export const LOCAL_STORAGE_KEY = "theme";

// These values are initialized by the pre-hydration script in app/layout.tsx.
declare global {
  interface Window {
    __setPreferredTheme: (newTheme: ThemeEnum) => void;
    __theme: ThemeEnum;
  }
}

export function getThemeFromWindowObject(): ThemeEnum | null {
  if (
    typeof window !== "undefined" &&
    (window.__theme === DARK_THEME || window.__theme === LIGHT_THEME || window.__theme === SYSTEM_THEME)
  ) {
    return window.__theme;
  }

  // Wait for hydration rather than guessing the user's preference on the server.
  return null;
}

export interface UseThemeReturn {
  currentTheme: ThemeEnum | null;
  setCurrentTheme: (newTheme: ThemeEnum) => void;
}

export function useTheme(): UseThemeReturn {
  const dispatch = useDispatch();
  const currentTheme = useSelector(selectCurrentTheme);

  const setCurrentTheme = (newTheme: ThemeEnum) => {
    if (typeof window !== "undefined" && window.__setPreferredTheme) {
      window.__setPreferredTheme(newTheme);
      dispatch(updateCurrentTheme(newTheme));
    }
  };

  useEffect(() => {
    const windowObjectTheme = getThemeFromWindowObject();

    if (windowObjectTheme) {
      dispatch(updateCurrentTheme(windowObjectTheme));
    }
  }, [dispatch]);

  return { currentTheme, setCurrentTheme };
}
