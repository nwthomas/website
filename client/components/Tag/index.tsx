import styled from "styled-components";

function buildAriaLabel(tagName: string): string {
  return `Go to all articles about ${tagName}`;
}

function buildLinkHref(tagName: string): string {
  return `/blog/tag/${tagName.split(" ").join("-").toLowerCase()}`;
}

type Props = {
  text: string;
};

function Tag({ text }: Props) {
  return (
    <RootStyles aria-label={buildAriaLabel(text)} href={buildLinkHref(text)}>
      <p>{text}</p>
    </RootStyles>
  );
}

const RootStyles = styled.a`
  align-items: center;
  border: ${({ theme }) =>
    `${theme.spaces.nano} solid ${theme.colors.bodyBackgroundAccentTwo}`};
  border-radius: ${({ theme }) => theme.borderRadii.infinity};
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => `${theme.spaces.xSmall} ${theme.spaces.medium}`};
  text-decoration: none;
  transition: opacity ${({ theme }) => theme.transitions.medium} ease-in-out;

  > p {
    color: ${({ theme }) => theme.colors.text};
    font-size: 2rem;
    display: block;
    height: 100%;
    line-height: 1;
    width: 100%;
  }

  &:hover {
    opacity: ${({ theme }) => theme.opacity.opacity80};
    text-decoration: none;
  }

  &:focus {
    border: ${({ theme }) =>
      `${theme.spaces.nano} solid ${theme.colorsHex.royalBlue}`};
    outline: none;
  }
`;

export default Tag;
