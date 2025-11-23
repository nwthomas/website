import { ThemeEnum, ThemeState } from "../reducers/themeSlice";

import { RootState } from "..";

const selectThemeState = (state: RootState): ThemeState => {
  return state.theme;
};

export const selectCurrentTheme = (state: RootState): ThemeEnum | null => {
  const themeState = selectThemeState(state);

  return themeState.currentTheme;
};
