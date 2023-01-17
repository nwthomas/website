import * as React from "react";

import { DARK_THEME, ThemeEnum } from "../../store/reducers/themeSlice";
import {
  selectModalButtonLabel,
  selectModalMessage,
} from "../../store/selectors/modalSelectors";
import { useDispatch, useSelector } from "react-redux";
import { useGetPreferredTheme, useLockBodyScroll } from "../../hooks";

import FocusTrap from "focus-trap-react";
import styled from "styled-components";
import { updateModalValues } from "../../store/reducers/modalSlice";

function Modal() {
  const dispatch = useDispatch();
  const [currentTheme] = useGetPreferredTheme();
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
    <RootStyles currentTheme={currentTheme} onClick={handleDismissClick}>
      <FocusTrap>
        <dialog>
          <h1>{modalMessage}</h1>
          <button onClick={handleDismissClick}>{modalButtonLabel}</button>
        </dialog>
      </FocusTrap>
    </RootStyles>
  );
}

interface StyleProps {
  currentTheme: ThemeEnum | null;
}

const RootStyles = styled.div<StyleProps>`
  align-items: center;
  background-color: ${({ currentTheme, theme }) =>
    `${
      currentTheme === DARK_THEME
        ? theme.colorsHex.white
        : theme.colorsHex.black
    }40`};
  display: flex;
  justify-content: center;
  position: fixed;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpoints.tablet}) {
    padding: ${({ theme }) => `0 ${theme.appDimensions.appHorizontalGutters}`};
  }

  > dialog {
    align-items: center;
    background-color: ${({ theme }) => theme.colors.bodyBackground};
    border: none;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    padding: ${({ theme }) => `0 ${theme.appDimensions.appHorizontalGutters}`};
    width: 100%;

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.tablet}) {
      border-radius: ${({ theme }) => theme.borderRadii.large};
      background: ${({ theme }) => theme.colors.bodyBackground};
      -webkit-box-shadow: ${({ theme }) => theme.dropshadows.small};
      -moz-box-shadow: ${({ theme }) => theme.dropshadows.small};
      box-shadow: ${({ theme }) => theme.dropshadows.small};
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
      background: ${({ theme }) => theme.colors.buttonPrimaryBackground};
      border-radius: ${({ theme }) => theme.borderRadii.medium};
      border: 2px solid ${({ theme }) => theme.colors.bodyBackgroundAccentOne};
      color: ${({ theme }) => theme.colorsHex.white};
      display: flex;
      justify-content: center;
      margin-top: ${({ theme }) => theme.spaces.nano};
      height: ${({ theme }) => theme.spaces.xLarge};
      width: ${({ theme }) =>
        `calc(100% - (${theme.appDimensions.appHorizontalGutters} + ${theme.spaces.small}))`};

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.tablet}) {
        width: 70%;
      }

      &:hover {
        opacity: ${({ theme }) => theme.opacity.opacity80};
      }
    }
  }
`;

export default Modal;
