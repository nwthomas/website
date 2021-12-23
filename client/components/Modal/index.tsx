import * as React from "react";
import styled, { ThemeContext } from "styled-components";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";
import { useSelector, useDispatch } from "react-redux";
import { updateModalValues } from "../../store/modalSlice";
import { RootState } from "../../store";
import type { ThemeEnum } from "../../styles/libs/theme";
import { DARK_THEME } from "../../hooks/useGetPreferredTheme";

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
    <RootStyles currentTheme={currentTheme}>
      <div>
        <h1>{modalMessage}</h1>
        <button onClick={handleDismissClick}>{modalButtonLabel}</button>
      </div>
    </RootStyles>
  );
}

interface StyleProps {
  currentTheme: ThemeEnum;
}

const RootStyles = styled.div<StyleProps>`
  align-items: center;
  background-color: ${({ theme }) => `${theme.colorsHex.black}90`};
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

  > div {
    align-items: center;
    background-color: ${({ theme }) => theme.colors.bodyBackground};
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
      -webkit-box-shadow: ${({ currentTheme }) =>
        `0px 6px 19px -2px rgba(${
          currentTheme === DARK_THEME ? "255, 255, 255" : "0, 0, 0"
        }, 0.13)`};
      -moz-box-shadow: ${({ currentTheme }) =>
        `0px 6px 19px -2px rgba(${
          currentTheme === DARK_THEME ? "255, 255, 255" : "0, 0, 0"
        }, 0.13)`};
      box-shadow: ${({ currentTheme }) =>
        `0px 6px 19px -2px rgba(${
          currentTheme === DARK_THEME ? "255, 255, 255" : "0, 0, 0"
        }, 0.13)`};
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
      border: 1px solid ${({ theme }) => theme.colors.bodyBackgroundAccentOne};
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
        opacity: ${({ theme }) => theme.opacity.opacity70};
      }
    }
  }
`;

export default Modal;
