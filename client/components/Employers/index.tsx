import * as React from "react";
import styled from "styled-components";
import {
  DARK_THEME,
  useGetPreferredTheme,
} from "../../hooks/useGetPreferredTheme";

function Employers() {
  const [currentTheme] = useGetPreferredTheme();

  const twitterUrl =
    currentTheme === DARK_THEME ? "twitter-logo-white.png" : "twitter-logo.png";
  const lambdaUrl =
    currentTheme === DARK_THEME ? "lambda-logo-white.png" : "lambda-logo.png";

  return (
    <RootStyles>
      <div>
        <h2>Currently</h2>
        <TwitterLogo>
          <a
            href="https://twitter.com/nwthomas_"
            aria-label="Link to Twitter profile"
            rel="noopener noreferrer"
            target="_target"
          >
            <img src={twitterUrl} alt="Twitter logo" />
          </a>
        </TwitterLogo>
      </div>
      <div>
        <h2>Previously</h2>
        <LambdaLogo>
          <a
            href="https://lambdaschool.com/"
            aria-label="Link to Lambda School website"
            rel="noopener noreferrer"
            target="_target"
          >
            <img src={lambdaUrl} alt="Twitter logo" />
          </a>
        </LambdaLogo>
      </div>
    </RootStyles>
  );
}

const RootStyles = styled.section`
  display: flex;
  flex-direction: column;

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpoints.desktop}) {
    flex-direction: row;
  }

  h2 {
    margin-bottom: ${({ theme }) => theme.spaces.medium};

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.tablet}) {
      margin-bottom: ${({ theme }) => theme.spaces.large};
    }

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.desktop}) {
      margin-bottom: ${({ theme }) => theme.spaces.xLarge};
    }
  }

  > div:nth-child(1) {
    margin-bottom: ${({ theme }) => theme.spaces.xxLarge};
    max-width: 200px;

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.desktop}) {
      max-width: none;
    }
  }
`;

const TwitterLogo = styled.div`
  transition: transform ${({ theme }) => theme.transitions.medium} ease-in-out,
    opacity ${({ theme }) => theme.transitions.medium} ease-in-out;
  width: 100px;

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.mini}) {
    width: 130px;
  }

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpoints.tablet}) {
    width: 150px;
  }

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpoints.desktop}) {
    width: 185px;
  }

  &:hover {
    opacity: ${({ theme }) => theme.opacity.opacity70};
    transform: translateY(-3px);
  }
`;

const LambdaLogo = styled.div`
  transition: transform ${({ theme }) => theme.transitions.medium} ease-in-out,
    opacity ${({ theme }) => theme.transitions.medium} ease-in-out;
  max-width: 430px;

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpoints.tablet}) {
    width: 450px;
  }

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpoints.desktop}) {
    width: 600px;
  }

  &:hover {
    opacity: ${({ theme }) => theme.opacity.opacity80};
    transform: translateY(-3px);
  }
`;

export default Employers;
