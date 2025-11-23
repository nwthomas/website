import * as React from "react";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import oneDark from "../../constants/codeThemes/oneDark";
import styled from "styled-components";

interface Props {
  contents: React.ReactNode;
  isInline?: boolean;
  language?: string;
}

// The inline code styling inspiration was pulled from:
// https://www.thefullstackblog.com/highlight-code-blocks-in-markdown-files-with-react-markdown-and-react-syntax-highlighter-libraries
//
// The main code block tooling was inspired by:
// https://www.joshwcomeau.com/blog/how-i-built-my-blog/
function BlogCodeBlock({ contents, isInline, language }: Props) {
  if (isInline) {
    return <InlineRootStyles>{contents}</InlineRootStyles>;
  }

  return (
    <BlockRootStyles>
      <SyntaxHighlighter language={language} style={oneDark}>
        {contents}
      </SyntaxHighlighter>
    </BlockRootStyles>
  );
}

const BlockRootStyles = styled.div`
  display: flex;
  justify-content: center;
  margin-top: var(--space-medium);
  width: 100%;

  > pre {
    max-width: var(--article-max-width);
    width: 100%;

    code,
    span {
      color: var(--color-white);
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace;
      flex-wrap: wrap;
    }
  }
`;

const InlineRootStyles = styled.code`
  background-color: var(--body-bg-accent-one);
  border-radius: var(--border-radius-small);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace;
  font-size: 1.4rem;
  line-height: 1.8;
  padding: var(--space-nano) calc(var(--space-micro) * 2) var(--space-micro);
  white-space: nowrap;

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 1.6rem;
  }
`;

export default BlogCodeBlock;
