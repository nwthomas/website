import type { NextPage } from "next";
import styled from "styled-components";
import Layout from "../components/Layout";
import Employers from "../components/Employers";

const PAGE_NAME = "Home";

const Home: NextPage = () => {
  return (
    <Layout pageName={PAGE_NAME}>
      <RootStyles>
        <main>
          <section>
            <h1>
              Hey, I'm Nathan. 👋🏻 I'm a{" "}
              <a
                href="https://github.com/nwthomas"
                aria-label="Link to GitHub"
                rel="noopener noreferrer"
                target="_target"
              >
                full stack software engineer
              </a>
              ,{" "}
              <a
                href="https://dev.to/nwthomas"
                aria-label="Link to writing on Dev.to"
                rel="noopener noreferrer"
                target="_target"
              >
                writer
              </a>
              , and{" "}
              <a
                href="https://www.youtube.com/watch?v=GNrQTbIFsG4&t=2909s"
                aria-label="Link to presentation on YouTube"
                rel="noopener noreferrer"
                target="_target"
              >
                teacher
              </a>
              . I love building with Bitcoin{" "}
              <a
                href="https://bitcoin.org/bitcoin.pdf"
                aria-label="Link to Bitcoin whitepaper"
                rel="noopener noreferrer"
                target="_target"
              >
                <img src="./bitcoin-logo.png" alt="Bitcoin logo" />
              </a>{" "}
              and Ethereum{" "}
              <a
                href="https://ethereum.org/"
                aria-label="Link to Ethereum.org"
                rel="noopener noreferrer"
                target="_target"
              >
                <img src="./eth-icon.png" alt="Ethereum logo" />
              </a>
              .
            </h1>
          </section>
          <Employers />
        </main>
      </RootStyles>
    </Layout>
  );
};

const RootStyles = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => `0 ${theme.appDimensions.appHorizontalGutters}`};
  width: 100%;

  > main {
    max-width: ${({ theme }) => theme.appDimensions.appMaxWidth};
    width: 100%;

    > section {
      display: flex;

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.tablet}) {
        margin-top: ${({ theme }) => theme.spaces.large};
      }

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.desktop}) {
        margin-top: ${({ theme }) => theme.spaces.jumbo};
      }

      > div:nth-child(1) {
        width: 400px;
      }

      > h1 {
        > a {
          background-clip: text;
          background-size: 100%;
          -webkit-background-clip: text;
          -moz-background-clip: text;
          -webkit-text-fill-color: transparent;
          -moz-text-fill-color: transparent;
          font-size: inherit;
        }

        > a:nth-child(1) {
          background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
        }

        > a:nth-child(2) {
          background-image: linear-gradient(120deg, #8ec5fc 0%, #7579ff 100%);
        }

        > a:nth-child(3) {
          background-image: linear-gradient(120deg, #7579ff 0%, #b224ef 100%);
        }

        > a:nth-child(4) > img {
          margin-left: -1px;
          margin-right: -1px;
          width: 40px;
        }

        > a:nth-child(5) > img {
          margin-left: -3px;
          width: 35px;
        }
      }
    }

    > section:nth-child(1) {
      margin-bottom: ${({ theme }) =>
        `calc(${theme.appDimensions.navbarHeight} / 2)`};

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.tablet}) {
        margin-bottom: ${({ theme }) =>
          `calc(${theme.spaces.large} + ${theme.appDimensions.navbarHeight} / 2)`};
      }

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.desktop}) {
        margin-bottom: ${({ theme }) =>
          `calc(${theme.spaces.jumbo} + ${theme.appDimensions.navbarHeight} / 2)`};
      }
    }

    > section:nth-child(2) {
      margin-bottom: ${({ theme }) =>
        `calc(${theme.appDimensions.navbarHeight} / 2)`};

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.tablet}) {
        margin-bottom: ${({ theme }) =>
          `calc(${theme.spaces.large} + ${theme.appDimensions.navbarHeight} / 2)`};
      }

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.desktop}) {
        margin-bottom: ${({ theme }) => theme.spaces.jumbo};
      }
    }
  }
`;

export default Home;
