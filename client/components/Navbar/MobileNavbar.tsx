import * as React from "react";

import {
  NAVBAR_CLOSED_ARIA_LABEL,
  NAVBAR_OPEN_ARIA_LABEL,
} from "../../constants/ariaLabels";
import styled, { css, keyframes } from "styled-components";

import FocusTrap from "focus-trap-react";
import { HOME_LINK_ARIA_LABEL } from "../../constants/ariaLabels";
import { HOME_PAGE } from "../../constants/routes";
import MobileNavbarTray from "./MobileNavbarTray";
import NavbarLink from "./NavbarLink";
import { useRouter } from "next/router";

export const NAVBAR_BUTTON_LABEL = "Navbar button";

function MobileNavbar() {
  const { asPath: currentPath } = useRouter();
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);
  const [withAnimation, setWithAnimation] = React.useState<boolean>(false);

  const handleOnClick = () => {
    setWithAnimation(true);
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <RootStyles isMenuOpen={isMenuOpen} withAnimation={withAnimation}>
      <ul>
        <li>
          <NavbarLink
            ariaLabel={HOME_LINK_ARIA_LABEL}
            currentPath={currentPath}
            route={HOME_PAGE}
          >
            Nathan Thomas
          </NavbarLink>
        </li>
        <li>
          <FocusTrap active={isMenuOpen}>
            <div>
              <button
                aria-label={
                  isMenuOpen ? NAVBAR_OPEN_ARIA_LABEL : NAVBAR_CLOSED_ARIA_LABEL
                }
                name={NAVBAR_BUTTON_LABEL}
                onClick={handleOnClick}
                type="button"
              >
                <div />
                <div />
              </button>
              {isMenuOpen ? (
                <MobileNavbarTray currentPath={currentPath} />
              ) : null}
            </div>
          </FocusTrap>
        </li>
      </ul>
    </RootStyles>
  );
}

interface StyleProps {
  isMenuOpen: boolean;
  withAnimation: boolean;
}

const RootStyles = styled.div<StyleProps>`
  height: 100%;
  width: 100%;

  > ul {
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: space-between;
    width: 100%;

    > li {
      list-style-type: none;
    }

    > li:last-child {
      list-style-type: none;

      > div {
        height: calc(var(--space-xxsmall) * 3);
        position: relative;
        width: calc(var(--space-xxsmall) * 6);

        button {
          background: none;
          border: none;
          color: inherit;
          cursor: pointer;
          display: flex;
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
            transition: top var(--transition-short)
                cubic-bezier(0.23, 1, 0.32, 1),
              transform var(--transition-short) cubic-bezier(0.23, 1, 0.32, 1);

            ${({ isMenuOpen, withAnimation }) => {
              if (!withAnimation) {
                return "";
              } else if (isMenuOpen) {
                return css`
                  animation: ${topMenuBarAnimationForwards}
                    var(--transition-short) cubic-bezier(0.23, 1, 0.32, 1)
                    forwards;
                `;
              }

              return css`
                animation: ${topMenuBarAnimationReverse} var(--transition-short)
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

            ${({ isMenuOpen, withAnimation }) => {
              if (!withAnimation) {
                return "";
              } else if (isMenuOpen) {
                return css`
                  animation: ${bottomMenuBarAnimationForwards}
                    var(--transition-short) cubic-bezier(0.23, 1, 0.32, 1)
                    forwards;
                `;
              }

              return css`
                animation: ${bottomMenuBarAnimationReverse}
                  var(--transition-short) cubic-bezier(0.23, 1, 0.32, 1)
                  forwards;
              `;
            }}
          }
        }
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
    transform: rotate(45deg);
  }
`;

const topMenuBarAnimationReverse = keyframes`
  0% {
    top: calc(50% - var(--space-micro) / 2);
    transform: rotate(45deg);
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
    transform: rotate(-45deg);
  }
`;

const bottomMenuBarAnimationReverse = keyframes`
  0% {
    bottom: calc(50% - var(--space-micro) / 2);
    transform: rotate(-45deg);
  }
  100% {
    bottom: 20%;
  }
`;

export default MobileNavbar;
