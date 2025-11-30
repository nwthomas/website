import {
  BLOG_LINK_ARIA_LABEL,
  CONTACT_LINK_ARIA_LABEL,
  HOME_LINK_ARIA_LABEL,
  SKIP_TO_CONTENT_ARIA_LABEL,
} from "../../constants/ariaLabels";
import { BLOG_PAGE, BOOKMARKS_PAGE, CONTACT_PAGE, HOME_PAGE } from "../../constants/routes";

import { CONTENTS_ID } from "../../constants/routes";
import NavbarLink from "./NavbarLink";
import ThemeTransitionSwitch from "../ThemeTransitionSwitch";
import styled from "@emotion/styled";

function DesktopNavbar() {
  return (
    <RootStyles>
      <ul>
        <li>
          <NavbarLink ariaLabel={HOME_LINK_ARIA_LABEL} route={HOME_PAGE}>
            Nathan Thomas
          </NavbarLink>
        </li>
        <li>
          <a aria-label={SKIP_TO_CONTENT_ARIA_LABEL} href={`#${CONTENTS_ID}`}>
            Skip to Content
          </a>
        </li>
        <div>
          <li>
            <NavbarLink ariaLabel={BLOG_LINK_ARIA_LABEL} route={BLOG_PAGE}>
              Blog
            </NavbarLink>
          </li>
          <li>
            <NavbarLink ariaLabel={BOOKMARKS_PAGE} route={BOOKMARKS_PAGE}>
              Bookmarks
            </NavbarLink>
          </li>
          <li>
            <NavbarLink ariaLabel={CONTACT_LINK_ARIA_LABEL} route={CONTACT_PAGE}>
              Contact
            </NavbarLink>
          </li>
          <li>
            <ThemeTransitionSwitch />
          </li>
        </div>
      </ul>
    </RootStyles>
  );
}

const RootStyles = styled.nav`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;

  > ul {
    align-items: center;
    display: flex;
    justify-content: space-between;
    position: relative;
    width: 100%;

    /* These styles are for the hidden content button */
    > li {
      list-style-type: none;

      > a {
        align-items: center;
        display: flex;
        height: 100%;
        left: calc(var(--space-large) * 3);
        position: absolute;
        overflow: hidden;
        top: 0;
        transform: translateY(-1000%);
        z-index: 1000;

        @media only screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
          left: calc(var(--space-large) * 4);
        }

        :focus {
          transform: translateY(0%);
        }
      }
    }

    > div {
      align-items: center;
      display: flex;
      justify-content: center;

      > li {
        align-items: center;
        display: flex;
        list-style-type: none;
        margin-left: var(--space-small);
        justify-content: center;

        @media only screen and (min-width: ${({ theme }) => theme.breakpoints.mini}) {
          margin-left: var(--space-medium);
        }

        @media only screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
          margin-left: var(--space-large);
        }
      }

      > li:nth-child(1) {
        margin-left: 0;
      }
    }
  }
`;

export default DesktopNavbar;
