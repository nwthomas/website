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
              alt="Loom logo"
              height={1000}
              src="/loom-logo.webp"
              width={1000}
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
              alt="Twitter logo"
              height={834}
              src="/twitter-logo.webp"
              width={1036}
            />
          </a>
        </TwitterLogo>
      </div>
    </RootStyles>
  );
}

const RootStyles = styled.section`
  display: flex;
  flex-direction: column;

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpoints.tablet}) {
    flex-direction: row;
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

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.tablet}) {
      margin-bottom: 0;
      margin-right: ${({ theme }) => `calc(${theme.spaces.xxLarge} * 2)`};
      max-width: 150px;
    }

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.desktop}) {
      max-width: 250px;
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
    opacity: ${({ theme }) => theme.opacity.opacity90};
    transform: translateY(-1px);
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
    opacity: ${({ theme }) => theme.opacity.opacity90};
    transform: translateY(-1px);
  }
`;

export default Employers;
