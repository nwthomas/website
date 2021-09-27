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
    --body-bg-accent-one: ${colors.black};
    --body-bg-accent-two: ${colors.mineShaft};
    --button-bg: ${colors.royalBlue};
    --error: ${colors.scarlet};
    --text: ${colors.white};
    --transparent: ${colors.transparent};
  }
  body.light {
    --body-bg: ${colors.white};
    --body-bg-accent-one: ${colors.white};
    --body-bg-accent-two: ${colors.alabaster};
    --button-bg: ${colors.royalBlue};
    --error: ${colors.scarlet};
    --text: ${colors.woodsmoke};
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

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.desktop}) {
      font-size: 7rem;
    }
  }

  h2 {
    font-size: 1.6rem;

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.tablet}) {
      font-size: 2rem;
    }

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.desktop}) {
      font-size: 3rem;
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
      opacity: ${({ theme }) => theme.opacity.opacity80};
      font-size: 1.6rem;
      font-family: "ObjectSans", Object Sans, Helvetica, sans-serif;
    }

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.tablet}) {
      font-size: 2rem;
    }

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.desktop}) {
      font-size: 2.6rem;
    }
  }

  li {
    list-style: circle inside;
  }

  a {
    color: ${({ theme }) => theme.colors.text};
    font-display: swap;
    font-family: "ObjectSans", Object Sans, Helvetica, sans-serif;
    font-size: 1.6rem;
    overflow: break-word;
    text-decoration: none;
    transition: opacity ${({ theme }) => theme.transitions.medium} ease-in-out;

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.tablet}) {
      font-size: 2rem;
    }

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.desktop}) {
      font-size: 2.6rem;
    }

    &:hover {
      opacity: ${({ theme }) => theme.opacity.opacity70};
    }
  }

  button {
    color: ${({ theme }) => theme.colors.text};
    font-size: 1.6rem;
    transition: opacity ${({ theme }) => theme.transitions.medium} ease-in-out;

    &:hover {
      opacity: ${({ theme }) => theme.opacity.opacity70};
    }
  }

  img {
    height: auto;
    width: 100%;
  }

  input,
  textarea {
    font-size: 1.6rem;
  }
`;

export default GlobalStyle;
