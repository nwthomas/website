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
        <Link href="/" passHref>
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
  padding: ${({ theme }) => `0 ${theme.appDimensions.appHorizontalGutters}`};
  right: 0;
  top: 0;
  width: 100%;

  > h1 {
    text-align: center;

    > a {
      font-family: inherit;
      font-size: inherit;
      text-decoration: none;
      transition: opacity ${({ theme }) => theme.transitions.short} ease-in-out;

      &:hover {
        opacity: ${({ theme }) => theme.opacity.opacity80};
      }
    }
  }
`;
