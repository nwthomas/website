import * as React from "react";
import styled from "styled-components";

interface Props {
  contents: React.ReactNode & Array<React.ReactNode>;
}

function BlogParagraph({ contents }: Props) {
  return (
    <RootStyles>
      <p>{contents}</p>
    </RootStyles>
  );
}

const RootStyles = styled.div`
  display: flex;
  justify-content: center;
  padding-left: ${({ theme }) => theme.appDimensions.appHorizontalGutters};
  padding-right: ${({ theme }) => theme.appDimensions.appHorizontalGutters};
  padding-top: ${({ theme }) => theme.spaces.medium};
  width: 100%;

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpoints.tablet}) {
    padding-top: ${({ theme }) => theme.spaces.large};
  }

  > p {
    line-height: 1.8;
    max-width: ${({ theme }) => theme.appDimensions.articleMaxWidth};
    width: 100%;

    a {
      background-clip: text;
      -moz-background-clip: text;
      -webkit-background-clip: text;
      background-image: ${({ theme }) =>
        `linear-gradient(90deg, ${theme.colorsHex.lavender} 0%, ${theme.colorsHex.orchid} 33%, ${theme.colorsHex.brilliantRose} 66%, ${theme.colorsHex.brilliantRose} 100%)`};
      background-size: 100%;
      font-size: inherit;
      margin-right: -0.4em;
      padding: ${({ theme }) =>
        `${theme.spaces.micro} 0.4em ${theme.spaces.micro} 0`};
      -moz-text-fill-color: transparent;
      -webkit-text-fill-color: transparent;
      text-decoration: none;
    }

    em,
    i {
      font-style: italic;
    }

    b {
      font-style: bold;
    }
  }
`;

export default BlogParagraph;
