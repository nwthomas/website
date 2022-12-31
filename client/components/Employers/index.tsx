import * as React from "react";
import Image from "next/image";
import styled from "styled-components";

function Employers() {
  return (
    <RootStyles>
      <div>
        <h2>Currently</h2>
        <LoomLogo>
          <a
            aria-label="Link to Loom"
            href="https://www.loom.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Image
              alt="Loom logo"
              draggable={false}
              height={1000}
              priority
              quality={50}
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
            target="_blank"
          >
            <Image
              alt="Twitter logo"
              draggable={false}
              height={834}
              priority
              quality={50}
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
    margin-bottom: ${({ theme }) => theme.spaces.medium};

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.tablet}) {
      margin-bottom: 0;
      margin-right: ${({ theme }) => `calc(${theme.spaces.xxLarge} * 2)`};
      max-width: 150px;
    }

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.desktop}) {
      margin-bottom: 0;
      margin-right: ${({ theme }) => `calc(${theme.spaces.xxLarge} * 3)`};
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
  max-width: 130px;
  width: 100%;

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpoints.tablet}) {
    max-width: 100%;
    width: 150px;
  }

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpoints.desktop}) {
    max-width: 100%;
    width: 185px;
  }

  &:hover {
    opacity: ${({ theme }) => theme.opacity.opacity80};
    transform: translateY(-1px);
  }
`;

const TwitterLogo = styled.div`
  transition: transform ${({ theme }) => theme.transitions.medium} ease-in-out,
    opacity ${({ theme }) => theme.transitions.medium} ease-in-out;
  max-width: 130px;
  width: 100%;

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpoints.tablet}) {
    max-width: 100%;
    width: 182px;
  }

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpoints.desktop}) {
    max-width: 100%;
    width: 225px;
  }

  &:hover {
    opacity: ${({ theme }) => theme.opacity.opacity80};
    transform: translateY(-1px);
  }
`;

export default Employers;
