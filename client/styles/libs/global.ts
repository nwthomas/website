import { css } from "styled-components";
import { colors } from "./theme";

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

  html {
    font-size: 62.5%;
  }

  html,
  body {
    background: ${({ theme }) => theme.colors.bodyBackground};
  }

  body {
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
  }

  ::-webkit-scrollbar {
    width: 15px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    border-left: 1px solid
      ${({ theme }) => theme.colors.bodyBackgroundAccentTwo};
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.bodyBackgroundAccentTwo};
    border-radius: ${({ theme }) => theme.borderRadii.infinity};
  }

  :focus {
    outline-color: ${({ theme }) => theme.colorsHex.royalBlue};
    outline-style: solid;
    outline-width: ${({ theme }) => theme.spaces.nano};
  }

  /* To change the colors in the colors object, go to styles/libs/theme.ts */
  body.dark {
    --body-bg: ${colors.mirage};
    --body-bg-accent-one: ${colors.black};
    --body-bg-accent-two: ${colors.mineShaft};
    --body-bg-accent-three: ${colors.shark};
    --button-primary-bg: ${colors.royalBlue};
    --button-secondary-bg: ${colors.fireBush};
    --error: ${colors.scarlet};
    --success: ${colors.screaminGreen};
    --text: ${colors.white};
    --transparent: ${colors.transparent};
  }
  body.light {
    --body-bg: ${colors.alabaster};
    --body-bg-accent-one: ${colors.white};
    --body-bg-accent-two: ${colors.silver};
    --body-bg-accent-three: ${colors.mercury};
    --button-primary-bg: ${colors.royalBlue};
    --button-secondary-bg: ${colors.fireBush};
    --error: ${colors.scarlet};
    --success: ${colors.screaminGreen};
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
      font-size: 3rem;
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
      font-size: 3rem;
    }

    &:hover {
      opacity: ${({ theme }) => theme.opacity.opacity70};
    }
  }

  button {
    background-color: ${({ theme }) => theme.colorsHex.cornFlowerBlue};
    color: ${({ theme }) => theme.colors.text};
    font-size: 1.6rem;
    font-weight: bold;
    transition: opacity ${({ theme }) => theme.transitions.medium} ease-in-out;

    &:hover {
      opacity: ${({ theme }) => theme.opacity.opacity70};
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
