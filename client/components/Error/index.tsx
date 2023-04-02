import Link from "next/link";
import styled from "styled-components";

interface Props {
  errorCode: string;
}

export default function Error({ errorCode }: Props) {
  return (
    <RootStyles>
      <h1>
        {`${errorCode} `}
        <Link href="/" passHref prefetch={false}>
          Go home
        </Link>
      </h1>
    </RootStyles>
  );
}

const RootStyles = styled.main`
  align-items: center;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  left: 0;
  position: absolute;
  padding: 0 var(--app-horizontal-gutters);
  right: 0;
  top: 0;
  width: 100%;

  > h1 {
    color: var(--text);
    font-display: swap;
    font-family: "Fira Sans", ui-sans-serif, system-ui, -apple-system,
      BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans,
      sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol,
      Noto Color Emoji;
    font-size: 1.6rem;

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.tablet}) {
      font-size: 2rem;
    }
  }
`;
