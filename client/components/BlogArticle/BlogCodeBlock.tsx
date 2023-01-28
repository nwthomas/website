import * as React from "react";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import styled from "styled-components";
import undefinedTheme from "../../constants/codeThemes/undefinedTheme";

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
      <SyntaxHighlighter
        language={language}
        style={undefinedTheme}
        PreTag="div"
        showLineNumbers
        showInlineLineNumbers
        wrapLongLines
      >
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

  > div {
    border-radius: ${({ theme }) => theme.borderRadii.medium};
    max-width: ${({ theme }) => theme.appDimensions.articleMaxWidth};
    width: 100%;

    span {
      font-family: monospace, monospace;
      flex-wrap: wrap;
    }
  }
`;

const InlineRootStyles = styled.code`
  background-color: ${({ theme }) => theme.colors.bodyBackgroundAccentTwo};
  border-radius: ${({ theme }) => theme.borderRadii.small};
  font-family: monospace, monospace;
  font-size: 1.4rem;
  line-height: 1.8;
  padding: ${({ theme }) =>
    `${theme.spaces.micro} calc(${theme.spaces.micro} * 2)`};
  white-space: nowrap;

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpoints.tablet}) {
    font-size: 1.6rem;
  }
`;

export default BlogCodeBlock;
