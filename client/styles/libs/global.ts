import { colors } from "./theme";
import { css } from "styled-components";

const GlobalStyle = css`
  * {
    box-sizing: border-box;
  }

  /*
  Transitions on load in NextJS are a real issue that include some Chromium bugs. This is a fix for now.
  
  See: https://stackoverflow.com/questions/57401976/css-transition-flash-on-page-load-with-nextjs-production-build
  Also: https://css-tricks.com/transitions-only-after-page-load
  */
  .preload {
    -webkit-transition: none !important;
    -moz-transition: none !important;
    -ms-transition: none !important;
    -o-transition: none !important;
  }

  /* This value can be modified in the theme.ts file's appDimensions object */
  :root {
    --app-min-height: 100vh;
  }

  html,
  body {
    /* Using 'background-color' will make sure this value is applied to the iPhone notch area */
    background-color: ${({ theme }) => theme.colors.bodyBackground};
    font-size: 62.5%;
  }

  body {
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
  }

  /* To change the colors in the colors object, go to styles/libs/theme.ts */
  body.dark {
    --body-bg: ${colors.black};
    --body-bg-accent-one: ${colors.shark};
    --body-bg-accent-two: ${colors.outerSpace};
    --code-bg: ${colors.eerieBlack};
    --error: ${colors.scarlet};
    --selection: ${colors.pictonBlue};
    --text: ${colors.mercury};
    --text-accent-one: ${colors.juniper};
    --text-accent-two: ${colors.hookersGreen};
    --text-secondary: ${colors.manatee};
  }
  body.light {
    --body-bg: ${colors.athensGray};
    --body-bg-accent-one: ${colors.wildSand};
    --body-bg-accent-two: ${colors.alto};
    --code-bg: ${colors.eerieBlack};
    --error: ${colors.scarlet};
    --selection: ${colors.pictonBlue};
    --text: ${colors.mineShaft};
    --text-accent-one: ${colors.hookersGreen};
    --text-accent-two: ${colors.juniper};
    --text-secondary: ${colors.doveGray};
  }

  /* 
  The focus-visible psuedo class is used by UAs when focus is helpful
  to the user. It has decent browser support (not great), but I decided to
  go with it given the needs of this site. Defining focus first and then reverting
  with focus-visible will also gracefully degrade to showing a focus ring all the
  time if necessary.
  
  See: https://css-tricks.com/platform-news-using-focus-visible-bbcs-new-typeface-declarative-shadow-doms-a11y-and-placeholders/#now-may-be-a-good-time-to-start-using-focus-visible
  */
  :focus {
    outline-color: ${({ theme }) => theme.colors.selection};
    outline-style: solid;
    outline-width: ${({ theme }) => theme.spaces.nano};
  }

  :focus:not(:focus-visible) {
    outline-color: transparent;
  }

  /* Code for Firefox */
  ::-moz-selection {
    color: ${({ theme }) => theme.colorsHex.white};
    background: ${({ theme }) => theme.colorsHex.pictonBlue};
    background-clip: border-box;
    background-image: none;
    background-size: 100%;
    -webkit-background-clip: border-box;
    -moz-background-clip: border-box;
    -webkit-text-fill-color: currentColor;
    -moz-text-fill-color: currentColor;
  }

  ::selection {
    color: ${({ theme }) => theme.colorsHex.white};
    background: ${({ theme }) => theme.colorsHex.pictonBlue};
    background-clip: border-box;
    background-image: none;
    background-size: 100%;
    -webkit-background-clip: border-box;
    -moz-background-clip: border-box;
    -webkit-text-fill-color: currentColor;
    -moz-text-fill-color: currentColor;
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    color: ${({ theme }) => theme.colors.text};
    font-display: swap;
    font-family: "Libre Baskerville", Constantia, "Lucida Bright", Lucidabright,
      "Lucida Serif", Lucida, "DejaVu Serif", "Bitstream Vera Serif",
      "Liberation Serif", Georgia, serif;
    line-height: 1.5;
  }

  h1 {
    font-size: 3rem;
    font-weight: bold;

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.tablet}) {
      font-size: 4.5rem;
    }

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.desktop}) {
      font-size: 6rem;
    }
  }

  h2 {
    font-size: 2rem;
    font-weight: bold;

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.tablet}) {
      font-size: 2.4rem;
    }
  }

  p,
  label,
  span,
  ul,
  ol,
  li,
  input,
  textarea {
    color: ${({ theme }) => theme.colors.text};
    font-display: swap;
    font-size: 1.6rem;
    line-height: 1.8;
    overflow: break-word;
    font-family: "Fira Sans", ui-sans-serif, system-ui, -apple-system,
      BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans,
      sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol,
      Noto Color Emoji;

    &::placeholder {
      color: ${({ theme }) => theme.colors.text};
      opacity: ${({ theme }) => theme.opacity.opacity70};
      font-size: 1.6rem;
      font-family: "Fira Sans", ui-sans-serif, system-ui, -apple-system,
        BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans,
        sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol,
        Noto Color Emoji;
    }
  }

  span {
    font-size: inherit;
  }

  li {
    list-style: circle inside;
  }

  a {
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
    color: ${({ theme }) => theme.colors.textSecondary};
    cursor: pointer;
    font-display: swap;
    font-family: "Fira Sans", ui-sans-serif, system-ui, -apple-system,
      BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans,
      sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol,
      Noto Color Emoji;
    font-size: 1.6rem;
    overflow: break-word;
    text-decoration: none;
    transition: color ${({ theme }) => theme.transitions.short} ease-in-out;

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.tablet}) {
      font-size: 2rem;
    }

    &:hover,
    &:active {
      color: ${({ theme }) => theme.colors.text};
      outline: none;
    }
  }

  img {
    aspect-ratio: attr(width) / attr(height);
    height: auto;
    width: 100%;
  }

  input,
  textarea {
    font-size: 1.6rem;

    &::placeholder {
      /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: ${({ theme }) => theme.colors.textSecondary};
      /* Firefox */
      opacity: ${({ theme }) => theme.opacity.opacity100};
    }

    &:-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: ${({ theme }) => theme.colors.textSecondary};
    }

    &::-ms-input-placeholder {
      /* Microsoft Edge */
      color: ${({ theme }) => theme.colors.textSecondary};
    }
  }
`;

export default GlobalStyle;
