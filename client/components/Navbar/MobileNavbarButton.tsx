import * as React from "react";

import styled, { css, keyframes } from "styled-components";

import FocusTrap from "focus-trap-react";
import MobileNavbarTray from "./MobileNavbarTray";

const BUTTON_NAME_LABEL = "Navbar button";
const CLOSED_ARIA_LABEL = "Click to open the mobile navbar menu";
const OPEN_ARIA_LABEL = "Click to close the mobile navbar menu";

interface Props {
  currentPath: string;
}

function MobileNavbarButton({ currentPath }: Props) {
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);
  const [withAnimation, setWithAnimation] = React.useState<boolean>(false);

  const handleOnClick = () => {
    setWithAnimation(true);
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <RootStyles isMenuOpen={isMenuOpen} withAnimation={withAnimation}>
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
  withAnimation: boolean;
}

const RootStyles = styled.div<StyleProps>`
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
        top: 20%;
        transition: top var(--transition-short) cubic-bezier(0.23, 1, 0.32, 1),
          transform var(--transition-short) cubic-bezier(0.23, 1, 0.32, 1);
        width: 100%;

        ${({ isMenuOpen, withAnimation }) => {
          if (!withAnimation) {
            return "";
          } else if (isMenuOpen) {
            return css`
              animation: ${topMenuBarAnimationForwards} var(--transition-medium)
                cubic-bezier(0.23, 1, 0.32, 1) forwards;
            `;
          }

          return css`
            animation: ${topMenuBarAnimationReverse} var(--transition-medium)
              cubic-bezier(0.23, 1, 0.32, 1) forwards;
          `;
        }}
      }

      > div:last-child {
        background-color: var(--text);
        border-radius: var(--border-radius-large);
        bottom: 20%;
        left: 0;
        position: absolute;
        right: 0;
        height: var(--space-micro);
        transition: bottom var(--transition-short)
            cubic-bezier(0.23, 1, 0.32, 1),
          transform var(--transition-short) cubic-bezier(0.23, 1, 0.32, 1);
        width: 100%;

        ${({ isMenuOpen, withAnimation }) => {
          if (!withAnimation) {
            return "";
          } else if (isMenuOpen) {
            return css`
              animation: ${bottomMenuBarAnimationForwards}
                var(--transition-medium) cubic-bezier(0.23, 1, 0.32, 1) forwards;
            `;
          }

          return css`
            animation: ${bottomMenuBarAnimationReverse} var(--transition-medium)
              cubic-bezier(0.23, 1, 0.32, 1) forwards;
          `;
        }}
      }
    }
  }
`;

// The duplication here is in order to get the CSS animations to run. It's not enough just to
// reverse the animation-fill-mode. They must be different animations.
const topMenuBarAnimationForwards = keyframes`
  0% {
    top: 20%;
  }
  100% {
    top: calc(50% - var(--space-micro) / 2);
    transform: rotate(40deg);
  }
`;

const topMenuBarAnimationReverse = keyframes`
  0% {
    top: calc(50% - var(--space-micro) / 2);
    transform: rotate(40deg);
  }
  100% {
    top: 20%;
  }
`;

const bottomMenuBarAnimationForwards = keyframes`
  0% {
    bottom: 20%;
  }
  100% {
    bottom: calc(50% - var(--space-micro) / 2);
    transform: rotate(-40deg);
  }
`;

const bottomMenuBarAnimationReverse = keyframes`
  0% {
    bottom: calc(50% - var(--space-micro) / 2);
    transform: rotate(-40deg);
  }
  100% {
    bottom: 20%;
  }
`;

export default MobileNavbarButton;
