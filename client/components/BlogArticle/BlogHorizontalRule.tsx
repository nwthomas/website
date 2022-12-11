import styled from "styled-components";

function BlogHorizontalRule() {
  return (
    <RootStyles>
      <div />
      <div />
      <div />
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

  > div {
    background-color: ${({ theme }) => theme.colors.bodyBackgroundAccentTwo};
    border-radius: ${({ theme }) => theme.borderRadii.infinity};
    height: ${({ theme }) => theme.spaces.xxSmall};
    width: ${({ theme }) => theme.spaces.xxSmall};
  }

  > div:nth-child(2) {
    margin-left: ${({ theme }) => theme.spaces.medium};
    margin-right: ${({ theme }) => theme.spaces.medium};
  }
`;

export default BlogHorizontalRule;
