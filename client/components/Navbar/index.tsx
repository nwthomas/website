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
          <Link href="/">Nathan Thomas</Link>
        </div>
        <nav>
          <ul>
            <li>
              <ThemeTransitionSwitch
                currentTheme={currentTheme}
                onClick={onThemeChangeClick}
              />
            </li>
            <li>
              <Link href="/projects">Projects</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
      </header>
    </RootStyles>
  );
}

const RootStyles = styled.div`
  display: flex;
  background: ${({ theme }) => theme.colors.transparent};
  left: 0;
  padding: ${({ theme }) => `0 ${theme.appDimensions.appHorizontalGutters}`};
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
    justify-content: space-between;
    max-width: ${({ theme }) => theme.appDimensions.appMaxWidth};
    padding: ${({ theme }) => `${theme.spaces.large} 0`};
    width: 100%;

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.tablet}) {
      padding: ${({ theme }) => `${theme.spaces.xxLarge} 0`};
    }

    > div,
    nav {
      align-items: center;
      display: flex;
      justify-content: center;

      a {
        transition: opacity ${({ theme }) => theme.transitions.medium}
          ease-in-out;

        &:hover {
          opacity: ${({ theme }) => theme.opacity.opacity70};
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
      }
    }
  }
`;

export default Navbar;
