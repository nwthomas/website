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
const TEACHING_LINK_ARIA_LABEL = "Link to presentation from Nathan on YouTube";
const WRITING_LINK_ARIA_LABEL = "Link to Nathan's blog page";

const COMPUTER_ALT_TEXT =
  "Computer screen displaying Loom web app video trimming";
const IPHONE_ALT_TEXT = "iPhone displaying Twitter web app";

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
                  draggable={false}
                  height="910"
                  loading="eager"
                  priority
                  quality={100}
                  src="/images/backgrounds/gradient.webp"
                  width="1365"
                />
              </div>
              <div>
                <div>
                  <Image
                    alt=""
                    aria-hidden={true}
                    draggable={false}
                    height="979"
                    loading="eager"
                    priority
                    quality={100}
                    src="/images/backgrounds/iphone-14-pro-max-bezel.webp"
                    width="483"
                  />
                  <Image
                    alt={IPHONE_ALT_TEXT}
                    draggable={false}
                    height="1389"
                    loading="eager"
                    priority
                    quality={100}
                    src="/images/backgrounds/twitter-web-app.webp"
                    width="642"
                  />
                </div>
              </div>
              <div>
                <div>
                  <Image
                    alt="Loom logo"
                    draggable={false}
                    height="333"
                    loading="eager"
                    priority
                    quality={100}
                    src="/images/backgrounds/loom-logo.webp"
                    width="333"
                  />
                </div>
                <ComputerScreen
                  imageAlt={COMPUTER_ALT_TEXT}
                  imageHeight={962}
                  imageSrc="/images/backgrounds/loom-multi-clip-editing.webp"
                  imageWidth={1536}
                />
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
      align-items: center;
      display: flex;
      flex-direction: column;
      margin-bottom: ${({ theme }) => theme.spaces.large};
      position: relative;

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.tablet}) {
        height: 700px;
        margin-bottom: ${({ theme }) => theme.spaces.xxLarge};
        overflow: visible;
      }

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.ultrawide}) {
        height: 750px;
      }

      /* Gradient background */
      > div:nth-child(1) {
        border-radius: ${({ theme }) => theme.borderRadii.medium};
        filter: blur(${({ theme }) => theme.spaces.xxLarge});
        height: auto;
        left: 0;
        opacity: ${({ theme }) => theme.opacity.opacity50};
        position: absolute;
        right: 0;
        top: ${({ theme }) => `calc(${theme.spaces.jumbo} * 2)`};
        width: 100%;
        z-index: 0;

        @media only screen and (min-width: ${({ theme }) =>
            theme.breakpoints.desktop}) {
          filter: blur(${({ theme }) => theme.spaces.jumbo});
          border-radius: ${({ theme }) => theme.borderRadii.large};
          height: 50%;
          left: ${({ theme }) => theme.spaces.medium};
          opacity: ${({ theme }) => theme.opacity.opacity30};
          top: ${({ theme }) => theme.spaces.xxLarge};
          transform: rotate(-10deg);
          width: 55%;
        }
      }

      /* Iphone demo */
      > div:nth-child(2) {
        display: flex;
        justify-content: center;
        margin-bottom: ${({ theme }) => theme.spaces.xxLarge};
        padding: 0 ${({ theme }) => theme.spaces.xxLarge};
        width: 100%;
        z-index: 3;

        @media only screen and (min-width: ${({ theme }) =>
            theme.breakpoints.tablet}) {
          left: 0;
          margin-bottom: 0;
          position: absolute;
          top: ${({ theme }) => theme.spaces.small};
        }

        @media only screen and (min-width: ${({ theme }) =>
            theme.breakpoints.desktop}) {
          display: block;
          left: 10%;
          padding: 0;
          width: 25%;
        }

        > div {
          height: 100%;
          padding: 16px 13px 0;
          position: relative;
          width: 220px;
          transform: rotate(2deg);

          @media only screen and (min-width: ${({ theme }) =>
              theme.breakpoints.desktop}) {
            padding: 5% 5.5% 0;
            transform: rotate(-2deg);
            width: 100%;
          }

          > img:nth-child(1) {
            bottom: 0;
            position: absolute;
            right: 0;
            top: 0;
          }

          > img:nth-child(2) {
            border-radius: ${({ theme }) => theme.borderRadii.xxLarge};
            overflow: hidden;
            width: 100%;
          }
        }
      }

      /* Mock computer window */
      > div:nth-child(3) {
        display: flex;
        justify-content: center;
        width: 100%;
        z-index: 2;

        @media only screen and (min-width: ${({ theme }) =>
            theme.breakpoints.desktop}) {
          bottom: ${({ theme }) =>
            `calc(${theme.spaces.xxLarge} + ${theme.spaces.medium})`};
          display: block;
          max-width: none;
          position: absolute;
          right: ${({ theme }) =>
            `calc(${theme.spaces.large} + ${theme.spaces.medium})`};
          width: calc(55% - ${({ theme }) => theme.spaces.medium} * 2);
        }

        /* Rotating Loom logo */
        > div:nth-child(1) {
          animation: ${rotateAnimation} 70s linear infinite;
          position: absolute;
          right: 10%;
          top: ${({ theme }) => `calc(${theme.spaces.jumbo} * 4)`};
          width: ${({ theme }) => `calc(${theme.spaces.jumbo} * 2)`};
          z-index: -1;

          @media only screen and (min-width: ${({ theme }) =>
              theme.breakpoints.desktop}) {
            bottom: none;
            right: ${({ theme }) => theme.spaces.medium};
            top: ${({ theme }) => `calc(-${theme.spaces.xLarge} * 3)`};
            width: 50%;
          }

          @media only screen and (min-width: ${({ theme }) =>
              theme.breakpoints.ultrawide}) {
            right: ${({ theme }) => `-${theme.spaces.large}`};
            width: 40%;
          }
        }
      }
    }
  }
`;

export default Home;
