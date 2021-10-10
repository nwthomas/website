import * as React from "react";
import styled from "styled-components";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";
import { useSelector, useDispatch } from "react-redux";
import {
  updateShowModal,
  updateModalButtonLabel,
  updateModalMessage,
} from "../../store/modalSlice";
import { RootState } from "../../store";

function Modal() {
  const dispatch = useDispatch();
  const modalMessage = useSelector((state: RootState) => state.modal.message);
  const modalButtonLabel = useSelector(
    (state: RootState) => state.modal.buttonLabel
  );
  const [lockBodyScroll, unlockBodyScroll] = useLockBodyScroll();

  React.useEffect(() => {
    // This function from our hook automatically removes the lock on modal unmount
    lockBodyScroll();
  }, []);

  const handleDismissClick = () => {
    unlockBodyScroll();

    // Reset modal for next use and hide it
    dispatch(updateModalButtonLabel(""));
    dispatch(updateModalMessage(""));
    dispatch(updateShowModal(false));
  };

  return (
    <RootStyles>
      <div>
        <h1>{modalMessage}</h1>
        <button onClick={handleDismissClick}>{modalButtonLabel}</button>
      </div>
    </RootStyles>
  );
}

const RootStyles = styled.div`
  align-items: center;
  background-color: ${({ theme }) => `${theme.colorsHex.black}90`};
  display: flex;
  justify-content: center;
  position: absolute;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;

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
    width: 100%;

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.tablet}) {
      border-radius: ${({ theme }) => theme.borderRadii.xxLarge};
      background: ${({ theme }) => theme.colors.bodyBackgroundAccentOne};
      -webkit-box-shadow: rgb(0 0 0 / 1%) 0px 0px 1px,
        rgb(0 0 0 / 4%) 0px 4px 8px, rgb(0 0 0 / 4%) 0px 16px 24px,
        rgb(0 0 0 / 1%) 0px 24px 32px;
      -moz-box-shadow: rgb(0 0 0 / 1%) 0px 0px 1px, rgb(0 0 0 / 4%) 0px 4px 8px,
        rgb(0 0 0 / 4%) 0px 16px 24px, rgb(0 0 0 / 1%) 0px 24px 32px;
      box-shadow: rgb(0 0 0 / 1%) 0px 0px 1px, rgb(0 0 0 / 4%) 0px 4px 8px,
        rgb(0 0 0 / 4%) 0px 16px 24px, rgb(0 0 0 / 1%) 0px 24px 32px;
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
      width: 70%;

      &:hover {
        opacity: ${({ theme }) => theme.opacity.opacity70};
      }
    }
  }
`;

export default Modal;
