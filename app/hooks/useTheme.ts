import { DARK_THEME, LIGHT_THEME, ThemeEnum, updateCurrentTheme } from "@/app/store/reducers/themeSlice";
import { useDispatch, useSelector } from "react-redux";

import { selectCurrentTheme } from "@/app/store/selectors/themeSelectors";
import { useEffect } from "react";

const MATCH_MEDIA_QUERY_NAME = "(prefers-color-scheme: dark)";
const THEME_ENDPOINT = "/theme";

// This extends the global Window object with custom values from the inline script in app/layout.tsx
declare global {
  interface Window {
    __legacyTheme?: string;
    __setPreferredTheme: (newTheme: string) => void;
    __theme: string;
  }
}

function isTheme(value: unknown): value is ThemeEnum {
  return value === DARK_THEME || value === LIGHT_THEME;
}

// Saves the theme for the current user in the database. The theme cookie is already updated
// client-side by window.__setPreferredTheme, so failures here are non-blocking.
function persistTheme(theme: ThemeEnum) {
  fetch(THEME_ENDPOINT, {
    body: JSON.stringify({ theme }),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  }).catch(() => {});
}

// Directly (and only) pull the window object theme value which is useful both in the hook
// below as well as in _app.tsx when the StoreProvider is not available
export function getThemeFromWindowObject(): ThemeEnum | null {
  // We must check for typeof window !== "undefined" instead of window !== undefined
  // because typeof does not evaluate window but only get its type
  // https://dev.to/vvo/how-to-solve-window-is-not-defined-errors-in-react-and-next-js-5f97
  if (typeof window !== "undefined" && isTheme(window.__theme)) {
    return window.__theme;
  }

  // This will usually not fetch and update Redux fast enough in order to avoid a flicker,
  // so no default is given. This will be updated with the user's preferences when the hook
  // loads in for various components. The user's preference is still set in app/layout.tsx.
  return null;
}

export interface UseThemeReturn {
  currentTheme: ThemeEnum | null;
  setCurrentTheme: () => void;
}

// Updates the theme using the JavaScript code defined in app/layout.tsx and persists it to the database
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
      persistTheme(newTheme);
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
      persistTheme(newTheme);
    };

    if (!windowObjectTheme) {
      return;
    }

    window.matchMedia(MATCH_MEDIA_QUERY_NAME).addEventListener("change", handleMatchMediaChange, { passive: true });

    dispatch(updateCurrentTheme(windowObjectTheme));

    const abortController = new AbortController();

    if (isTheme(window.__legacyTheme)) {
      // Migrate the theme previously saved in localStorage into the database
      persistTheme(window.__legacyTheme);
      window.__legacyTheme = undefined;
    } else {
      // Reconcile with the database in case the theme cookie was cleared or changed elsewhere
      fetch(THEME_ENDPOINT, { signal: abortController.signal })
        .then((response) => (response.ok ? response.json() : null))
        .then((data: { theme: unknown } | null) => {
          const serverTheme = data?.theme;

          if (isTheme(serverTheme) && serverTheme !== window.__theme) {
            dispatch(updateCurrentTheme(serverTheme));
            window.__setPreferredTheme(serverTheme);
          }
        })
        .catch(() => {});
    }

    return () => {
      abortController.abort();
      window.matchMedia(MATCH_MEDIA_QUERY_NAME).removeEventListener("change", handleMatchMediaChange);
    };
  }, [dispatch]);

  return { currentTheme, setCurrentTheme };
}
