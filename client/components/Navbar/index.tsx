import styled from "styled-components";
import Link from "next/link";
import ThemeTransitionSwitch from "../ThemeTransitionSwitch";
import { ThemeEnum } from "../../styles/libs/theme";

interface Props {
  currentTheme: ThemeEnum;
  onThemeChangeClick: () => void;
}

function Navbar({ currentTheme, onThemeChangeClick }: Props) {
  const isWeb3Deploy = !!process.env.NEXT_PUBLIC_WITH_WEB3;

  return (
    <RootStyles isWeb3Deploy={isWeb3Deploy}>
      <header>
        <div>
          <Link href="/">Nathan Thomas</Link>
          {isWeb3Deploy ? <p>.eth</p> : null}
        </div>
        <nav>
          {process.env.NEXT_PUBLIC_WITH_THEME_CHANGE ? (
            <ThemeTransitionSwitch
              currentTheme={currentTheme}
              onClick={onThemeChangeClick}
            />
          ) : null}
          <div>
            <Link href="/work">Work</Link>
          </div>
          <div>
            <Link href="/contact">Contact</Link>
          </div>
        </nav>
      </header>
    </RootStyles>
  );
}

interface StyleProps {
  isWeb3Deploy: boolean;
}

const RootStyles = styled.div<StyleProps>`
  display: flex;
  background: ${({ theme }) => theme.colors.bodyBackground};
  height: ${({ theme }) => theme.appDimensions.navbarMobileHeight};
  left: 0;
  padding: ${({ theme }) => `0 ${theme.appDimensions.appHorizontalGutters}`};
  position: absolute;
  justify-content: center;
  right: 0;
  top: 0;
  width: 100%;
  z-index: 1;

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpoints.tablet}) {
    height: ${({ theme }) => theme.appDimensions.navbarDesktopHeight};
  }

  > header {
    align-items: center;
    display: flex;
    height: ${({ theme }) => theme.appDimensions.navbarMobileHeight};
    justify-content: space-between;
    max-width: ${({ theme }) => theme.appDimensions.appMaxWidth};
    width: 100%;

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.tablet}) {
      height: ${({ theme }) => theme.appDimensions.navbarDesktopHeight};
    }

    > div {
      > p {
        margin-left: ${({ theme }) => `calc(${theme.spaces.nano} * 2)`};
        opacity: 0;
        transition: opacity ${({ theme }) => theme.transitions.medium}
          ease-in-out;
        user-select: none;

        @media only screen and (min-width: ${({ theme }) =>
            theme.breakpoints.tablet}) {
          margin-left: ${({ theme }) => `calc(${theme.spaces.nano} * 3)`};
        }

        @media only screen and (min-width: ${({ theme }) =>
            theme.breakpoints.desktop}) {
          margin-left: ${({ theme }) => `calc(${theme.spaces.nano} * 4)`};
        }
      }

      &:hover {
        > p {
          opacity: ${({ theme }) => theme.opacity.opacity100};
        }
      }
    }

    > div,
    nav {
      align-items: center;
      display: flex;
      height: ${({ theme }) => theme.appDimensions.navbarMobileHeight};
      justify-content: center;

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.tablet}) {
        height: ${({ theme }) => theme.appDimensions.navbarDesktopHeight};
      }

      a {
        transition: opacity ${({ theme }) => theme.transitions.medium}
          ease-in-out;

        &:hover {
          opacity: ${({ theme }) => theme.opacity.opacity70};
        }
      }
    }

    > nav > div {
      align-items: center;
      display: flex;
      margin-left: ${({ theme }) => theme.spaces.medium};
      justify-content: center;

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.tablet}) {
        margin-left: ${({ theme }) => theme.spaces.large};
      }
    }
  }
`;

export default Navbar;
