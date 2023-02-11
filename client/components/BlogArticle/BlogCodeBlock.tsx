import * as React from "react";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import oneDark from "../../constants/codeThemes/oneDark";
import styled from "styled-components";

interface Props {
  contents: string;
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

  // Trim new line escaped character '\n' off end of string which is always present for some reason
  const normalizedContent = contents.slice(0, contents.length - 1);

  return (
    <BlockRootStyles>
      <SyntaxHighlighter language={language} style={oneDark}>
        {normalizedContent}
      </SyntaxHighlighter>
    </BlockRootStyles>
  );
}

const BlockRootStyles = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spaces.medium};
  width: 100%;

  > pre {
    max-width: ${({ theme }) => theme.appDimensions.articleMaxWidth};
    width: 100%;

    code,
    span {
      color: ${({ theme }) => theme.colorsHex.white};
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
        Liberation Mono, Courier New, monospace;
      flex-wrap: wrap;
    }
  }
`;

const InlineRootStyles = styled.code`
  background-color: ${({ theme }) => theme.colors.bodyBackgroundAccentOne};
  border-radius: ${({ theme }) => theme.borderRadii.small};
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    Liberation Mono, Courier New, monospace;
  font-size: 1.4rem;
  line-height: 1.8;
  padding: ${({ theme }) =>
    `${theme.spaces.nano} calc(${theme.spaces.micro} * 2) ${theme.spaces.micro}`};
  white-space: nowrap;

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpoints.tablet}) {
    font-size: 1.6rem;
  }
`;

export default BlogCodeBlock;
