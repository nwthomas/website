import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

export const bannerSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    updateShowModal: (state, action: PayloadAction<boolean>) => {
      state.shouldShowModal = action.payload;
    },
    updateModalMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    updateModalButtonLabel: (state, action: PayloadAction<string>) => {
      state.buttonLabel = action.payload;
    },
  },
});

export const { updateShowModal, updateModalButtonLabel, updateModalMessage } =
  bannerSlice.actions;
export default bannerSlice.reducer;
