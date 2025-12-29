import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "@/store/reducers/themeSlice";
import writingReducer from "@/store/reducers/writingSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    writing: writingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
