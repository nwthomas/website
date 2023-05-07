import { CloseIcon } from "../Icons";
import Link from "next/link";
import styled from "styled-components";

interface Props {
  ariaLabel?: string;
  text: string;
  url: string;
  withCloseIcon?: boolean;
}

function Tag({ ariaLabel, text, url, withCloseIcon }: Props) {
  return (
    <StyledLink aria-label={ariaLabel} href={url} passHref prefetch={false}>
      {withCloseIcon ? (
        <div>
          <CloseIcon color="var(--color-red)" />
        </div>
      ) : null}
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

  > div {
    align-items: center;
    display: flex;
    position: relative;

    > svg {
      height: calc(var(--space-xxlarge) / 2);
      padding-right: var(--space-xxsmall);
      width: calc(var(--space-xxlarge) / 2);
    }
  }

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

  &:hover,
  &:active,
  &:focus {
    border: var(--space-nano) solid var(--color-royal-blue);
    outline: none;
    text-decoration: none;
    text-decoration-underline: none;
  }
`;

export default Tag;
