import * as React from "react";

import styled from "styled-components";

interface Props {
  contents: React.ReactNode;
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
  margin-top: var(--space-medium);
  width: 100%;

  > p {
    max-width: var(--article-max-width);
    width: 100%;
    color: var(--text);
    font-display: swap;
    font-size: 1.6rem;
    line-height: 1.8;
    overflow: break-word;
    font-family: "Fira Sans", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
      Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;

    a {
      font-family: inherit;
      font-size: inherit;
      color: var(--selection);

      &:hover,
      &:active {
        color: var(--text);
      }
    }

    em,
    i {
      font-style: italic;
    }

    b,
    strong {
      font-weight: bold;
    }
  }
`;

export default BlogParagraph;
