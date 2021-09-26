import { createGlobalStyle } from 'styled-components';
import GlobalStyle from './libs/global';
import ResetStyle from './libs/reset';

export { default as makeMainTheme } from './libs/theme';
export type { Theme } from './libs/theme';

const GlobalStyleWithReset = createGlobalStyle`
    ${ResetStyle}
    ${GlobalStyle}
`;

export default GlobalStyleWithReset;
