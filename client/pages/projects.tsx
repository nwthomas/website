import { CONTENTS_ID } from "../constants/routes";
import Layout from "../components/Layout";
import { PROJECTS_PAGE_NAME } from "../constants/seo";
import WorkExample from "../components/WorkExample";
import styled from "styled-components";

function Work() {
  return (
    <Layout pageName={PROJECTS_PAGE_NAME} withFooter withPageNameEmojis>
      <RootStyles>
        <main id={CONTENTS_ID}>
          <section>
            <h1>
              This is some of the work I'm really proud of. You can find more on{" "}
              <a
                href="https://github.com/nwthomas"
                aria-label="Link to GitHub"
                rel="noopener noreferrer"
                target="_blank"
              >
                GitHub
              </a>
              .
            </h1>
          </section>
          <section>
            <ul>
              <WorkExample
                ariaLabel="Link to portfolio site GitHub repository"
                imageAlt="Macbook with screenshot of Nathan's personal site on it"
                imageDimensions={{ height: 859, width: 1407 }}
                imageSrc="/personal-portfolio.webp"
                title="Personal Site"
                url="https://github.com/nwthomas/personal-portfolio"
              />
              <WorkExample
                ariaLabel="Link to Loom blog post about low light adjustments"
                imageAlt="Macbook with screenshot of Loom.com low light adjustments"
                imageDimensions={{ height: 859, width: 1407 }}
                imageSrc="/loom-low-light.webp"
                title="Loom Low Light Adjustments"
                url="https://new.loom.com/announcements/look-your-best-with-touch-up-my-appearance-and-low-light-adjustments"
              />
              <WorkExample
                ariaLabel="Link to Loom blog post about multi-video stitching"
                imageAlt="Macbook with screenshot of Loom.com multi-clip stiching"
                imageDimensions={{ height: 859, width: 1407 }}
                imageSrc="/loom-multi-clip-editing.webp"
                title="Loom Multi-Clip Editing"
                url="https://www.loom.com/blog/video-stitching"
              />
              <WorkExample
                ariaLabel="Link to Jane Wong Tweet about the Twitter video trimmer"
                imageAlt="Macbook with screenshot of Twitter.com video trimmer"
                imageDimensions={{ height: 859, width: 1407 }}
                imageSrc="/twitter-video-trimmer.webp"
                title="Twitter Video Trimmer"
                url="https://twitter.com/wongmjane/status/1418299633382559748"
              />
              <WorkExample
                ariaLabel="Link to Twitter blog post about Twitter Super Follows"
                imageAlt="Macbook with screenshot of Twitter.com Super Follows on it"
                imageDimensions={{ height: 859, width: 1407 }}
                imageSrc="/twitter-super-follows.webp"
                title="Twitter Super Follows"
                url="https://blog.twitter.com/en_us/topics/product/2021/introducing-super-follows"
              />
              <WorkExample
                ariaLabel="Link to Twitter blog post about Fleets deprecation"
                imageAlt="Macbook with screenshot of Twitter.com Fleets on it"
                imageDimensions={{ height: 859, width: 1407 }}
                imageSrc="/twitter-fleets.webp"
                title="Twitter Fleets"
                url="https://blog.twitter.com/en_us/topics/product/2021/goodbye-fleets"
              />
            </ul>
          </section>
        </main>
      </RootStyles>
    </Layout>
  );
}

const RootStyles = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => `0 ${theme.appDimensions.appHorizontalGutters}`};
  width: 100%;

  > main {
    max-width: ${({ theme }) => theme.appDimensions.appMaxWidth};
    width: 100%;

    > section {
      display: flex;
    }

    > section:nth-child(1) {
      margin-bottom: ${({ theme }) => theme.spaces.medium};

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.tablet}) {
        margin-bottom: ${({ theme }) => theme.spaces.xxLarge};
      }

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
    }

    > section:nth-child(2) {
      width: 100%;

      > ul {
        display: grid;
        grid-row-gap: ${({ theme }) => theme.spaces.medium};
        margin-bottom: ${({ theme }) => theme.spaces.large};
        width: 100%;

        @media only screen and (min-width: ${({ theme }) =>
            theme.breakpoints.tablet}) {
          grid-column-gap: ${({ theme }) => theme.spaces.xxLarge};
          grid-row-gap: ${({ theme }) => theme.spaces.xxLarge};
          grid-template-columns: 1fr;
          margin-bottom: ${({ theme }) => theme.spaces.xxLarge};
        }

        @media only screen and (min-width: ${({ theme }) =>
            theme.breakpoints.desktop}) {
          grid-template-columns: 1fr 1fr;
        }
      }
    }
  }
`;

export default Work;
