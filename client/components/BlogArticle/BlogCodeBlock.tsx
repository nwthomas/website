import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import styled from "styled-components";
import undefinedTheme from "../../constants/codeThemes/undefinedTheme";

interface Props {
  contents: string;
  isInline?: boolean;
  language?: string;
}

// Some of the syntax and setup of this component was pulled from:
// https://www.thefullstackblog.com/highlight-code-blocks-in-markdown-files-with-react-markdown-and-react-syntax-highlighter-libraries
function BlogCodeBlock({ contents, isInline, language }: Props) {
  if (isInline) {
    return <InlineRootStyles>{contents}</InlineRootStyles>;
  }

  // Trim new line escaped character '\n' off end of string
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
  padding: 0 ${({ theme }) => theme.appDimensions.appHorizontalGutters};
  width: 100%;

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpoints.tablet}) {
    margin-top: ${({ theme }) => theme.spaces.large};
  }

  > div {
    border-radius: ${({ theme }) => theme.borderRadii.large};
    max-width: ${({ theme }) => theme.appDimensions.articleMaxWidth};
    width: 100%;

    span {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
        Liberation Mono, Courier New, monospace;
      flex-wrap: wrap;
    }
  }
`;

const InlineRootStyles = styled.code`
  background-color: ${({ theme }) => theme.colors.bodyBackgroundAccentTwo};
  border-radius: ${({ theme }) => theme.borderRadii.medium};
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    Liberation Mono, Courier New, monospace;
  font-size: 1.2rem;
  padding: ${({ theme }) =>
    `${theme.spaces.nano} calc(${theme.spaces.micro} * 2)`};
  white-space: nowrap;

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpoints.tablet}) {
    font-size: 1.6rem;
  }
`;

export default BlogCodeBlock;
