"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = __importDefault(require("styled-components"));
const BabyYoda_1 = __importDefault(require("../EasterEggs/BabyYoda"));
function Footer() {
    return (<RootStyles>
      <footer>
        <div>
          <a href="https://dev.to/nwthomas" aria-label="Link to Dev.to" rel="noopener noreferrer" target="_target">
            Dev.to
          </a>
          <a href="https://github.com/nwthomas" aria-label="Link to GitHub" rel="noopener noreferrer" target="_target">
            Github
          </a>
        </div>
        <div>
          <a href="https://www.instagram.com/nwthomas/" aria-label="Link to Instagram" rel="noopener noreferrer" target="_target">
            Instagram
          </a>
          <a href="https://www.linkedin.com/in/nwthomas-dev/" aria-label="Link to LinkedIn" rel="noopener noreferrer" target="_target">
            LinkedIn
          </a>
        </div>
        <div>
          <a href="https://www.polywork.com/nwthomas" aria-label="Link to Polywork" rel="noopener noreferrer" target="_target">
            Polywork
          </a>
          <a href="https://twitter.com/nwthomas_" aria-label="Link to Twitter" rel="noopener noreferrer" target="_target">
            Twitter
          </a>
        </div>
      </footer>
      <BabyYoda_1.default />
    </RootStyles>);
}
const RootStyles = styled_components_1.default.div `
  align-items: center;
  bottom: 0;
  display: flex;
  height: ${({ theme }) => theme.appDimensions.footerMobileHeight};
  justify-content: center;
  position: absolute;
  padding: 0 ${({ theme }) => theme.appDimensions.appHorizontalGutters};
  width: 100%;

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: ${({ theme }) => theme.appDimensions.footerDesktopHeight};
  }

  > footer {
    display: flex;
    flex-direction: column;
    flex: wrap;
    justify-content: flex-start;
    max-width: ${({ theme }) => theme.appDimensions.appMaxWidth};
    width: 100%;

    @media only screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
      align-items: center;
      flex-direction: row;
    }

    > div {
      display: flex;
      flex-direction: column;
      margin-right: ${({ theme }) => theme.spaces.large};

      @media only screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
        margin-right: ${({ theme }) => theme.spaces.jumbo};
      }

      @media only screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
        margin-right: ${({ theme }) => `calc(${theme.spaces.xxLarge} * 3)`};
      }

      > a {
        cursor: pointer;
        margin-bottom: ${({ theme }) => theme.spaces.medium};
        max-width: 180px;
        transition: opacity ${({ theme }) => theme.transitions.medium}
          ease-in-out;

        @media only screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
          font-weight: bold;
        }

        @media only screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
          font-size: 3rem;
        }

        &:hover {
          opacity: ${({ theme }) => theme.opacity.opacity80};
        }
      }
    }
  }
`;
exports.default = Footer;
//# sourceMappingURL=index.js.map