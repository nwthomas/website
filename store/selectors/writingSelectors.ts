import { OverlayImage, WritingState } from "../reducers/writingSlice";

import { RootState } from "..";

const selectWritingState = (state: RootState): WritingState => {
  return state.writing;
};

export const selectIsShowingImageOverlay = (state: RootState): boolean => {
  const writingState = selectWritingState(state);

  return writingState.isShowingImageOverlay;
};

export const selectOverlayImage = (state: RootState): OverlayImage | null => {
  const writingState = selectWritingState(state);

  return writingState.image;
};
