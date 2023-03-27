import * as React from "react";

import FocusTrap from "focus-trap-react";
import MobileNavbarTray from "./MobileNavbarTray";
import styled from "styled-components";

const BUTTON_NAME_LABEL = "Navbar button";
const CLOSED_ARIA_LABEL = "Click to open the mobile navbar menu";
const OPEN_ARIA_LABEL = "Click to close the mobile navbar menu";

interface Props {
  currentPath: string;
}

function MobileNavbarButton({ currentPath }: Props) {
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);

  const handleOnClick = () => setIsMenuOpen(!isMenuOpen);

  return (
    <RootStyles isMenuOpen={isMenuOpen}>
      <FocusTrap active={isMenuOpen}>
        <div>
          <button
            aria-label={isMenuOpen ? OPEN_ARIA_LABEL : CLOSED_ARIA_LABEL}
            name={BUTTON_NAME_LABEL}
            onClick={handleOnClick}
            type="button"
          >
            <div />
            <div />
          </button>
          {isMenuOpen ? <MobileNavbarTray currentPath={currentPath} /> : null}
        </div>
      </FocusTrap>
    </RootStyles>
  );
}

interface StyleProps {
  isMenuOpen: boolean;
}

const RootStyles = styled.div<StyleProps>`
  height: ${({ theme }) => `calc(${theme.spaces.xxSmall} * 3)`};
  position: relative;
  width: ${({ theme }) => `calc(${theme.spaces.xxSmall} * 7)`};

  > div {
    height: ${({ theme }) => `calc(${theme.spaces.xxSmall} * 3)`};
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
        transform: translateY(
          ${({ isMenuOpen, theme }) => {
            if (!isMenuOpen) {
              return theme.spaces.micro;
            }

            return `none`;
          }}
        );
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
        transform: translateY(
          ${({ isMenuOpen, theme }) => {
            if (!isMenuOpen) {
              return `-${theme.spaces.micro}`;
            }

            return "none";
          }}
        );
        transition: transform ${({ theme }) => theme.transitions.short}
          cubic-bezier(0.23, 1, 0.32, 1);
        width: 100%;
      }
    }
  }
`;

export default MobileNavbarButton;
