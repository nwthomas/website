"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const Layout_1 = __importDefault(require("../components/Layout"));
const Employers_1 = __importDefault(require("../components/Employers"));
const PAGE_NAME = "Home";
const Home = ({ currentTheme }) => {
    return (<Layout_1.default pageName={PAGE_NAME} withFooter>
      <RootStyles>
        <main>
          <section>
            <h1>
              Hey, I'm Nathan. 👋🏻 I'm a{" "}
              <a href="https://github.com/nwthomas" aria-label="Link to GitHub" rel="noopener noreferrer" target="_target">
                full stack software engineer
              </a>
              ,{" "}
              <a href="https://dev.to/nwthomas" aria-label="Link to writing on Dev.to" rel="noopener noreferrer" target="_target">
                writer
              </a>
              , and{" "}
              <a href="https://www.youtube.com/watch?v=GNrQTbIFsG4&t=2909s" aria-label="Link to presentation on YouTube" rel="noopener noreferrer" target="_target">
                teacher
              </a>
              . I love building with Bitcoin{" "}
              <a href="https://bitcoin.org/bitcoin.pdf" aria-label="Link to Bitcoin whitepaper" rel="noopener noreferrer" target="_target">
                <img src="./bitcoin-logo.png" alt="Bitcoin logo"/>
              </a>{" "}
              and Ethereum{" "}
              <a href="https://ethereum.org/" aria-label="Link to Ethereum.org" rel="noopener noreferrer" target="_target">
                <img src="./eth-icon.png" alt="Ethereum logo"/>
              </a>
              .
            </h1>
          </section>
          <Employers_1.default currentTheme={currentTheme}/>
        </main>
      </RootStyles>
    </Layout_1.default>);
};
const RootStyles = styled_components_1.default.div `
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => `0 ${theme.appDimensions.appHorizontalGutters}`};
  width: 100%;

  > main {
    max-width: ${({ theme }) => theme.appDimensions.appMaxWidth};
    width: 100%;

    > section {
      display: flex;

      @media only screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
        margin-top: ${({ theme }) => theme.spaces.large};
      }

      @media only screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
        margin-top: ${({ theme }) => theme.spaces.jumbo};
      }

      > div:nth-child(1) {
        width: 400px;
      }

      > h1 {
        background: ${({ theme }) => theme.colors.transparent};

        > a {
          background-clip: text;
          -moz-background-clip: text;
          -webkit-background-clip: text;
          background-size: 100%;
          font-size: inherit;
          -moz-text-fill-color: transparent;
          -webkit-text-fill-color: transparent;
        }

        > a:nth-child(1) {
          background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
        }

        > a:nth-child(2) {
          background-image: linear-gradient(120deg, #8ec5fc 0%, #7579ff 100%);
          background: -webkit-linear-gradient();
        }

        > a:nth-child(3) {
          background-image: linear-gradient(120deg, #7579ff 0%, #b224ef 100%);
          background: -webkit-linear-gradient();
        }

        > a:nth-child(4) > img {
          margin-left: -1px;
          margin-right: -1px;
          width: 18px;

          @media only screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
            width: 30px;
          }

          @media only screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
            width: 40px;
          }
        }

        > a:nth-child(5) > img {
          margin-left: -1px;
          width: 16px;

          @media only screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
            width: 25px;
          }

          @media only screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
            width: 35px;
          }
        }
      }
    }

    > section:nth-child(1) {
      margin-bottom: ${({ theme }) => `calc(${theme.appDimensions.navbarHeight} / 2)`};

      @media only screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
        margin-bottom: ${({ theme }) => `calc(${theme.spaces.large} + ${theme.appDimensions.navbarHeight} / 2)`};
      }

      @media only screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
        margin-bottom: ${({ theme }) => `calc(${theme.spaces.jumbo} + ${theme.appDimensions.navbarHeight} / 2)`};
      }
    }

    > section:nth-child(2) {
      margin-bottom: ${({ theme }) => `calc(${theme.appDimensions.navbarHeight} / 2)`};

      @media only screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
        margin-bottom: ${({ theme }) => `calc(${theme.spaces.large} + ${theme.appDimensions.navbarHeight} / 2)`};
      }

      @media only screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
        margin-bottom: ${({ theme }) => theme.spaces.jumbo};
      }
    }
  }
`;
exports.default = Home;
//# sourceMappingURL=index.js.map