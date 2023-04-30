import * as React from "react";

import { CONTENTS_ID } from "../constants/routes";
import { HOME_PAGE_NAME } from "../constants/seo";
import Layout from "../components/Layout";
import Link from "next/link";
import { NextPage } from "next";
import styled from "styled-components";

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
      <div className="flex flex-col items-center">
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
                href="https://www.codetenderloin.org/code-ramp-course"
                aria-label={TEACHING_LINK_ARIA_LABEL}
                rel="noopener noreferrer"
                target="_target"
              >
                teacher
              </a>{" "}
              from <span className="font-inherit">San Francisco</span>
            </h1>
          </section>
        </main>
      </div>
    </Layout>
  );
};

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
    }
  }
`;

export default Home;
