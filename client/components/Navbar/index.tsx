import * as React from "react";

import {
  BLOG_LINK_ARIA_LABEL,
  CONTACT_LINK_ARIA_LABEL,
  HOME_LINK_ARIA_LABEL,
  PLAYGROUND_LINK_ARIA_LABEL,
  SKIP_TO_CONTENT_ARIA_LABEL,
} from "../../constants/ariaLabels";
import {
  BLOG_PAGE,
  CONTACT_PAGE,
  HOME_PAGE,
  PLAYGROUND_PAGE,
} from "../../constants/routes";

import { CONTENTS_ID } from "../../constants/routes";
import MobileNavbarButton from "./MobileNavbarButton";
import NavbarLink from "./NavbarLink";
import ThemeTransitionSwitch from "../ThemeTransitionSwitch";
import styled from "styled-components";
import { useRouter } from "next/router";

function Navbar() {
  const { asPath: currentPath } = useRouter();

  return (
    <RootStyles>
      <header>
        <nav>
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
              <a
                aria-label={SKIP_TO_CONTENT_ARIA_LABEL}
                href={`#${CONTENTS_ID}`}
              >
                Skip to Content
              </a>
            </li>
            <div className="desktop-navbar">
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
            </div>
            <div className="mobile-navbar">
              <li>
                <MobileNavbarButton currentPath={currentPath} />
              </li>
            </div>
          </ul>
        </nav>
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

    > nav {
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

        /* I'm not particularly happy about these navbar classes. It will be refactored someday. */
        .desktop-navbar {
          display: none;
        }

        @media only screen and (min-width: ${({ theme }) =>
            theme.breakpoints.tablet}) {
          .desktop-navbar {
            display: flex;
          }

          .mobile-navbar {
            display: none;
          }
        }

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

            @media only screen and (min-width: ${({ theme }) =>
                theme.breakpoints.tablet}) {
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

            @media only screen and (min-width: ${({ theme }) =>
                theme.breakpoints.mini}) {
              margin-left: var(--space-medium);
            }

            @media only screen and (min-width: ${({ theme }) =>
                theme.breakpoints.tablet}) {
              margin-left: var(--space-large);
            }
          }

          > li:nth-child(1) {
            margin-left: 0;
          }
        }
      }
    }
  }
`;

export default Navbar;
