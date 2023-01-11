import { configureStore } from "@reduxjs/toolkit";
import contactReducer from "./contactSlice";
import modalReducer from "./modalSlice";
import themeReducer from "./themeSlice";

export const store = configureStore({
  reducer: {
    contact: contactReducer,
    modal: modalReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
