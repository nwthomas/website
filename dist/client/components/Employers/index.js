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
const useGetPreferredTheme_1 = require("../../hooks/useGetPreferredTheme");
function Employers({ currentTheme }) {
    const twitterUrl = currentTheme === useGetPreferredTheme_1.DARK_THEME ? "twitter-logo-white.png" : "twitter-logo.png";
    const lambdaUrl = currentTheme === useGetPreferredTheme_1.DARK_THEME ? "lambda-logo-white.png" : "lambda-logo.png";
    return (<RootStyles>
      <div>
        <h2>Currently</h2>
        <TwitterLogo>
          <a href="https://twitter.com/nwthomas_" aria-label="Link to Twitter profile" rel="noopener noreferrer" target="_target">
            <img src={twitterUrl} alt="Twitter logo"/>
          </a>
        </TwitterLogo>
      </div>
      <div>
        <h2>Previously</h2>
        <LambdaLogo>
          <a href="https://lambdaschool.com/" aria-label="Link to Lambda School website" rel="noopener noreferrer" target="_target">
            <img src={lambdaUrl} alt="Twitter logo"/>
          </a>
        </LambdaLogo>
      </div>
    </RootStyles>);
}
const RootStyles = styled_components_1.default.section `
  display: flex;
  flex-direction: column;

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    flex-direction: row;
  }

  h2 {
    margin-bottom: ${({ theme }) => theme.spaces.medium};

    @media only screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
      margin-bottom: ${({ theme }) => theme.spaces.large};
    }

    @media only screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
      margin-bottom: ${({ theme }) => theme.spaces.xLarge};
    }
  }

  > div:nth-child(1) {
    margin-bottom: ${({ theme }) => theme.spaces.xxLarge};
    max-width: 200px;

    @media only screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
      max-width: none;
    }
  }
`;
const TwitterLogo = styled_components_1.default.div `
  transition: transform ${({ theme }) => theme.transitions.medium} ease-in-out,
    opacity ${({ theme }) => theme.transitions.medium} ease-in-out;
  width: 100px;

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.mini}) {
    width: 130px;
  }

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 150px;
  }

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    width: 185px;
  }

  &:hover {
    opacity: ${({ theme }) => theme.opacity.opacity70};
    transform: translateY(-3px);
  }
`;
const LambdaLogo = styled_components_1.default.div `
  transition: transform ${({ theme }) => theme.transitions.medium} ease-in-out,
    opacity ${({ theme }) => theme.transitions.medium} ease-in-out;
  max-width: 430px;

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 500px;
    max-width: none;
  }

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    width: 600px;
  }

  &:hover {
    opacity: ${({ theme }) => theme.opacity.opacity80};
    transform: translateY(-3px);
  }
`;
exports.default = Employers;
//# sourceMappingURL=index.js.map