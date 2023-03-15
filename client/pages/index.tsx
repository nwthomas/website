import * as React from "react";

import styled, { keyframes } from "styled-components";

import { CONTENTS_ID } from "../constants/routes";
import ComputerScreen from "../components/ComputerScreen";
import { HOME_PAGE_NAME } from "../constants/seo";
import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout";
import Link from "next/link";
import { NextPage } from "next";

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
              <div>
                <div>
                  <Image
                    alt="Loom logo"
                    height="333"
                    loading="eager"
                    priority
                    quality={100}
                    src="/images/backgrounds/loom-logo.webp"
                    width="333"
                  />
                </div>
                <ComputerScreen
                  imageAlt="Computer screen displaying Loom web app video trimming"
                  imageHeight={481}
                  imageSrc="/images/backgrounds/loom-multi-clip-editing.webp"
                  imageWidth={768}
                />
              </div>
              <div>
                <div>
                  <Image
                    alt=""
                    aria-hidden={true}
                    height="979"
                    loading="eager"
                    priority
                    quality={100}
                    src="/images/backgrounds/iphone-14-pro-max-bezel.webp"
                    width="483"
                  />
                  <Image
                    alt="iPhone displaying Twitter web app"
                    height="928"
                    loading="eager"
                    priority
                    quality={100}
                    src="/images/backgrounds/twitter-web-app.webp"
                    width="926"
                  />
                </div>
              </div>
            </section>
          </main>
        </RootStyles>
      </Layout>
    </>
  );
};

const rotateAnimation = keyframes`
  100% {
    transform: rotate(360deg);
  };
`;

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
      height: 750px;
      margin-bottom: ${({ theme }) => theme.spaces.medium};
      position: relative;

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.tablet}) {
        margin-bottom: ${({ theme }) => theme.spaces.xxLarge};
      }

      /* Gradient background */
      > div:nth-child(1) {
        border-radius: ${({ theme }) => theme.borderRadii.large};
        -webkit-box-shadow: ${({ theme }) => theme.dropshadows.small};
        -moz-box-shadow: ${({ theme }) => theme.dropshadows.small};
        box-shadow: ${({ theme }) => theme.dropshadows.small};
        height: 35%;
        left: ${({ theme }) => theme.spaces.medium};
        overflow: hidden;
        position: absolute;
        top: ${({ theme }) => theme.spaces.xxLarge};
        width: 60%;
        z-index: 1;
      }

      /* Solid color background */
      > div:nth-child(2) {
        background-color: ${({ theme }) =>
          theme.colors.bodyBackgroundAccentThree};
        border-radius: ${({ theme }) => theme.borderRadii.large};
        -webkit-box-shadow: ${({ theme }) => theme.dropshadows.small};
        -moz-box-shadow: ${({ theme }) => theme.dropshadows.small};
        box-shadow: ${({ theme }) => theme.dropshadows.small};
        bottom: ${({ theme }) => theme.spaces.xxLarge};
        height: 60%;
        position: absolute;
        right: ${({ theme }) => theme.spaces.large};
        width: 55%;
      }

      /* Mock computer window */
      > div:nth-child(3) {
        bottom: ${({ theme }) =>
          `calc(${theme.spaces.xxLarge} + ${theme.spaces.medium})`};
        position: absolute;
        right: ${({ theme }) =>
          `calc(${theme.spaces.large} + ${theme.spaces.medium})`};
        width: calc(55% - ${({ theme }) => theme.spaces.medium} * 2);
        z-index: 2;

        /* Rotating Loom logo */
        > div:nth-child(1) {
          animation: ${rotateAnimation} 60s linear infinite;
          position: absolute;
          right: ${({ theme }) => `-${theme.spaces.xLarge}`};
          top: ${({ theme }) => `calc(-${theme.spaces.large} * 2)`};
          z-index: -1;
        }
      }

      /* Iphone demo */
      > div:nth-child(4) {
        position: absolute;
        left: 10%;
        top: ${({ theme }) => theme.spaces.medium};
        width: 25%;
        z-index: 3;

        > div {
          height: 100%;
          padding: 5%;
          position: relative;
          width: 100%;

          > img:nth-child(1) {
            bottom: 0;
            position: absolute;
            right: 0;
            top: 0;
          }

          > img:nth-child(2) {
            border-radius: ${({ theme }) => theme.borderRadii.xxLarge};
            overflow: hidden;
          }
        }
      }
    }
  }
`;

export default Home;
