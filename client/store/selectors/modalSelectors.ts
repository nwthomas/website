import { ModalState } from "../reducers/modalSlice";
import { RootState } from "../";

const selectModalState = (state: RootState): ModalState => {
  return state.modal;
};

export const selectShouldShowModal = (state: RootState): boolean => {
  const modalState = selectModalState(state);

  return modalState.shouldShowModal;
};

export const selectModalMessage = (state: RootState): string => {
  const modalState = selectModalState(state);

  return modalState.message;
};

export const selectModalButtonLabel = (state: RootState): string => {
  const modalState = selectModalState(state);

  return modalState.buttonLabel;
};
