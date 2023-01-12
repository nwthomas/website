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
    <Link href={buildLinkHref(text)} passHref>
      <RootStyles aria-label={buildTagLinkAriaLabel(text)}>
        <h1>{text}</h1>
      </RootStyles>
    </Link>
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

  &:hover,
  &:focus {
    border: ${({ theme }) =>
      `${theme.spaces.nano} solid ${theme.colorsHex.pictonBlue}`};
    outline: none;
    text-decoration: none;

    > h1 {
      background-clip: text;
      -moz-background-clip: text;
      -webkit-background-clip: text;
      background-image: ${({ theme }) =>
        `linear-gradient(90deg, ${theme.colorsHex.lavender} 0%, ${theme.colorsHex.orchid} 33%, ${theme.colorsHex.brilliantRose} 66%, ${theme.colorsHex.brilliantRose} 100%)`};
      background-size: 100%;
      -moz-text-fill-color: transparent;
      -webkit-text-fill-color: transparent;
      text-decoration: none;
    }
  }
`;

export default Tag;
