import { ThemeEnum, ThemeState } from "@/store/reducers/themeSlice";

import { RootState } from "@/store";

const selectThemeState = (state: RootState): ThemeState => {
  return state.theme;
};

export const selectCurrentTheme = (state: RootState): ThemeEnum | null => {
  const themeState = selectThemeState(state);
  return themeState.currentTheme;
};
