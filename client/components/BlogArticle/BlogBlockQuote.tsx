import * as React from "react";

import styled from "styled-components";

function BlogBlockQuote({ children }) {
  return (
    <RootStyles>
      <blockquote>{children}</blockquote>
    </RootStyles>
  );
}

const RootStyles = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;

  > blockquote {
    border-left: calc(var(--space-nano) * 2) solid var(--body-bg-accent-one);
    max-width: var(--article-max-width);
    margin-top: var(--space-medium);
    width: 100%;

    @media only screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
      margin-top: var(--space-large);
    }

    > div {
      &:first-of-type {
        margin-top: 0;
      }

      > p {
        padding: 0 var(--app-horizontal-gutters);
        color: var(--text-secondary);
        font-style: italic;

        > a:hover {
          color: var(--text-secondary);
        }
      }
    }
  }
`;

export default BlogBlockQuote;
