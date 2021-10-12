"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = __importDefault(require("styled-components"));
const DROPDOWN_MAX_WIDTH = 250;
const ARROW_HEIGHT = 10;
const ARROW_WIDTH = 20;
function Dropdown({ content, onButtonClick, rootRef, styles }) {
    const { left: leftCSSProperty, top: topCSSProperty } = styles;
    return (<RootStyles ref={rootRef} left={leftCSSProperty} top={topCSSProperty}>
      <p>{content.paragraphOne}</p>
      {(content === null || content === void 0 ? void 0 : content.paragraphTwo) ? <p>{content.paragraphTwo}</p> : null}
      <button onClick={onButtonClick}>{content.buttonLabel}</button>
    </RootStyles>);
}
const RootStyles = styled_components_1.default.div `
  background-image: linear-gradient(120deg, #7579ff 0%, #b224ef 100%);
  border-radius: ${({ theme }) => theme.borderRadii.xLarge};
  cursor: default;
  -webkit-box-shadow: rgb(0 0 0 / 1%) 0px 0px 1px, rgb(0 0 0 / 4%) 0px 4px 8px,
    rgb(0 0 0 / 4%) 0px 16px 24px, rgb(0 0 0 / 1%) 0px 24px 32px;
  -moz-box-shadow: rgb(0 0 0 / 1%) 0px 0px 1px, rgb(0 0 0 / 4%) 0px 4px 8px,
    rgb(0 0 0 / 4%) 0px 16px 24px, rgb(0 0 0 / 1%) 0px 24px 32px;
  box-shadow: rgb(0 0 0 / 1%) 0px 0px 1px, rgb(0 0 0 / 4%) 0px 4px 8px,
    rgb(0 0 0 / 4%) 0px 16px 24px, rgb(0 0 0 / 1%) 0px 24px 32px;
  padding: ${({ theme }) => theme.spaces.medium};
  position: absolute;
  left: ${({ left }) => `${left - DROPDOWN_MAX_WIDTH + ARROW_WIDTH}px`};
  top: ${({ top }) => `${top + ARROW_HEIGHT}px`};
  max-width: ${DROPDOWN_MAX_WIDTH}px;
  width: 100%;
  z-index: 1;

  > p {
    color: ${({ theme }) => theme.colorsHex.white};
    font-size: 1.6rem;
    margin-bottom: ${({ theme }) => theme.spaces.medium};
  }

  > button {
    border: none;
    background: ${({ theme }) => theme.colors.buttonSecondaryBackground};
    border-radius: ${({ theme }) => theme.borderRadii.large};
    color: ${({ theme }) => theme.colorsHex.white};
    cursor: pointer;
    height: ${({ theme }) => theme.spaces.large};
    width: 100%;
  }
`;
exports.default = Dropdown;
//# sourceMappingURL=index.js.map