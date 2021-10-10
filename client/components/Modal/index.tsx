import * as React from "react";
import styled from "styled-components";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";
import { useSelector, useDispatch } from "react-redux";
import { updateShowModal } from "../../store/modalSlice";

function Modal() {
  const dispatch = useDispatch();
  const setLockBodyScroll = useLockBodyScroll();

  React.useEffect(() => {
    // This function from our hook automatically removes the lock on modal unmount
    setLockBodyScroll();
  }, []);

  const handleDismissClick = () => {
    dispatch(updateShowModal(false));
  };

  return (
    <RootStyles>
      <div>
        <h1>Success</h1>
        <button onClick={handleDismissClick}>Okay</button>
      </div>
    </RootStyles>
  );
}

const RootStyles = styled.div`
  align-items: center;
  background-color: ${({ theme }) => `${theme.colorsHex.black}50`};
  display: flex;
  justify-content: center;
  position: absolute;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;

  > div {
    align-items: center;
    background-color: ${({ theme }) => theme.colors.bodyBackground};
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    width: 100%;

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
