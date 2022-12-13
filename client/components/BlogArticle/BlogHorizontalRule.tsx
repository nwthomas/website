import styled from "styled-components";

function BlogHorizontalRule() {
  return (
    <RootStyles>
      <hr />
    </RootStyles>
  );
}

const RootStyles = styled.div`
  display: flex;
  justify-content: center;
  padding-left: ${({ theme }) => theme.appDimensions.appHorizontalGutters};
  padding-right: ${({ theme }) => theme.appDimensions.appHorizontalGutters};
  padding-top: ${({ theme }) => theme.spaces.large};
  width: 100%;

  > hr {
    border: ${({ theme }) =>
      `${theme.spaces.nano} solid ${theme.colors.bodyBackgroundAccentTwo}`};
    max-width: ${({ theme }) => theme.appDimensions.articleMaxWidth};
    width: 100%;
  }
`;

export default BlogHorizontalRule;
