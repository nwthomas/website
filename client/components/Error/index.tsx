import Link from "next/link";
import styled from "styled-components";

interface Props {
  errorCode: string;
}

export default function Error({ errorCode }: Props) {
  return (
    <RootStyles>
      <h2>{`${errorCode} 🦄 Something went wrong`}</h2>
      <div>
        <Link href="/" passHref>
          <a>Go back home</a>
        </Link>
      </div>
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

  > h2 {
    margin-bottom: ${({ theme }) => theme.spaces.large};
  }

  > div {
    cursor: pointer;
    transition: opacity ${({ theme }) => theme.transitions.medium} ease-in-out;

    > a {
      background-clip: text;
      background-image: linear-gradient(120deg, #7579ff 0%, #b224ef 100%);
      -moz-background-clip: text;
      -webkit-background-clip: text;
      background-size: 100%;
      -moz-text-fill-color: transparent;
      -webkit-text-fill-color: transparent;
      display: inline-block;
      transition: opacity ${({ theme }) => theme.transitions.medium} ease-in-out;

      &:hover {
        color: ${({ theme }) => theme.colors.textAccentThree};
      }
    }
  }
`;
