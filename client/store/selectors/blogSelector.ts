import { BlogState, OverlayImage } from "./../reducers/blogSlice";

import { RootState } from "../";

const selectBlogState = (state: RootState): BlogState => {
  return state.blog;
};

export const selectShowImageOverlay = (state: RootState): boolean => {
  const blogState = selectBlogState(state);

  return blogState.showImageOverlay;
};

export const selectOverlayImage = (state: RootState): OverlayImage | null => {
  const blogState = selectBlogState(state);

  return blogState.image;
};
