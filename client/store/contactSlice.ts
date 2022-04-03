import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ContactState {
  message: {
    name: string;
    email: string;
    message: string;
    fax: string;
  };
}

const initialState: ContactState = {
  message: {
    name: "",
    email: "",
    message: "",
    fax: "",
  },
};

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    updateMessageValues: (
      state,
      action: PayloadAction<{ [key: string]: string }>
    ) => {
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

export const { resetMessageValues, updateMessageValues } = contactSlice.actions;
export default contactSlice.reducer;
