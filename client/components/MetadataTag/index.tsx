import styled from "styled-components";

interface Props {
  contents: string;
}

function MetadataTag({ contents }: Props) {
  return <RootStyles>{contents}</RootStyles>;
}

const RootStyles = styled.p`
  background-color: ${({ theme }) => theme.colors.bodyBackgroundAccentOne};
  border-radius: ${({ theme }) => theme.borderRadii.small};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1.4rem;
  margin-top: ${({ theme }) => theme.spaces.xxSmall};
  padding: ${({ theme }) =>
    `${theme.spaces.nano} calc(${theme.spaces.micro} * 2) ${theme.spaces.micro}`};

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpoints.tablet}) {
    font-size: 1.6rem;
  }
`;

export default MetadataTag;
