import * as React from "react";

import { CONTENTS_ID } from "../constants/routes";
import { HOME_PAGE_NAME } from "../constants/seo";
import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout";
import Link from "next/link";
import { NextPage } from "next";
import styled from "styled-components";

const GITHUB_LINK_ARIA_LABEL = "Link to Nathan's GitHub page";
const WRITING_LINK_ARIA_LABEL = "Link to Nathan's blog page";
const TEACHING_LINK_ARIA_LABEL = "Link to presentation from Nathan on YouTube";

export async function getStaticProps() {
  return {
    props: {},
  };
}

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <link
          rel="preload"
          href="/images/backgrounds/gradient.webp"
          as="image"
        />
      </Head>
      <Layout pageName={HOME_PAGE_NAME} withFooter withPageNameEmojis>
        <RootStyles>
          <main id={CONTENTS_ID}>
            <section>
              <h1>
                Hi 👋🏻 I'm Nathan, a{" "}
                <a
                  href="https://github.com/nwthomas"
                  aria-label={GITHUB_LINK_ARIA_LABEL}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  software engineer
                </a>
                ,{" "}
                <Link
                  aria-label={WRITING_LINK_ARIA_LABEL}
                  href="/blog"
                  prefetch={false}
                >
                  writer
                </Link>
                , and{" "}
                <a
                  href="https://www.youtube.com/watch?v=GNrQTbIFsG4&t=2909s"
                  aria-label={TEACHING_LINK_ARIA_LABEL}
                  rel="noopener noreferrer"
                  target="_target"
                >
                  teacher
                </a>{" "}
                from <span>San Francisco</span>
              </h1>
            </section>
            <section>
              <div>
                <Image
                  alt="Gradient colors"
                  height="910"
                  loading="eager"
                  priority
                  quality={100}
                  src="/images/backgrounds/gradient.webp"
                  width="1365"
                />
              </div>
              <div />
            </section>
          </main>
        </RootStyles>
      </Layout>
    </>
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

    > section:nth-child(1) {
      display: flex;
      margin-bottom: ${({ theme }) => theme.spaces.medium};

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.tablet}) {
        margin-bottom: ${({ theme }) => theme.spaces.xxLarge};
      }

      > h1 a {
        background-clip: text;
        -moz-background-clip: text;
        -webkit-background-clip: text;
        background-image: url(/noise.webp);
        background-size: 50px;
        font-family: inherit;
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

      > h1 span {
        font-family: inherit;
        white-space: nowrap;
      }
    }

    > section:nth-child(2) {
      display: flex;
      height: 800px;
      margin-bottom: ${({ theme }) => theme.spaces.medium};
      position: relative;

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.tablet}) {
        margin-bottom: ${({ theme }) => theme.spaces.xxLarge};
      }

      > div:nth-child(1) {
        height: 35%;
        left: ${({ theme }) => theme.spaces.medium};
        overflow: hidden;
        position: absolute;
        top: ${({ theme }) => theme.spaces.xxLarge};
        width: 60%;
        z-index: 1;
      }

      > div:nth-child(2) {
        background-color: ${({ theme }) =>
          theme.colors.bodyBackgroundAccentThree};
        bottom: ${({ theme }) => theme.spaces.xxLarge};
        height: 52%;
        position: absolute;
        right: ${({ theme }) => theme.spaces.large};
        width: 55%;
      }

      > div {
        border-radius: ${({ theme }) => theme.borderRadii.medium};
        -webkit-box-shadow: ${({ theme }) => theme.dropshadows.small};
        -moz-box-shadow: ${({ theme }) => theme.dropshadows.small};
        box-shadow: ${({ theme }) => theme.dropshadows.small};
      }
    }
  }
`;

export default Home;
