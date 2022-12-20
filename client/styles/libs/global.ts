import { colors } from "./theme";
import { css } from "styled-components";

const GlobalStyle = css`
  * {
    box-sizing: border-box;
    transition: ${({
      theme: {
        transitions: { short },
      },
    }) =>
      `background ${short} ease-in-out, background-color ${short} ease-in-out, color ${short} ease-in-out, fill ${short} ease-in-out, stroke ${short} ease-in-out, border-color ${short} ease-in-out`};
  }

  body,
  html {
    background: ${({ theme }) => theme.colors.bodyBackground};
    font-size: 62.5%;
  }

  body {
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
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
    outline-color: ${({ theme }) => theme.colorsHex.royalBlue};
    outline-style: solid;
    outline-width: ${({ theme }) => theme.spaces.nano};
  }

  :focus:not(:focus-visible) {
    outline-color: ${({ theme }) => theme.colors.transparent};
  }

  /* To change the colors in the colors object, go to styles/libs/theme.ts */
  body.dark {
    --body-bg: ${colors.black};
    --body-bg-accent-one: ${colors.codGray};
    --body-bg-accent-two: ${colors.mineShaft};
    --button-primary-bg: ${colors.royalBlue};
    --error: ${colors.scarlet};
    --text: ${colors.white};
    --text-on-contrast: ${colors.white};
    --text-secondary: ${colors.rollingStone};
    --transparent: ${colors.transparent};
  }
  body.light {
    --body-bg: ${colors.white};
    --body-bg-accent-one: ${colors.alabaster};
    --body-bg-accent-two: ${colors.platinum};
    --button-primary-bg: ${colors.royalBlue};
    --error: ${colors.scarlet};
    --text: ${colors.mineShaft};
    --text-on-contrast: ${colors.white};
    --text-secondary: ${colors.doveGray};
    --transparent: ${colors.transparent};
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    color: ${({ theme }) => theme.colors.text};
    font-display: swap;
    font-family: "ObjectSans", Object Sans, Helvetica, sans-serif;
    line-height: 1.4;
  }

  h1 {
    font-size: 3rem;

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.tablet}) {
      font-size: 5rem;
    }
  }

  h2 {
    font-size: 1.6rem;
    letter-spacing: ${({ theme }) => theme.spaces.micro};
    text-transform: uppercase;

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.tablet}) {
      font-size: 2rem;
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
    line-height: 1.4;
    overflow: break-word;
    font-family: "ObjectSans", Object Sans, Helvetica, sans-serif;

    &::placeholder {
      color: ${({ theme }) => theme.colors.text};
      opacity: ${({ theme }) => theme.opacity.opacity70};
      font-size: 1.6rem;
      font-family: "ObjectSans", Object Sans, Helvetica, sans-serif;
    }

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.tablet}) {
      font-size: 2rem;
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
    font-display: swap;
    font-family: "ObjectSans", Object Sans, Helvetica, sans-serif;
    font-size: 1.6rem;
    overflow: break-word;
    text-decoration-color: transparent;
    text-decoration-style: solid;
    text-decoration-line: underline;
    text-underline-offset: ${({ theme }) => theme.spaces.micro};
    transition: text-decoration-color ${({ theme }) => theme.transitions.short}
      ease-in-out;

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.tablet}) {
      font-size: 2rem;
    }

    &:hover {
      text-decoration-color: ${({ theme }) => theme.colors.textSecondary};
    }
  }

  button {
    background-color: ${({ theme }) => theme.colors.buttonPrimaryBackground};
    color: ${({ theme }) => theme.colorsHex.white};
    font-size: 1.6rem;
    font-weight: bold;
    transition: opacity ${({ theme }) => theme.transitions.medium} ease-in-out;

    &:hover {
      opacity: ${({ theme }) => theme.opacity.opacity80};
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
  }

  .disable-select {
    user-select: none;
  }
`;

export default GlobalStyle;
