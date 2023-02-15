import * as React from "react";

import { CONTENTS_ID } from "../constants/routes";
import { HOME_PAGE_NAME } from "../constants/seo";
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
    <Layout pageName={HOME_PAGE_NAME} withFooter withPageNameEmojis>
      <RootStyles>
        <main id={CONTENTS_ID}>
          <section>
            <h1>
              Hi 👋🏻 I'm a{" "}
              <a
                href="https://github.com/nwthomas"
                aria-label={GITHUB_LINK_ARIA_LABEL}
                rel="noopener noreferrer"
                target="_blank"
              >
                software engineer
              </a>
              ,{" "}
              <Link aria-label={WRITING_LINK_ARIA_LABEL} href="/blog">
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
              living in <span>San Francisco</span>
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
      margin-bottom: ${({ theme }) => theme.spaces.medium};

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.tablet}) {
        margin-bottom: ${({ theme }) => theme.spaces.xxLarge};
      }

      > h1 {
        > a {
          color: ${({ theme }) => theme.colors.textAccentOne};
          font-family: inherit;
          font-size: inherit;
          transition: color ${({ theme }) => theme.transitions.short}
            ease-in-out;

          &:hover {
            color: ${({ theme }) => theme.colors.textAccentTwo};
          }
        }

        > span {
          font-family: inherit;
          white-space: nowrap;
        }
      }
    }
  }
`;

export default Home;
