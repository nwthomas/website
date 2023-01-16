import Link from "next/link";
import { buildLinkHref } from "../../utils/routes";
import styled from "styled-components";

export function buildTagLinkAriaLabel(tagName: string): string {
  return `All articles about ${tagName}`;
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
      <h1 aria-hidden>{text}</h1>
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
  justify-content: center;
  padding: ${({ theme }) => `${theme.spaces.xSmall} ${theme.spaces.medium}`};
  position: relative;
  text-decoration: none;
  transition: border-color ${({ theme }) => theme.transitions.short} ease-in-out;

  > h1 {
    color: ${({ theme }) => theme.colors.text};
    font-size: 1.6rem;
    display: block;
    height: 100%;
    line-height: 1;
    margin-top: ${({ theme }) => theme.spaces.nano};
    width: 100%;

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.tablet}) {
      font-size: 2rem;
      margin-top: ${({ theme }) => theme.spaces.micro};
    }
  }

  > h1:nth-child(2) {
    background-clip: text;
    -moz-background-clip: text;
    -webkit-background-clip: text;
    background-image: ${({ theme }) =>
      `linear-gradient(90deg, ${theme.colorsHex.lavender} 0%, ${theme.colorsHex.orchid} 33%, ${theme.colorsHex.brilliantRose} 66%, ${theme.colorsHex.brilliantRose} 100%)`};
    background-size: 100%;
    left: 0;
    opacity: ${({ theme }) => theme.opacity.opacity00};
    padding: ${({ theme }) => `${theme.spaces.xSmall} ${theme.spaces.medium}`};
    position: absolute;
    right: 0;
    -moz-text-fill-color: transparent;
    -webkit-text-fill-color: transparent;
    text-decoration: none;
    top: 0;
    transition: opacity ${({ theme }) => theme.transitions.short} ease-in-out;
  }

  &:hover,
  &:focus {
    border: ${({ theme }) =>
      `${theme.spaces.nano} solid ${theme.colorsHex.pictonBlue}`};
    outline: none;
    text-decoration: none;

    > h1:nth-child(2) {
      opacity: ${({ theme }) => theme.opacity.opacity100};
    }
  }

  &:hover,
  &:select,
  &:focus {
    text-decoration-underline: none;
  }
`;

export default Tag;
