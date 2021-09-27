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
              . I love building stuff with Bitcoin and Ethereum because they're
              amazing.
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
          background-image: linear-gradient(
            to right,
            #ffecd2 0%,
            #fdd2c4 20%,
            #fcb69f 45%,
            #ffa099 70%
          );
        }

        > a:nth-child(2) {
          background-image: linear-gradient(120deg, #ffa099 0%, #ff8177 100%);
        }

        > a:nth-child(3) {
          background-image: linear-gradient(
            to right,
            #ff8177 0%,
            #ff867a 0%,
            #ff8c7f 21%,
            #f99185 52%,
            #cf556c 78%,
            #b12a5b 100%
          );
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
          theme.breakpoints.dtablet}) {
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
