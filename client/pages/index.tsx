import * as React from "react";

import styled, { keyframes } from "styled-components";

import { CONTENTS_ID } from "../constants/routes";
import ComputerScreen from "../components/ComputerScreen";
import { HOME_PAGE_NAME } from "../constants/seo";
import Image from "next/image";
import Layout from "../components/Layout";
import Link from "next/link";
import { NextPage } from "next";

const GITHUB_LINK_ARIA_LABEL = "Link to Nathan's GitHub page";
const TEACHING_LINK_ARIA_LABEL =
  "Link to the Code Tenderloin free bootcamp Nathan volunteers at";
const WRITING_LINK_ARIA_LABEL = "Link to Nathan's blog page";

export async function getStaticProps() {
  return {
    props: {},
  };
}

const Home: NextPage = () => {
  return (
    <Layout pageName={HOME_PAGE_NAME} withFooter>
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
                href="https://www.codetenderloin.org"
                aria-label={TEACHING_LINK_ARIA_LABEL}
                rel="noopener noreferrer"
                target="_target"
              >
                teacher
              </a>{" "}
              from <span>San Francisco</span>
            </h1>
          </section>
          <section aria-hidden>
            <div>
              <div>
                <Image
                  alt=""
                  draggable={false}
                  height="979"
                  loading="eager"
                  priority
                  src="/images/backgrounds/iphone-14-pro-max-bezel.webp"
                  width="483"
                />
                <Image
                  alt=""
                  draggable={false}
                  height="1389"
                  loading="eager"
                  priority
                  src="/images/backgrounds/twitter-web-app.webp"
                  width="642"
                />
                <div>
                  <Image
                    alt=""
                    draggable={false}
                    height="834"
                    loading="eager"
                    priority
                    src="/images/backgrounds/twitter-logo.webp"
                    width="1026"
                  />
                </div>
              </div>
            </div>
            <div>
              <div>
                <Image
                  alt=""
                  blurDataURL="/images/backgrounds/loom-logo.webp"
                  draggable={false}
                  height="333"
                  loading="eager"
                  placeholder="blur"
                  priority
                  src="/images/backgrounds/loom-logo.webp"
                  width="333"
                />
              </div>
              <ComputerScreen
                imageHeight={962}
                imageSrc="/images/backgrounds/loom-multi-clip-editing.webp"
                imageWidth={1536}
              />
            </div>
          </section>
        </main>
      </RootStyles>
    </Layout>
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
  padding: 0 var(--app-horizontal-gutters);
  width: 100%;

  > main {
    max-width: var(--app-max-width);

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.tablet}) {
      width: 100%;
    }

    > section:nth-child(1) {
      display: flex;
      margin-bottom: var(--space-medium);

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.tablet}) {
        margin-bottom: var(--space-xxlarge);
      }

      > h1 a {
        background-clip: text;
        -moz-background-clip: text;
        -webkit-background-clip: text;
        background-image: url(/images/backgrounds/noise.webp);
        background-size: 50px;
        font-family: inherit;
        font-size: inherit;
        padding: var(--space-micro) 0;
        -moz-text-fill-color: transparent;
        -webkit-text-fill-color: transparent;
        text-decoration: none;
        transition: opacity var(--transition-short) ease-in-out;

        &:hover {
          opacity: 0.8;
        }
      }

      > h1 span {
        font-family: inherit;
        white-space: nowrap;
      }
    }

    /* This whole section is messy CSS. Forgive me. It was a long week when I wrote it. */
    > section:nth-child(2) {
      align-items: center;
      display: flex;
      flex-direction: column-reverse;
      margin-bottom: var(--space-large);
      position: relative;

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.tablet}) {
        margin-bottom: var(--space-xxlarge);
      }

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.desktop}) {
        display: block;
        height: 650px;
      }

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.ultrawide}) {
        height: 750px;
      }

      /* Mock iPhone screen */
      > div:nth-child(1) {
        display: flex;
        justify-content: flex-start;
        padding-left: 12%;
        width: 100%;
        z-index: 3;

        @media only screen and (min-width: ${({ theme }) =>
            theme.breakpoints.mini}) {
          justify-content: center;
          margin-left: -40%;
          width: 100%;
        }

        @media only screen and (min-width: ${({ theme }) =>
            theme.breakpoints.tablet}) {
          margin-bottom: var(--space-medium);
        }

        @media only screen and (min-width: ${({ theme }) =>
            theme.breakpoints.desktop}) {
          display: block;
          left: 5%;
          margin-left: 0;
          padding: 0;
          position: absolute;
          top: var(--space-small);
          width: 25%;
        }

        > div:nth-child(1) {
          height: 100%;
          padding: 7px 8px 0;
          position: relative;
          width: 150px;
          transform: rotate(-5deg);

          @media only screen and (min-width: ${({ theme }) =>
              theme.breakpoints.mini}) {
            padding: 9px 11px 0;
            width: 200px;
          }

          @media only screen and (min-width: ${({ theme }) =>
              theme.breakpoints.mobile}) {
            padding: 16px 13px 0;
            width: 250px;
          }

          @media only screen and (min-width: ${({ theme }) =>
              theme.breakpoints.tablet}) {
            margin-left: 10%;
            padding: 15px 17px 0;
            transform: rotate(-3deg);
            width: 320px;
          }

          @media only screen and (min-width: ${({ theme }) =>
              theme.breakpoints.desktop}) {
            margin-left: 3%;
            padding: 5% 5.5% 0;
            width: 100%;
          }

          > img:nth-child(1) {
            bottom: 0;
            position: absolute;
            right: 0;
            top: 0;
          }

          > img:nth-child(2) {
            border-radius: var(--border-radius-large);
            overflow: hidden;
            width: 100%;

            @media only screen and (min-width: ${({ theme }) =>
                theme.breakpoints.mini}) {
              border-radius: var(--border-radius-xxlarge);
            }
          }

          /* Twitter logo */
          > div {
            bottom: var(--space-large);
            overflow: hidden;
            position: absolute;
            left: calc(var(--space-jumbo) * 1.1);
            width: 150px;
            z-index: -1;

            @media only screen and (min-width: ${({ theme }) =>
                theme.breakpoints.mini}) {
              left: calc(var(--space-jumbo) * 1.5);
              width: 180px;
            }

            @media only screen and (min-width: ${({ theme }) =>
                theme.breakpoints.mobile}) {
              left: calc(var(--space-jumbo) * 1.1);
            }

            @media only screen and (min-width: ${({ theme }) =>
                theme.breakpoints.tablet}) {
              left: calc(var(--space-jumbo) * 1.8);
              width: 280px;
            }

            @media only screen and (min-width: ${({ theme }) =>
                theme.breakpoints.desktop}) {
              bottom: auto;
              left: 70%;
              top: var(--space-xlarge);
              width: 220px;
            }
          }
        }
      }

      /* Mock computer window */
      > div:nth-child(2) {
        display: flex;
        justify-content: center;
        margin-bottom: var(--space-large);
        position: relative;
        width: 100%;
        z-index: 2;

        @media only screen and (min-width: ${({ theme }) =>
            theme.breakpoints.mini}) {
          max-width: 500px;
        }

        @media only screen and (min-width: ${({ theme }) =>
            theme.breakpoints.tablet}) {
          margin-bottom: var(--space-xxlarge);
          max-width: none;
          width: 90%;
        }

        @media only screen and (min-width: ${({ theme }) =>
            theme.breakpoints.desktop}) {
          bottom: calc(var(--space-xxlarge) + var(--space-medium));
          display: block;
          margin-bottom: 0;
          position: absolute;
          right: calc(var(--space-large) + var(--space-medium));
          width: calc(55% - var(--space-medium) * 2);
        }

        /* Rotating Loom logo */
        > div:nth-child(1) {
          animation: ${rotateAnimation} 70s linear infinite;
          border-radius: var(--border-radius-infinity);
          overflow: hidden;
          position: absolute;
          right: 5%;
          bottom: calc(var(--space-xxlarge) * -1);
          width: calc(var(--space-xxlarge) * 2);
          z-index: -1;

          @media only screen and (min-width: ${({ theme }) =>
              theme.breakpoints.mini}) {
            bottom: calc(var(--space-jumbo) * -1);
            right: 10%;
            width: calc(var(--space-xxlarge) * 3);
          }

          @media only screen and (min-width: ${({ theme }) =>
              theme.breakpoints.tablet}) {
            bottom: calc(var(--space-jumbo) * -1.5);
            right: 5%;
            width: calc(var(--space-jumbo) * 3);
          }

          @media only screen and (min-width: ${({ theme }) =>
              theme.breakpoints.desktop}) {
            bottom: auto;
            right: var(--space-medium);
            top: calc(var(--space-xlarge) * -3);
            width: 50%;
          }

          @media only screen and (min-width: ${({ theme }) =>
              theme.breakpoints.ultrawide}) {
            right: calc(var(--space-large) * -1);
            width: 40%;
          }
        }
      }
    }
  }
`;

export default Home;
