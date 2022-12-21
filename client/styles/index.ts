import GlobalStyle from "./libs/global";
import ResetStyle from "./libs/reset";
import { createGlobalStyle } from "styled-components";

export { default as makeMainTheme } from "./libs/theme";
export type { Theme } from "./libs/theme";

const GlobalStyleWithReset = createGlobalStyle`
    ${ResetStyle}
    ${GlobalStyle}
`;

export default GlobalStyleWithReset;
