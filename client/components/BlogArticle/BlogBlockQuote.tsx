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
    border-left: ${({ theme }) =>
      `calc(${theme.spaces.nano} * 2) solid ${theme.colors.bodyBackgroundAccentOne}`};
    max-width: ${({ theme }) => theme.appDimensions.articleMaxWidth};
    margin-top: ${({ theme }) => theme.spaces.large};
    width: 100%;

    > div {
      &:first-of-type {
        margin-top: 0;
      }

      > p {
        padding: 0 ${({ theme }) => theme.appDimensions.appHorizontalGutters};
        color: ${({ theme }) => theme.colors.textSecondary};
        font-style: italic;
      }
    }
  }
`;

export default BlogBlockQuote;
