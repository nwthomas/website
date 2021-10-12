"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const link_1 = __importDefault(require("next/link"));
const styled_components_1 = __importDefault(require("styled-components"));
function Error({ errorCode }) {
    return (<RootStyles>
      <h2>{`${errorCode} 🦄 Something went wrong`}</h2>
      <div>
        <link_1.default href="/" passHref>
          <a>Go back home</a>
        </link_1.default>
      </div>
    </RootStyles>);
}
exports.default = Error;
const RootStyles = styled_components_1.default.main `
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${({ theme }) => `0 ${theme.appDimensions.appHorizontalGutters}`};
  width: 100%;

  > h2 {
    font-weight: bold;
    margin-bottom: ${({ theme }) => theme.spaces.medium};
  }

  > div {
    cursor: pointer;
    transition: opacity ${({ theme }) => theme.transitions.medium} ease-in-out;

    > a {
      background-clip: text;
      background-image: linear-gradient(120deg, #7579ff 0%, #b224ef 100%);
      -moz-background-clip: text;
      -webkit-background-clip: text;
      background-size: 100%;
      -moz-text-fill-color: transparent;
      -webkit-text-fill-color: transparent;
      display: inline-block;
      transition: opacity ${({ theme }) => theme.transitions.medium} ease-in-out;

      &:hover {
        color: ${({ theme }) => theme.colors.textAccentThree};
      }
    }
  }
`;
//# sourceMappingURL=index.js.map