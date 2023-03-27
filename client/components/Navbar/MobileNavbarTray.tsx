import {
  BLOG_LINK_ARIA_LABEL,
  CONTACT_LINK_ARIA_LABEL,
  HOME_LINK_ARIA_LABEL,
  PLAYGROUND_LINK_ARIA_LABEL,
} from "../../constants/ariaLabels";
import {
  BLOG_PAGE,
  CONTACT_PAGE,
  HOME_PAGE,
  PLAYGROUND_PAGE,
} from "../../constants/routes";

import NavbarLink from "./NavbarLink";
import ThemeTransitionSwitch from "../ThemeTransitionSwitch";
import styled from "styled-components";
import { useLockBodyScroll } from "../../hooks";

interface Props {
  currentPath: string;
}

function MobileNavbarTray({ currentPath }: Props) {
  useLockBodyScroll();

  return (
    <RootStyles>
      <nav>
        <ul>
          <li>
            <NavbarLink
              ariaLabel={HOME_LINK_ARIA_LABEL}
              currentPath={currentPath}
              route={HOME_PAGE}
            >
              Home
            </NavbarLink>
          </li>
          <li>
            <NavbarLink
              ariaLabel={PLAYGROUND_LINK_ARIA_LABEL}
              currentPath={currentPath}
              route={PLAYGROUND_PAGE}
            >
              Playground
            </NavbarLink>
          </li>
          <li>
            <NavbarLink
              ariaLabel={BLOG_LINK_ARIA_LABEL}
              currentPath={currentPath}
              route={BLOG_PAGE}
            >
              Blog
            </NavbarLink>
          </li>
          <li>
            <NavbarLink
              ariaLabel={CONTACT_LINK_ARIA_LABEL}
              currentPath={currentPath}
              route={CONTACT_PAGE}
            >
              Contact
            </NavbarLink>
          </li>
          <li>
            <ThemeTransitionSwitch />
          </li>
        </ul>
      </nav>
    </RootStyles>
  );
}

const RootStyles = styled.div`
  backdrop-filter: blur(var(--space-xxsmall));
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  /* https://graffino.com/til/CjT2jrcLHP-how-to-fix-filter-blur-performance-issue-in-safari */
  transform: translate3d(0, 0, 0);

  &::before {
    background-color: var(--body-bg);
    bottom: 0;
    content: "";
    backdrop-filter: blur(10px);
    left: 0;
    opacity: 0.9;
    position: fixed;
    right: 0;
    top: 0;
    z-index: -1;
  }

  > nav {
    padding-top: var(--navbar-mobile-height);
    padding-right: var(--app-horizontal-gutters);
    width: 100%;

    > ul {
      align-items: flex-end;
      display: flex;
      flex-direction: column;
      margin-top: var(--space-xsmall);
      width: 100%;

      > li {
        list-style-type: none;
        margin-bottom: var(--space-medium);

        a {
          font-family: "Libre Baskerville", Constantia, "Lucida Bright",
            Lucidabright, "Lucida Serif", Lucida, "DejaVu Serif",
            "Bitstream Vera Serif", "Liberation Serif", Georgia, serif;
          font-size: 3.5rem;
          font-weight: bold;
          line-height: 1;
        }
      }

      > li:last-child {
        margin-top: var(--space-xxsmall);
      }
    }
  }
`;

export default MobileNavbarTray;
