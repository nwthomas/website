import { buildAriaLabel, buildLinkHref } from "../../utils/tags";

import styled from "styled-components";

type Props = {
  text: string;
};

function Tag({ text }: Props) {
  return (
    <RootStyles aria-label={buildAriaLabel(text)} href={buildLinkHref(text)}>
      <h1>{text}</h1>
    </RootStyles>
  );
}

const RootStyles = styled.a`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.bodyBackground};
  border: ${({ theme }) =>
    `${theme.spaces.nano} solid ${theme.colors.bodyBackgroundAccentTwo}`};
  border-radius: ${({ theme }) => theme.borderRadii.infinity};
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => `${theme.spaces.xSmall} ${theme.spaces.medium}`};
  text-decoration: none;
  transition: border-color ${({ theme }) => theme.transitions.short} ease-in-out,
    background-color ${({ theme }) => theme.transitions.short} ease-in-out;

  > h1 {
    color: ${({ theme }) => theme.colors.text};
    font-size: 2rem;
    display: block;
    height: 100%;
    line-height: 1;
    width: 100%;
  }

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.colors.bodyBackgroundAccentOne};
    border: ${({ theme }) =>
      `${theme.spaces.nano} solid ${theme.colorsHex.royalBlue}`};
    outline: none;
    text-decoration: none;
  }
`;

export default Tag;
