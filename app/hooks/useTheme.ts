import { DARK_THEME, LIGHT_THEME, SYSTEM_THEME, ThemeEnum, updateCurrentTheme } from "@/app/store/reducers/themeSlice";
import { useDispatch, useSelector } from "react-redux";

import { selectCurrentTheme } from "@/app/store/selectors/themeSelectors";
import { useEffect } from "react";

export const LOCAL_STORAGE_KEY = "theme";

// This extends the global Window object with custom values from _document.tsx
declare global {
  interface Window {
    __setPreferredTheme: (newTheme: string) => void;
    __theme: string;
  }
}

// The theme cycle order for the switch: system → dark → light → system
const NEXT_THEME: Record<ThemeEnum, ThemeEnum> = {
  [SYSTEM_THEME]: DARK_THEME,
  [DARK_THEME]: LIGHT_THEME,
  [LIGHT_THEME]: SYSTEM_THEME,
};

// Directly (and only) pull the window object theme value which is useful both in the hook
// below as well as in _app.tsx when the StoreProvider is not available
export function getThemeFromWindowObject(): ThemeEnum | null {
  // We must check for typeof window !== "undefined" instead of window !== undefined
  // because typeof does not evaluate window but only get its type
  // https://dev.to/vvo/how-to-solve-window-is-not-defined-errors-in-next-js-5f97
  if (
    typeof window !== "undefined" &&
    window.__theme &&
    (window.__theme === DARK_THEME || window.__theme === LIGHT_THEME || window.__theme === SYSTEM_THEME)
  ) {
    return window.__theme as ThemeEnum;
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

// Updates the theme using the JavaScript code defined in the layout.tsx script
export function useTheme(): UseThemeReturn {
  const dispatch = useDispatch();
  // Theme value from Redux (starts as null)
  const currentTheme = useSelector(selectCurrentTheme);

  // Cycles to the next theme, following the order defined in NEXT_THEME
  const setCurrentTheme = () => {
    if (typeof window !== "undefined" && window.__theme && window.__setPreferredTheme) {
      const newTheme = NEXT_THEME[window.__theme as ThemeEnum];

      dispatch(updateCurrentTheme(newTheme));
      window.__setPreferredTheme(newTheme);
    }
  };

  // Handles setting the theme in Redux on load of hook. Theme changes from the OS while
  // in system mode are handled by the layout.tsx script, so the hook does not need to
  // watch the match media query itself.
  useEffect(() => {
    const windowObjectTheme = getThemeFromWindowObject();

    if (windowObjectTheme) {
      dispatch(updateCurrentTheme(windowObjectTheme));
    }
  }, [dispatch]);

  return { currentTheme, setCurrentTheme };
}
