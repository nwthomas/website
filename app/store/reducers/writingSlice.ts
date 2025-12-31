import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface OverlayImage {
  alt: string;
  height: number;
  width: number;
  placeholderImage: string;
  src: string;
}

export interface WritingState {
  isShowingImageOverlay: boolean;
  image: OverlayImage | null;
}

const initialState: WritingState = {
  isShowingImageOverlay: false,
  image: null,
};

export const writingSlice = createSlice({
  name: "writing",
  initialState,
  reducers: {
    showImageOverlay: (state, action: PayloadAction<OverlayImage>) => {
      state.isShowingImageOverlay = true;
      state.image = action.payload;
    },
    hideImageOverlay: (state) => {
      state.isShowingImageOverlay = false;
      state.image = null;
    },
  },
});

export const { showImageOverlay, hideImageOverlay } = writingSlice.actions;
export default writingSlice.reducer;
