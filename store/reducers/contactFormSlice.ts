import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ContactFormMessage {
  name: string;
  email: string;
  message: string;
  fax: string;
  csrfToken: string;
}

export interface ContactFormState {
  message: ContactFormMessage;
}

const initialState: ContactFormState = {
  message: {
    name: "",
    email: "",
    message: "",
    fax: "",
    csrfToken: "",
  },
};

export const contactFormSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    updateMessageValues: (state, action: PayloadAction<{ [key: string]: string }>) => {
      state.message = {
        ...state.message,
        ...action.payload,
        csrfToken: state.message.csrfToken,
      };
    },
    resetMessageValues: (state, action: PayloadAction<{ csrfToken: string }>) => {
      state.message = {
        name: "",
        email: "",
        message: "",
        fax: "",
        csrfToken: state.message.csrfToken,
      };
    },
    updateCsrfToken: (state, action: PayloadAction<{ csrfToken: string }>) => {
      state.message.csrfToken = action.payload.csrfToken;
    },
  },
});

export const { resetMessageValues, updateMessageValues, updateCsrfToken } = contactFormSlice.actions;
export default contactFormSlice.reducer;
