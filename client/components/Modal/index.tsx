import * as React from "react";

import { DARK_THEME, ThemeEnum } from "../../store/reducers/themeSlice";
import {
  selectModalButtonLabel,
  selectModalMessage,
} from "../../store/selectors/modalSelectors";
import { useDispatch, useSelector } from "react-redux";
import { useLockBodyScroll, useTheme } from "../../hooks";

import FocusTrap from "focus-trap-react";
import { colors } from "../../styles/libs/theme";
import styled from "styled-components";
import { updateModalValues } from "../../store/reducers/modalSlice";

function Modal() {
  const dispatch = useDispatch();
  const [currentTheme] = useTheme();
  const modalMessage = useSelector(selectModalMessage);
  const modalButtonLabel = useSelector(selectModalButtonLabel);

  // This hook automatically removes the scroll lock on modal unmount
  useLockBodyScroll();

  const handleDismissClick = () => {
    dispatch(
      updateModalValues({
        message: "",
        buttonLabel: "",
        shouldShowModal: false,
      })
    );
  };

  return (
    <FocusTrap>
      <RootStyles currentTheme={currentTheme} onClick={handleDismissClick}>
        <dialog>
          <h1>{modalMessage}</h1>
          <button onClick={handleDismissClick}>{modalButtonLabel}</button>
        </dialog>
      </RootStyles>
    </FocusTrap>
  );
}

interface StyleProps {
  currentTheme: ThemeEnum | null;
}

const RootStyles = styled.div<StyleProps>`
  align-items: center;
  background-color: ${({ currentTheme }) =>
    `${currentTheme === DARK_THEME ? colors.white : colors.black}40`};
  display: flex;
  justify-content: center;
  position: fixed;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2147483647;

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpoints.tablet}) {
    padding: 0 var(--app-horizontal-gutters);
  }

  > dialog {
    align-items: center;
    background-color: var(--body-bg);
    border: none;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    width: 100%;

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.tablet}) {
      border-radius: ${({ theme }) => theme.borderRadii.large};
      background: ${({ theme }) => theme.colors.bodyBackground};
      height: initial;
      max-width: ${({ theme }) => theme.appDimensions.modalMaxWidth};
      padding: ${({ theme }) => theme.spaces.xLarge};
      width: 100%;
    }

    > h1 {
      font-size: 1.6rem;
      margin-bottom: ${({ theme }) => theme.spaces.medium};
      text-align: center;

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.tablet}) {
        font-size: 2rem;
      }
    }

    > button {
      align-items: center;
      border-radius: var(--border-radius-medium);
      background-color: var(--color-royal-blue);
      border: 2px solid var(--color-royal-blue);
      color: var(--color-white);
      cursor: pointer;
      display: flex;
      font-family: "Fira Sans", ui-sans-serif, system-ui, -apple-system,
        BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans,
        sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol,
        Noto Color Emoji;
      font-size: 1.6rem;
      font-weight: bold;
      height: var(--space-xlarge);
      justify-content: center;
      margin-top: var(--space-nano);
      transition: background-color var(--transition-short) ease-in-out,
        color var(--transition-short) ease-in-out;
      width: calc(100% - (var(--app-horizontal-gutters) + var(--space-small)));

      &:hover {
        background-color: transparent;
        color: var(--color-royal-blue);
      }

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.tablet}) {
        width: 70%;
      }
    }
  }
`;

export default Modal;
