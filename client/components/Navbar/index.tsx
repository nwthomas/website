import * as React from "react";

import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import styled from "styled-components";
import { useScrollPosition } from "../../hooks";

function Navbar() {
  const scrollPosition = useScrollPosition();
  const withMinifiedNavbar = scrollPosition > 0;

  return (
    <RootStyles withMinifiedNavbar={withMinifiedNavbar}>
      <header>
        <div>
          <MobileNavbar />
        </div>
        <div>
          <DesktopNavbar />
        </div>
      </header>
    </RootStyles>
  );
}

interface StyleProps {
  withMinifiedNavbar?: boolean;
}

const RootStyles = styled.div<StyleProps>`
  border-bottom: var(--space-nano) solid transparent;
  display: flex;
  left: 0;
  padding: 0 var(--app-horizontal-gutters);
  position: fixed;
  justify-content: center;
  right: 0;
  top: 0;
  transition: border-bottom var(--transition-medium) ease-in-out;
  width: 100%;
  z-index: 10;

  ${({ withMinifiedNavbar }) => {
    if (withMinifiedNavbar) {
      return `
        border-bottom: var(--space-nano) solid var(--body-bg-accent-two);
      `;
    }
  }}

  &::before {
    backdrop-filter: blur(15px);
    background-color: var(--body-bg-blur);
    bottom: 0;
    content: "";
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    z-index: -1;
  }

  > header {
    align-items: center;

    display: flex;
    height: var(--navbar-mobile-height);
    justify-content: center;
    max-width: var(--app-max-width);
    transition: height var(--transition-medium) ease-in-out;
    width: 100%;

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.tablet}) {
      ${({ withMinifiedNavbar }) => {
        if (withMinifiedNavbar) {
          return "";
        }

        return "height: var(--navbar-desktop-height)";
      }};
    }

    > div {
      width: 100%;
    }

    > div:last-child {
      display: none;
    }

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.tablet}) {
      > div:first-child {
        display: none;
      }

      > div:last-child {
        display: block;
      }
    }
  }
`;

export default Navbar;
