import * as React from "react";

import FocusTrap from "focus-trap-react";
import MobileNavbarTray from "./MobileNavbarTray";
import styled from "styled-components";

interface Props {
  currentPath: string;
}

function MobileNavbar({ currentPath }: Props) {
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);

  const handleOnClick = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <RootStyles>
        <FocusTrap active={isMenuOpen}>
          <div>
            <button onClick={handleOnClick}>
              <div />
              <div />
            </button>
            {isMenuOpen ? <MobileNavbarTray currentPath={currentPath} /> : null}
          </div>
        </FocusTrap>
      </RootStyles>
    </>
  );
}

const RootStyles = styled.div`
  height: ${({ theme }) => `calc(${theme.spaces.xxSmall} * 3)`};
  position: relative;
  width: ${({ theme }) => `calc(${theme.spaces.xxSmall} * 5)`};

  > div {
    width: 100%;

    button {
      background: none;
      border: none;
      color: inherit;
      cursor: pointer;
      font: inherit;
      height: 100%;
      justify-content: space-between;
      margin: 0;
      outline-offset: ${({ theme }) => theme.spaces.micro};
      padding: 0;
      position: absolute;
      width: 100%;
      z-index: 2147483647;

      > div:first-child {
        background-color: ${({ theme }) => theme.colors.text};
        border-radius: ${({ theme }) => theme.borderRadii.large};
        height: ${({ theme }) => theme.spaces.micro};
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        transform: translateY(${({ theme }) => theme.spaces.micro});
        transition: transform ${({ theme }) => theme.transitions.medium}
          cubic-bezier(0.23, 1, 0.32, 1);
        width: 100%;
      }

      > div:last-child {
        background-color: ${({ theme }) => theme.colors.text};
        border-radius: ${({ theme }) => theme.borderRadii.large};
        bottom: 0;
        left: 0;
        position: absolute;
        right: 0;
        height: ${({ theme }) => theme.spaces.micro};
        transform: translateY(${({ theme }) => `-${theme.spaces.micro}`});
        transition: transform ${({ theme }) => theme.transitions.short}
          cubic-bezier(0.23, 1, 0.32, 1);
        width: 100%;
      }
    }
  }
`;

export default MobileNavbar;
