"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = __importDefault(require("styled-components"));
const MoonIcon = <img alt="Sun icon" src="/moon.png"/>;
const SunIcon = <img alt="Moon icon" src="/sun.png"/>;
function ThemeTransitionButton({ onClick, currentTheme, }) {
    const currentIcon = currentTheme === "dark" ? MoonIcon : SunIcon;
    return (<RootStyles>
      <button onClick={onClick} role="button" tabIndex={0}>
        {currentTheme ? currentIcon : null}
      </button>
    </RootStyles>);
}
exports.default = ThemeTransitionButton;
const RootStyles = styled_components_1.default.div `
  align-items: center;
  background: ${({ theme }) => theme.colors.transparent};
  cursor: pointer;
  display: flex;
  height: ${({ theme }) => theme.appDimensions.navbarHeight};
  justify-content: flex-end;
  text-decoration: none;
  transition: opacity ${({ theme }) => theme.transitions.medium} ease-in-out,
    transform ${({ theme }) => theme.transitions.medium} ease-in-out;
  width: 100%;

  &:hover {
    opacity: ${({ theme }) => theme.opacity.opacity90};
  }

  > button {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    font: inherit;
    height: 40px;
    padding: 0;
    width: 30px;
  }
`;
//# sourceMappingURL=index.js.map