import Link from "next/link";
import { ThemeEnum } from "../../hooks/useGetPreferredTheme";
import ThemeTransitionSwitch from "../ThemeTransitionSwitch";
import styled from "styled-components";

interface Props {
  currentTheme: ThemeEnum | null;
  onThemeChangeClick: () => void;
}

function Navbar({ currentTheme, onThemeChangeClick }: Props) {
  return (
    <RootStyles>
      <header>
        <div>
          <div>
            <Link href="/" passHref>
              <img
                alt="Go to home page"
                draggable={false}
                height={400}
                src={`./nathan-thomas-pfp.jpg`}
                width={400}
              />
            </Link>
          </div>
          <nav>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/projects">Projects</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li>
                <ThemeTransitionSwitch
                  currentTheme={currentTheme}
                  onClick={onThemeChangeClick}
                />
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
    `0 calc(${theme.appDimensions.appHorizontalGutters} - ${theme.spaces.small})`};
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
      `calc(${theme.appDimensions.appMaxWidth} + ${theme.spaces.small})`};
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
      width: 100%;

      > div,
      nav {
        align-items: center;
        display: flex;
        justify-content: center;

        img {
          transition: opacity ${({ theme }) => theme.transitions.medium}
            ease-in-out;

          &:hover {
            opacity: ${({ theme }) => theme.opacity.opacity80};
          }
        }

        img {
          border-radius: ${({ theme }) => theme.borderRadii.infinity};
          cursor: pointer;
          height: 50px;
          user-select: none;
          width: 50px;
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
        }
      }
    }
  }
`;

export default Navbar;
