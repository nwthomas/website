import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ModalState {
  buttonLabel: string;
  message: string;
  shouldShowModal: boolean;
}

const initialState: ModalState = {
  buttonLabel: "",
  message: "",
  shouldShowModal: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    updateModalValues: (
      state,
      action: PayloadAction<{
        buttonLabel?: string;
        message?: string;
        shouldShowModal?: boolean;
      }>
    ) => {
      state.buttonLabel = action.payload?.buttonLabel || state.buttonLabel;
      state.message = action.payload?.message || state.message;
      state.shouldShowModal =
        action.payload?.shouldShowModal ?? state.shouldShowModal;
    },
  },
});

export const { updateModalValues } = modalSlice.actions;
export default modalSlice.reducer;
