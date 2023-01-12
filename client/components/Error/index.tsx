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
          Go back home
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
    font-size: 2rem;
    text-align: center;
    margin-bottom: ${({ theme }) => theme.spaces.medium};

    > a {
      background-clip: text;
      background-image: linear-gradient(90deg, #fc6076 0%, #ff9a44 100%);
      -moz-background-clip: text;
      -webkit-background-clip: text;
      background-size: 100%;
      font-size: inherit;
      padding: ${({ theme }) => `${theme.spaces.micro} 0`};
      -moz-text-fill-color: transparent;
      -webkit-text-fill-color: transparent;
      text-decoration: none;
    }
  }
`;
