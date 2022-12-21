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
    width: 100%;

    > div > p {
      padding: 0 ${({ theme }) => theme.appDimensions.appHorizontalGutters};
      color: ${({ theme }) => theme.colors.textSecondary};
      font-style: italic;
    }
  }
`;

export default BlogBlockQuote;
