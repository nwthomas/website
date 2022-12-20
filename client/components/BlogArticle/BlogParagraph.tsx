import { ReactNode } from "react";
import styled from "styled-components";

interface Props {
  contents: ReactNode & Array<ReactNode>;
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
    font-size: 1.6rem;
    line-height: 1.8;
    max-width: ${({ theme }) => theme.appDimensions.articleMaxWidth};
    width: 100%;

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.tablet}) {
      font-size: 2rem;
    }

    > a {
      background-clip: text;
      background-image: ${({ theme }) =>
        `linear-gradient(120deg, ${theme.colorsHex.royalBlue} 0%, ${theme.colorsHex.pictonBlue} 100%)`};
      -moz-background-clip: text;
      -webkit-background-clip: text;
      background-image: ${({ theme }) => theme.gradients.getLinkText()};
      background-size: 100%;
      font-size: inherit;
      padding: ${({ theme }) => `${theme.spaces.micro} 0`};
      -moz-text-fill-color: transparent;
      -webkit-text-fill-color: transparent;
      text-decoration: none;
      transition: opacity ${({ theme }) => theme.transitions.short} ease-in-out;

      &:hover {
        opacity: ${({ theme }) => theme.opacity.opacity80};
      }
    }

    > em,
    i {
      font-style: italic;
    }

    > b {
      font-style: bold;
    }
  }
`;

export default BlogParagraph;
