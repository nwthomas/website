import GlobalStyle from "./libs/global";
import { createGlobalStyle } from "styled-components";

export { default as makeMainTheme } from "./libs/theme";
export type { Theme } from "./libs/theme";

const GlobalStyleWithReset = createGlobalStyle`
    ${GlobalStyle}
`;

export default GlobalStyleWithReset;
