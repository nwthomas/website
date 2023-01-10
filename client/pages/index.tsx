import * as React from "react";

import { CONTENTS_ID } from "../constants/routes";
import { HOME_PAGE_NAME } from "../constants/seo";
import Layout from "../components/Layout";
import Link from "next/link";
import { NextPage } from "next";
import styled from "styled-components";

const Home: NextPage = () => {
  return (
    <Layout pageName={HOME_PAGE_NAME} withFooter withPageNameEmojis>
      <RootStyles>
        <main id={CONTENTS_ID}>
          <section>
            <h1>
              Hi. I'm <span>Nathan 👋🏻,</span> a{" "}
              <a
                href="https://github.com/nwthomas"
                aria-label="Link to GitHub"
                rel="noopener noreferrer"
                target="_blank"
              >
                software engineer
              </a>
              , <Link href="/blog">writer</Link>, and{" "}
              <a
                href="https://www.youtube.com/watch?v=GNrQTbIFsG4&t=2909s"
                aria-label="Link to presentation on YouTube"
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
      margin-bottom: ${({ theme }) => theme.spaces.medium};

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.tablet}) {
        margin-bottom: ${({ theme }) =>
          `calc(${theme.spaces.xxLarge} + ${theme.spaces.medium})`};
        margin-top: ${({ theme }) => theme.spaces.medium};
      }

      > h1 a {
        background-clip: text;
        -moz-background-clip: text;
        -webkit-background-clip: text;
        background-image: ${({ theme }) => theme.gradients.getLinkText()};
        background-size: 100%;
        font-size: inherit;
        margin-right: -0.4em;
        padding: ${({ theme }) =>
          `${theme.spaces.micro} 0.4em ${theme.spaces.micro} 0`};
        -moz-text-fill-color: transparent;
        -webkit-text-fill-color: transparent;
        text-decoration: none;
      }

      > h1 > span {
        white-space: nowrap;
      }
    }
  }
`;

export default Home;
