import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface OverlayImage {
  alt: string;
  height: number;
  width: number;
  placeholderImage: string;
  src: string;
}

export interface BlogState {
  showImageOverlay: boolean;
  image: OverlayImage | null;
}

const initialState: BlogState = {
  showImageOverlay: false,
  image: null,
};

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    showImageOverlay: (state, action: PayloadAction<OverlayImage>) => {
      state.showImageOverlay = true;
      state.image = action.payload;
    },
    hideImageOverlay: (state) => {
      state.showImageOverlay = false;
      state.image = null;
    },
  },
});

export const { showImageOverlay, hideImageOverlay } = blogSlice.actions;
export default blogSlice.reducer;
