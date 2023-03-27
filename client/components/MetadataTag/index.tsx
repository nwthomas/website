import styled from "styled-components";

interface Props {
  contents: string;
}

function MetadataTag({ contents }: Props) {
  return <RootStyles>{contents}</RootStyles>;
}

const RootStyles = styled.p`
  background-color: var(--body-bg-accent-one);
  border-radius: var(--border-radius-small);
  color: var(--text);
  font-size: 1.4rem;
  margin-top: var(--space-xxsmall);
  padding: var(--space-nano) calc(var(--space-micro) * 2) var(--space-micro);

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpoints.tablet}) {
    font-size: 1.6rem;
  }
`;

export default MetadataTag;
