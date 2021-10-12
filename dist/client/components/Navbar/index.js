"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = __importDefault(require("styled-components"));
const link_1 = __importDefault(require("next/link"));
const ThemeTransitionSwitch_1 = __importDefault(require("../ThemeTransitionSwitch"));
function Navbar({ currentTheme, onThemeChangeClick }) {
    const isWeb3Deploy = !!process.env.NEXT_PUBLIC_WITH_WEB3;
    return (<RootStyles isWeb3Deploy={isWeb3Deploy}>
      <header>
        <div>
          <link_1.default href="/">Nathan Thomas</link_1.default>
          {isWeb3Deploy ? <p>.eth</p> : null}
        </div>
        <nav>
          {process.env.NEXT_PUBLIC_WITH_THEME_CHANGE ? (<ThemeTransitionSwitch_1.default currentTheme={currentTheme} onClick={onThemeChangeClick}/>) : null}
          <div>
            <link_1.default href="/work">Work</link_1.default>
          </div>
          <div>
            <link_1.default href="/contact">Contact</link_1.default>
          </div>
        </nav>
      </header>
    </RootStyles>);
}
const RootStyles = styled_components_1.default.div `
  display: flex;
  background: ${({ theme }) => theme.colors.bodyBackground};
  height: ${({ theme }) => theme.appDimensions.navbarHeight};
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
    height: ${({ theme }) => theme.appDimensions.navbarHeight};
    justify-content: space-between;
    max-width: ${({ theme }) => theme.appDimensions.appMaxWidth};
    width: 100%;

    > div {
      > p {
        margin-left: ${({ theme }) => `calc(${theme.spaces.nano} * 2)`};
        opacity: 0;
        transition: opacity ${({ theme }) => theme.transitions.medium}
          ease-in-out;
        user-select: none;

        @media only screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
          margin-left: ${({ theme }) => `calc(${theme.spaces.nano} * 3)`};
        }

        @media only screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
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
      height: ${({ theme }) => theme.appDimensions.navbarHeight};
      justify-content: center;

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

      @media only screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
        margin-left: ${({ theme }) => theme.spaces.large};
      }
    }
  }
`;
exports.default = Navbar;
//# sourceMappingURL=index.js.map