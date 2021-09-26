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

  html,
  body {
    font-family: "Object Sans", Helvetica, Arial, sans-serif;
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
    font-size: 1.6rem;
    line-height: 1.4;
    overflow: break-word;
    font-family: "Work Sans", -apple-system, BlinkMacSystemFont, Segoe UI,
      Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji",
      "Segoe UI Emoji", "Segoe UI Symbol";

    &::placeholder {
      color: ${({ theme }) => theme.colors.text};
      opacity: ${({ theme }) => theme.opacity.opacity80};
      font-size: 1.6rem;
      line-height: 1.4;
      font-family: "Work Sans", -apple-system, BlinkMacSystemFont, Segoe UI,
        Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji",
        "Segoe UI Emoji", "Segoe UI Symbol";
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
