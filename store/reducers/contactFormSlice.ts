import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ContactFormMessage {
  name: string;
  email: string;
  message: string;
  fax: string;
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
      };
    },
    resetMessageValues: (state) => {
      state.message = {
        name: "",
        email: "",
        message: "",
        fax: "",
      };
    },
  },
});

export const { resetMessageValues, updateMessageValues } = contactFormSlice.actions;
export default contactFormSlice.reducer;
