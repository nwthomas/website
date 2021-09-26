import { css } from "styled-components";
import { colors } from "./theme";

const GlobalStyle = css`
  * {
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
  }

  html,
  body {
    background-color: ${({ theme }) => theme.colors.bodyBackground};
  }

  body {
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: 100%;
  }

  body {
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* To change the colors in the colors object, go to styles/libs/theme.ts */
  body.dark {
    --body-bg: ${colors.woodsmoke};
    --text: ${colors.white};
    --transparent: ${colors.transparent};
  }
  body.light {
    --body-bg: ${colors.white};
    --text: ${colors.mineShaft};
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
    font-size: 7rem;
  }

  h2 {
    font-size: 3rem;
  }

  h3 {
    color: ${({ theme }) => theme.colors.text};
    font-size: 1.6rem;
  }

  h4 {
    font-size: 2rem;
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
    font-size: 2.6rem;
    line-height: 1.4;
    overflow: break-word;
    font-family: "ObjectSans", Object Sans, Helvetica, sans-serif;

    &::placeholder {
      color: ${({ theme }) => theme.colors.text};
      opacity: ${({ theme }) => theme.opacity.opacity80};
      font-size: 1.6rem;
      font-family: "ObjectSans", Object Sans, Helvetica, sans-serif;
    }
  }

  li {
    list-style: circle inside;
  }

  a {
    color: ${({ theme }) => theme.colors.text};
    font-display: swap;
    font-size: 1.6rem;
    text-decoration: none;
  }

  button {
    color: ${({ theme }) => theme.colors.text};
    font-size: 1.6rem;
  }

  img {
    height: auto;
    width: 100%;
  }
`;

export default GlobalStyle;
