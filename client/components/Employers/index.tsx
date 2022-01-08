import * as React from "react";
import styled from "styled-components";

function Employers() {
  return (
    <RootStyles>
      <div>
        <h2>Currently</h2>
        <LoomLogo>
          <a
            href="https://www.loom.com"
            aria-label="Link to Loom"
            rel="noopener noreferrer"
            target="_target"
          >
            <img
              src="loom-logo.png"
              alt="Loom logo"
              width={1000}
              height={1000}
            />
          </a>
        </LoomLogo>
      </div>
      <div>
        <h2>Previously</h2>
        <TwitterLogo>
          <a
            href="https://twitter.com/nwthomas_"
            aria-label="Link to Twitter profile"
            rel="noopener noreferrer"
            target="_target"
          >
            <img
              src="twitter-logo.png"
              alt="Twitter logo"
              width={1036}
              height={834}
            />
          </a>
        </TwitterLogo>
      </div>
    </RootStyles>
  );
}

const RootStyles = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.spaces.large};

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpoints.tablet}) {
    flex-direction: row;
    margin-bottom: ${({ theme }) => `calc(${theme.spaces.xxLarge} * 2)`};
  }

  h2 {
    margin-bottom: ${({ theme }) => theme.spaces.medium};

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.tablet}) {
      margin-bottom: ${({ theme }) => theme.spaces.large};
    }
  }

  > div:nth-child(1) {
    margin-bottom: ${({ theme }) => theme.spaces.large};
    max-width: 250px;

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.tablet}) {
      margin-bottom: 0;
      margin-right: 150px;
      max-width: 315px;
    }

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.desktop}) {
      margin-right: 220px;
    }
  }
`;

const LoomLogo = styled.div`
  transition: transform ${({ theme }) => theme.transitions.medium} ease-in-out,
    opacity ${({ theme }) => theme.transitions.medium} ease-in-out;
  width: 130px;

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

const TwitterLogo = styled.div`
  transition: transform ${({ theme }) => theme.transitions.medium} ease-in-out,
    opacity ${({ theme }) => theme.transitions.medium} ease-in-out;
  width: 130px;

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpoints.tablet}) {
    width: 182px;
  }

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpoints.desktop}) {
    width: 225px;
  }

  &:hover {
    opacity: ${({ theme }) => theme.opacity.opacity70};
    transform: translateY(-3px);
  }
`;

export default Employers;
