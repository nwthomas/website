import styled from "@emotion/styled";

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
  padding-top: var(--space-medium);
  width: 100%;

  > hr {
    border: var(--space-nano) solid var(--body-bg-accent-one);
    max-width: var(--article-max-width);
    width: 100%;
  }
`;

export default BlogHorizontalRule;
