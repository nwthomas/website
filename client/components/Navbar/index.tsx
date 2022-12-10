import {
  BLOG_PAGE,
  CONTACT_PAGE,
  HOME_PAGE,
  PROJECTS_PAGE,
} from "../../constants/routes";

import Link from "next/link";
import ThemeTransitionSwitch from "../ThemeTransitionSwitch";
import styled from "styled-components";

function Navbar() {
  return (
    <RootStyles>
      <header>
        <div>
          <div>
            <Link href={HOME_PAGE} passHref>
              <img
                alt="Go to home page"
                draggable={false}
                height={400}
                src="/nathan-thomas-pfp.jpg"
                width={400}
              />
            </Link>
          </div>
          <nav>
            <ul>
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
            </ul>
          </nav>
        </div>
      </header>
    </RootStyles>
  );
}

const RootStyles = styled.div`
  display: flex;
  background: ${({ theme }) => theme.colors.transparent};
  left: 0;
  padding: ${({ theme }) =>
    `0 calc(${theme.appDimensions.appHorizontalGutters} - ${theme.spaces.small} - 2px)`};
  position: absolute;
  justify-content: center;
  right: 0;
  top: 0;
  width: 100%;
  z-index: 1;

  > header {
    background: ${({ theme }) => theme.colors.bodyBackground};
    align-items: center;
    display: flex;
    justify-content: center;
    max-width: ${({ theme }) =>
      `calc(${theme.appDimensions.appMaxWidth} + ${theme.spaces.small} + 2px)`};
    padding: ${({ theme }) =>
      `${theme.spaces.small} 0 calc(${theme.spaces.large} - ${theme.spaces.small})`};
    width: 100%;

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.tablet}) {
      padding: ${({ theme }) =>
        `calc(${theme.spaces.xxLarge}  - ${theme.spaces.small}) 0`};
    }

    > div {
      background-: ${({ theme }) => theme.colors.bodyBackgroundAccent};
      border: ${({ theme }) =>
        `${theme.spaces.nano} solid ${theme.colors.transparent}`};
      border-radius: ${({ theme }) => theme.borderRadii.infinity};
      display: flex;
      justify-content: space-between;
      padding: ${({ theme }) => theme.spaces.small};
      transition: border-color ${({ theme }) => theme.transitions.short}
        ease-in-out;
      width: 100%;

      > div,
      nav {
        align-items: center;
        display: flex;
        justify-content: center;

        img {
          border-radius: ${({ theme }) => theme.borderRadii.infinity};
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

      > nav > ul {
        display: flex;

        > li {
          align-items: center;
          display: flex;
          line-height: 1;
          list-style-type: none;
          margin-left: ${({ theme }) => theme.spaces.medium};
          justify-content: center;

          @media only screen and (min-width: ${({ theme }) =>
              theme.breakpoints.tablet}) {
            margin-left: ${({ theme }) => theme.spaces.large};
          }

          > a:focus {
            outline: none;
            text-decoration-color: ${({ theme }) => theme.colors.textSecondary};
          }
        }
      }
    }
  }
`;

export default Navbar;
