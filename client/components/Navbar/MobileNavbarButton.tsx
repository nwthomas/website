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
  height: calc(var(--space-xxsmall) * 3);
  position: relative;
  width: calc(var(--space-xxsmall) * 6);

  > div {
    height: calc(var(--space-xxsmall) * 3);
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
      outline-offset: var(--space-micro);
      padding: 0;
      position: absolute;
      width: 100%;
      z-index: 2147483647;

      > div:first-child {
        background-color: var(--text);
        border-radius: var(--space-large);
        height: var(--space-micro);
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        transform: translateY(
            ${({ isMenuOpen }) => {
              if (!isMenuOpen) {
                return "var(--space-micro)";
              }

              return "calc(var(--space-nano))";
            }}
          )
          rotate(25deg);
        transform-origin: top left;
        transition: transform var(--transition-short)
          cubic-bezier(0.23, 1, 0.32, 1);
        width: 100%;
      }

      > div:last-child {
        background-color: var(--text);
        border-radius: var(--border-radius-large);
        bottom: 0;
        left: 0;
        position: absolute;
        right: 0;
        height: var(--space-micro);
        transform: translateY(
            ${({ isMenuOpen }) => {
              if (!isMenuOpen) {
                return `calc(var(--space-micro) * -1)`;
              }

              return "var(--space-nano)";
            }}
          )
          rotate(-25deg);
        transform-origin: top left;
        transition: transform var(--transition-short)
          cubic-bezier(0.23, 1, 0.32, 1);
        width: 100%;
      }
    }
  }
`;

export default MobileNavbarButton;
