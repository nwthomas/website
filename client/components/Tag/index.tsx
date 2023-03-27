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
      prefetch={false}
    >
      <h1>{text}</h1>
    </StyledLink>
  );
}

const StyledLink = styled(Link)`
  align-items: center;
  border: var(--space-nano) solid var(--body-bg-accent-two);
  border-radius: var(--border-radius-infinity);
  cursor: pointer;
  display: flex;
  height: var(--space-large);
  justify-content: center;
  padding: var(--space-xsmall) var(--space-medium);
  position: relative;
  text-decoration: none;
  transition: border var(--transition-short) ease-in-out;

  > h1 {
    color: var(--text);
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
    border: var(--space-nano) solid var(--color-royal-blue);
    outline: none;
    text-decoration: none;
    text-decoration-underline: none;
  }
`;

export default Tag;
