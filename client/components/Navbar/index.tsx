import * as React from "react";

import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import styled from "styled-components";

function Navbar() {
  return (
    <RootStyles>
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

const RootStyles = styled.div`
  display: flex;
  left: 0;
  padding: 0 var(--app-horizontal-gutters);
  position: absolute;
  justify-content: center;
  right: 0;
  top: 0;
  width: 100%;
  z-index: 2147483647;

  > header {
    align-items: center;
    display: flex;
    justify-content: center;
    max-width: var(--app-max-width);
    padding: var(--space-medium) 0;
    width: 100%;

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.tablet}) {
      padding: var(--space-xxlarge) 0;
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
