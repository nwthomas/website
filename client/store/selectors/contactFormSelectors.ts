import {
  ContactFormMessage,
  ContactFormState,
} from "../reducers/contactFormSlice";

import { RootState } from "../";

const selectThemeState = (state: RootState): ContactFormState => {
  return state.contactForm;
};

export const selectContactFormMessageValues = (
  state: RootState
): ContactFormMessage => {
  const contactFormState = selectThemeState(state);

  return contactFormState.message;
};
