import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface OverlayImage {
  alt: string;
  height: number;
  width: number;
  placeholderImage: string;
  src: string;
}

export interface BlogState {
  isShowingImageOverlay: boolean;
  image: OverlayImage | null;
}

const initialState: BlogState = {
  isShowingImageOverlay: false,
  image: null,
};

export const blogSlice = createSlice({
  name: "blog",
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

export const { showImageOverlay, hideImageOverlay } = blogSlice.actions;
export default blogSlice.reducer;
