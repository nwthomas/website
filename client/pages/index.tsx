import * as React from "react";

import Employers from "../components/Employers";
import Layout from "../components/Layout";
import type { NextPage } from "next";
import styled from "styled-components";

const PAGE_NAME = "Home";

const Home: NextPage = () => {
  return (
    <Layout pageName={PAGE_NAME} withFooter>
      <RootStyles>
        <main>
          <section>
            <h1>
              Hi 👋🏻 I'm Nathan, a{" "}
              <a
                href="https://github.com/nwthomas"
                aria-label="Link to GitHub"
                rel="noopener noreferrer"
                target="_target"
              >
                software engineer
              </a>
              ,{" "}
              <a
                href="https://www.getrevue.co/profile/nathan-thomas"
                aria-label="Link to Nathan's newsletter"
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
              . I build stuff and also love{" "}
              <span>
                Bitcoin{" "}
                <a
                  href="https://bitcoin.org/bitcoin.pdf"
                  aria-label="Link to Bitcoin whitepaper"
                  rel="noopener noreferrer"
                  target="_target"
                >
                  <img
                    src="./bitcoin-logo.png"
                    alt="Bitcoin logo"
                    width={1440}
                    height={1906}
                  />
                </a>
              </span>{" "}
              and{" "}
              <span>
                Ethereum{" "}
                <a
                  href="https://ethereum.org/"
                  aria-label="Link to Ethereum.org"
                  rel="noopener noreferrer"
                  target="_target"
                >
                  <img
                    src="./eth-icon.png"
                    alt="Ethereum logo"
                    width={44}
                    height={70}
                  />
                </a>
              </span>
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

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.tablet}) {
      width: 100%;
    }

    > section {
      display: flex;

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.tablet}) {
        margin-top: ${({ theme }) => theme.spaces.xxLarge};
      }

      > div:nth-child(1) {
        width: 400px;
      }

      > h1 {
        background: ${({ theme }) => theme.colors.transparent};

        a {
          background-clip: text;
          -moz-background-clip: text;
          -webkit-background-clip: text;
          background-size: 100%;
          font-size: inherit;
          padding: ${({ theme }) => `${theme.spaces.micro} 0`};
          -moz-text-fill-color: transparent;
          -webkit-text-fill-color: transparent;
        }

        > a:nth-child(1) {
          background-image: ${({ theme }) =>
            `linear-gradient(120deg, ${theme.colorsHex.royalBlue} 0%, ${theme.colorsHex.pictonBlue} 100%)`};
        }

        > a:nth-child(2) {
          background-image: ${({ theme }) =>
            `linear-gradient(120deg, ${theme.colorsHex.royalBlue} 0%, ${theme.colorsHex.pictonBlue} 100%)`};
        }

        > a:nth-child(3) {
          background-image: ${({ theme }) =>
            `linear-gradient(120deg, ${theme.colorsHex.royalBlue} 0%, ${theme.colorsHex.pictonBlue} 100%)`};
        }

        > span {
          white-space: nowrap;
        }

        > span > a > img {
          width: 18px;

          @media only screen and (min-width: ${({ theme }) =>
              theme.breakpoints.tablet}) {
            width: 30px;
          }

          @media only screen and (min-width: ${({ theme }) =>
              theme.breakpoints.desktop}) {
            width: 40px;
          }
        }
      }
    }

    > section:nth-child(1) {
      margin-bottom: ${({ theme }) => theme.spaces.large};

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.tablet}) {
        margin-bottom: ${({ theme }) => `calc(${theme.spaces.xxLarge} * 2)`};
      }
    }
  }
`;

export default Home;
