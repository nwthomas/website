import Link from "next/link";
import { buildLinkHref } from "../../utils/routes";
import styled from "styled-components";

export function buildTagLinkAriaLabel(tagName: string): string {
  return `${tagName} blog section, link is to page with only ${tagName}`;
}

interface Props {
  text: string;
}

function Tag({ text }: Props) {
  return (
    <StyledLink
      aria-label={buildTagLinkAriaLabel(text)}
      href={buildLinkHref(text)}
      passHref
    >
      <h1>{text}</h1>
    </StyledLink>
  );
}

const StyledLink = styled(Link)`
  align-items: center;
  border: ${({ theme }) =>
    `${theme.spaces.nano} solid ${theme.colors.bodyBackgroundAccentTwo}`};
  border-radius: ${({ theme }) => theme.borderRadii.infinity};
  cursor: pointer;
  display: flex;
  height: ${({ theme }) => theme.spaces.large};
  justify-content: center;
  padding: ${({ theme }) => `${theme.spaces.xSmall} ${theme.spaces.medium}`};
  position: relative;
  text-decoration: none;
  transition: border ${({ theme }) => theme.transitions.short} ease-in-out;

  > h1 {
    color: ${({ theme }) => theme.colors.text};
    font-size: 1.6rem;
    display: block;
    line-height: 1;
    text-align: center;
    width: 100%;

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.tablet}) {
      font-size: 2rem;
    }
  }

  &:hover {
    border: ${({ theme }) =>
      `${theme.spaces.nano} solid ${theme.colorsHex.royalBlue}`};
    outline: none;
    text-decoration: none;
    text-decoration-underline: none;
  }
`;

export default Tag;
