import * as React from "react";

import Employers from "../components/Employers";
import { HOME_PAGE_NAME } from "../constants/seo";
import Layout from "../components/Layout";
import Link from "next/link";
import type { NextPage } from "next";
import styled from "styled-components";

const Home: NextPage = () => {
  return (
    <Layout pageName={HOME_PAGE_NAME} withFooter withPageNameEmojis>
      <RootStyles>
        <main>
          <section>
            <h1>
              Hi. I'm <span>Nathan 👋🏻,</span> a{" "}
              <a
                href="https://github.com/nwthomas"
                aria-label="Link to GitHub"
                rel="noopener noreferrer"
                target="_target"
              >
                software engineer
              </a>
              , <Link href="/blog">writer</Link>, and{" "}
              <a
                href="https://www.codetenderloin.org/code-ramp-course"
                aria-label="Link to Code Tenderloin's Code Ramp bootcamp"
                rel="noopener noreferrer"
                target="_target"
              >
                teacher
              </a>{" "}
              in San Francisco.{" "}
              <span>
                Let's <Link href="/contact">talk</Link>.
              </span>
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
  margin: ${({ theme }) => `0 ${theme.appDimensions.appHorizontalGutters}`};
  width: 100%;

  > main {
    max-width: ${({ theme }) => theme.appDimensions.appMaxWidth};

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.tablet}) {
      width: 100%;
    }

    > section {
      display: flex;
      margin-bottom: ${({ theme }) => theme.spaces.large};

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.tablet}) {
        margin-top: ${({ theme }) => theme.spaces.medium};
        margin-bottom: ${({ theme }) =>
          `calc(${theme.spaces.medium} + ${theme.spaces.xxLarge})`};
      }

      > h1 {
        background: ${({ theme }) => theme.colors.transparent};

        a {
          background-clip: text;
          background-image: ${({ theme }) =>
            `linear-gradient(120deg, ${theme.colorsHex.royalBlue} 0%, ${theme.colorsHex.pictonBlue} 100%)`};
          -moz-background-clip: text;
          -webkit-background-clip: text;
          background-image: ${({ theme }) => theme.gradients.getLinkText()};
          background-size: 100%;
          font-size: inherit;
          padding: ${({ theme }) => `${theme.spaces.micro} 0`};
          -moz-text-fill-color: transparent;
          -webkit-text-fill-color: transparent;
          text-decoration: none;
          transition: opacity ${({ theme }) => theme.transitions.short}
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
  }
`;

export default Home;
