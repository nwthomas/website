import { OverlayImage, WritingState } from "@/store/reducers/writingSlice";

import { RootState } from "@/store";

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
