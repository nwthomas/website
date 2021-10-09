import { configureStore } from "@reduxjs/toolkit";
import contactReducer from "./contactSlice";
import modalReducer from "./modalSlice";

export const store = configureStore({
  reducer: {
    contact: contactReducer,
    banner: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
