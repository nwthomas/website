import * as React from "react";
import styled from "styled-components";

interface Props {
  contents: React.ReactNode & Array<React.ReactNode>;
  isOrderedList?: boolean;
}

function BlogList({ contents, isOrderedList }: Props) {
  return (
    <RootStyles>
      <ol>{contents}</ol>
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

  > ol {
    max-width: ${({ theme }) => theme.appDimensions.articleMaxWidth};
    width: 100%;

    > li {
      line-height: 1.8;
      list-style-type: disc;
      margin-top: ${({ theme }) => theme.spaces.small};

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.tablet}) {
        margin-top: ${({ theme }) => theme.spaces.medium};
      }

      > a {
        background-clip: text;
        background-image: ${({ theme }) =>
          theme.gradients.getLinkText(
            theme.colorsHex.royalBlue,
            theme.colorsHex.cornflowerBlue,
            theme.colorsHex.mauve
          )};
        -moz-background-clip: text;
        -webkit-background-clip: text;
        background-image: ${({ theme }) => theme.gradients.getLinkText()};
        background-size: 100%;
        font-size: inherit;
        margin-right: -0.4em;
        padding: ${({ theme }) =>
          `${theme.spaces.micro} 0.4em ${theme.spaces.micro} 0`};
        -moz-text-fill-color: transparent;
        -webkit-text-fill-color: transparent;
        text-decoration: none;
        transition: opacity ${({ theme }) => theme.transitions.short}
          ease-in-out;

        &:hover {
          opacity: ${({ theme }) => theme.opacity.opacity80};
        }
      }
    }

    > li:nth-child(1) {
      margin-top: 0;
    }
  }
`;

export default BlogList;
