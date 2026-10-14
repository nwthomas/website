import { ThemeEnum, ThemePreference, ThemeState } from "@/app/store/reducers/themeSlice";

import { RootState } from "@/app/store";

const selectThemeState = (state: RootState): ThemeState => {
  return state.theme;
};

export const selectCurrentTheme = (state: RootState): ThemeEnum | null => {
  const themeState = selectThemeState(state);
  return themeState.currentTheme;
};

export const selectCurrentThemePreference = (state: RootState): ThemePreference | null => {
  const themeState = selectThemeState(state);
  return themeState.currentThemePreference;
};
