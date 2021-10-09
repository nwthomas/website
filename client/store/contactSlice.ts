import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    updateMessage: (
      state,
      action: PayloadAction<{ [key: string]: string }>
    ) => {
      state.message = {
        ...state.message,
        ...action.payload,
      };
    },
  },
});

export const { updateMessage, updateWithWeb3 } = contactSlice.actions;
export default contactSlice.reducer;
