import blogReducer from "./reducers/blogSlice";
import { configureStore } from "@reduxjs/toolkit";
import contactFormReducer from "./reducers/contactFormSlice";
import modalReducer from "./reducers/modalSlice";
import themeReducer from "./reducers/themeSlice";

export const store = configureStore({
  reducer: {
    blog: blogReducer,
    contactForm: contactFormReducer,
    modal: modalReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
