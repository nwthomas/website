import * as React from "react";

import { DARK_THEME, ThemeEnum } from "../../hooks";
import styled, { ThemeContext } from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import FocusTrap from "focus-trap-react";
import { RootState } from "../../store";
import { updateModalValues } from "../../store/modalSlice";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";

function Modal() {
  const dispatch = useDispatch();
  const { currentTheme } = React.useContext(ThemeContext);
  const modalMessage = useSelector((state: RootState) => state.modal.message);
  const modalButtonLabel = useSelector(
    (state: RootState) => state.modal.buttonLabel
  );

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
  currentTheme: ThemeEnum;
}

const RootStyles = styled.div<StyleProps>`
  align-items: center;
  background-color: ${({ theme }) =>
    `${
      theme.currentTheme === DARK_THEME
        ? theme.colorsHex.alabaster
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
      border-radius: ${({ theme }) => theme.borderRadii.xxLarge};
      background: ${({ theme }) => theme.colors.bodyBackgroundAccentOne};
      -webkit-box-shadow: ${({ theme }) => theme.dropshadows.small};
      -moz-box-shadow: ${({ theme }) => theme.dropshadows.small};
      box-shadow: ${({ theme }) => theme.dropshadows.small};
      height: initial;
      max-width: ${({ theme }) => theme.appDimensions.modalMaxWidth};
      padding: ${({ theme }) => theme.spaces.large};
      width: 100%;

      > h1 {
        font-size: 1.6rem;

        @media only screen and (min-width: ${({ theme }) =>
            theme.breakpoints.tablet}) {
          font-size: 2rem;
        }

        @media only screen and (min-width: ${({ theme }) =>
            theme.breakpoints.desktop}) {
          font-size: 3rem;
        }
      }
    }

    > h1 {
      margin-bottom: ${({ theme }) => theme.spaces.medium};
      text-align: center;
    }

    > button {
      align-items: center;
      background: ${({ theme }) => theme.colors.buttonPrimaryBackground};
      border-radius: ${({ theme }) => theme.borderRadii.large};
      border: 2px solid ${({ theme }) => theme.colors.bodyBackgroundAccentOne};
      color: ${({ theme }) => theme.colorsHex.white};
      cursor: pointer;
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
