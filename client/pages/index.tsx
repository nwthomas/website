import * as React from "react";

import Employers from "../components/Employers";
import Layout from "../components/Layout";
import Link from "next/link";
import type { NextPage } from "next";
import styled from "styled-components";

const PAGE_NAME = "Nathan Thomas";

const Home: NextPage = () => {
  return (
    <Layout pageName={PAGE_NAME} withFooter>
      <RootStyles>
        <main>
          <section>
            <h1>
              I'm Nathan 👋🏻, a{" "}
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
                href="https://www.codetenderloin.org/code-ramp-course"
                aria-label="Link to Code Tenderloin's Code Ramp bootcamp"
                rel="noopener noreferrer"
                target="_target"
              >
                teacher
              </a>{" "}
              in San Francisco. Let's <Link href="/contact">talk</Link>.
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
        margin-top: ${({ theme }) => theme.spaces.medium};
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
          background-image: ${({ theme }) => theme.gradients.getLinkText()};
          background-size: 100%;
          font-size: inherit;
          padding: ${({ theme }) => `${theme.spaces.micro} 0`};
          -moz-text-fill-color: transparent;
          -webkit-text-fill-color: transparent;
          text-decoration: none;
          transition: opacity ${({ theme }) => theme.transitions.medium}
            ease-in-out;

          &:hover {
            opacity: ${({ theme }) => theme.opacity.opacity80};
          }
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
        margin-bottom: ${({ theme }) =>
          `calc(${theme.spaces.medium} + ${theme.spaces.xxLarge})`};
      }
    }

    > div {
      margin-bottom: ${({ theme }) => theme.spaces.large};

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.tablet}) {
        margin-bottom: ${({ theme }) =>
          `calc(${theme.spaces.medium} + ${theme.spaces.xxLarge})`};
      }
    }
  }
`;

export default Home;
