import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ThemeEnum = "dark" | "light";

interface ThemeState {
  currentTheme: ThemeEnum | null;
}

const initialState: ThemeState = {
  currentTheme: null,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    updateCurrentTheme: (state, action: PayloadAction<ThemeEnum>) => {
      state.currentTheme = action.payload;
    },
  },
});

export const { updateCurrentTheme } = themeSlice.actions;
export default themeSlice.reducer;
