import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ThemeEnum = "dark" | "light";
export type ThemePreference = ThemeEnum | "system";

export const DARK_THEME = "dark";
export const LIGHT_THEME = "light";
export const SYSTEM_THEME = "system";

export interface ThemeState {
  currentTheme: ThemeEnum | null;
  currentThemePreference: ThemePreference | null;
}

const initialState: ThemeState = {
  currentTheme: null,
  currentThemePreference: null,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    updateCurrentTheme: (state, action: PayloadAction<ThemeEnum>) => {
      state.currentTheme = action.payload;
    },
    updateCurrentThemePreference: (state, action: PayloadAction<ThemePreference>) => {
      state.currentThemePreference = action.payload;
    },
  },
});

export const { updateCurrentTheme, updateCurrentThemePreference } = themeSlice.actions;
export default themeSlice.reducer;
