import { BLOG_PAGE, CONTACT_PAGE, PROJECTS_PAGE } from "../../constants/routes";

import { HOME_PAGE } from "../../constants/routes";
import Link from "next/link";
import React from "react";
import ThemeTransitionSwitch from "../ThemeTransitionSwitch";
import styled from "styled-components";

function DesktopNavbar() {
  return (
    <RootStyles>
      <header>
        <nav>
          <ul>
            <div>
              <li>
                <a href={HOME_PAGE}>
                  <img
                    alt="Go to home page"
                    draggable={false}
                    height={400}
                    src="/nathan-thomas-pfp.jpg"
                    width={400}
                  />
                </a>
              </li>
            </div>
            <div>
              <li>
                <Link href={BLOG_PAGE}>Blog</Link>
              </li>
              <li>
                <Link href={PROJECTS_PAGE}>Projects</Link>
              </li>
              <li>
                <Link href={CONTACT_PAGE}>Contact</Link>
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
        width: 100%;

        > div {
          align-items: center;
          display: flex;
          justify-content: center;

          li {
            align-items: center;
            display: flex;
            line-height: 1;
            list-style-type: none;
            margin-left: ${({ theme }) => theme.spaces.small};
            justify-content: center;

            @media only screen and (min-width: ${({ theme }) =>
                theme.breakpoints.tablet}) {
              margin-left: ${({ theme }) => theme.spaces.large};
            }

            > a {
              &:has(img) {
                border-radius: ${({ theme }) => theme.borderRadii.infinity};
              }

              > img {
                border-radius: ${({ theme }) => theme.borderRadii.infinity};
                display: flex;
                cursor: pointer;
                height: 50px;
                transition: opacity ${({ theme }) => theme.transitions.medium}
                  ease-in-out;
                user-select: none;
                width: 50px;

                &:hover {
                  opacity: ${({ theme }) => theme.opacity.opacity80};
                }
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

export default DesktopNavbar;
