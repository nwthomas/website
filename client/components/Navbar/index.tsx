import * as React from "react";

import { BLOG_PAGE, CONTACT_PAGE } from "../../constants/routes";

import { CONTENTS_ID } from "../../constants/routes";
import { HOME_PAGE } from "../../constants/routes";
import Link from "next/link";
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
            <div>
              <li>
                <Link href={HOME_PAGE} passHref>
                  <div />
                </Link>
              </li>
            </div>
            <li>
              <a href={`#${CONTENTS_ID}`}>Skip to Content</a>
            </li>
            <div>
              <li>
                <NavbarLink currentPath={currentPath} route={BLOG_PAGE}>
                  Blog
                </NavbarLink>
              </li>
              <li>
                <NavbarLink currentPath={currentPath} route={CONTACT_PAGE}>
                  Contact
                </NavbarLink>
              </li>
              <li>
                <ThemeTransitionSwitch />
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
  padding: ${({ theme }) => `0 ${theme.appDimensions.appHorizontalGutters}`};
  position: absolute;
  justify-content: center;
  right: 0;
  top: 0;
  width: 100%;
  z-index: 1;

  > header {
    align-items: center;
    display: flex;
    justify-content: center;
    max-width: ${({ theme }) => theme.appDimensions.appMaxWidth};
    padding: ${({ theme }) => `${theme.spaces.medium} 0 `};
    width: 100%;

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.tablet}) {
      padding: ${({ theme }) => `${theme.spaces.xxLarge} 0`};
    }

    > nav {
      align-items: center;
      display: flex;
      justify-content: center;
      width: 100%;

      > ul {
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
            left: ${({ theme }) =>
              `calc(${theme.spaces.xLarge} + ${theme.spaces.micro})`};
            position: absolute;
            overflow: hidden;
            top: 0;
            transform: translateY(-1000%);
            z-index: 1000;

            @media only screen and (min-width: ${({ theme }) =>
                theme.breakpoints.tablet}) {
              left: ${({ theme }) => theme.spaces.xxLarge};
            }

            :focus {
              outline: none;
              text-decoration-color: ${({ theme }) =>
                theme.colors.textSecondary};
              transform: translateY(0%);
            }
          }
        }

        > div {
          align-items: center;
          display: flex;
          justify-content: center;

          li {
            align-items: center;
            display: flex;
            list-style-type: none;
            margin-left: ${({ theme }) => theme.spaces.small};
            justify-content: center;

            @media only screen and (min-width: ${({ theme }) =>
                theme.breakpoints.mini}) {
              margin-left: ${({ theme }) => theme.spaces.medium};
            }

            @media only screen and (min-width: ${({ theme }) =>
                theme.breakpoints.tablet}) {
              margin-left: ${({ theme }) => theme.spaces.large};
            }

            > a {
              &:has(div) {
                border-radius: ${({ theme }) => theme.borderRadii.nano};
                display: flex;
                overflow: hidden;

                &:focus,
                &:active {
                  outline-color: ${({ theme }) => theme.colorsHex.pictonBlue};
                  outline-style: solid;
                  outline-width: ${({ theme }) => theme.spaces.nano};
                }
              }

              div {
                background-color: ${({ theme }) => theme.colors.text};
                height: ${({ theme }) => theme.spaces.large};
                width: ${({ theme }) => theme.spaces.large};
              }
            }
          }

          li:nth-child(1) {
            margin-left: 0;
          }
        }
      }
    }
  }
`;

export default Navbar;
