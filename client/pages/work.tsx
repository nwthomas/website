import styled from "styled-components";
import Layout from "../components/Layout";
import WorkExample from "../components/WorkExample";

const PAGE_NAME = "Work";

function Work() {
  return (
    <Layout pageName={PAGE_NAME} withFooter>
      <RootStyles>
        <main>
          <section>
            <h1>
              This is all the work that I'm really proud of. I hope you enjoy
              it. 🍵
            </h1>
          </section>
          <section>
            <WorkExample
              ariaLabel="Link to portfolio site GitHub repository"
              imageAlt="Macbook with screenshot of Nathan's personal site on it"
              imageDimensions={{ height: 735, width: 1258 }}
              imageSrc="./portfolio-site.png"
              title="Personal Site"
              url="https://github.com/nwthomas/personal-portfolio"
            />
            <WorkExample
              ariaLabel="Link to Techcrunch article about Twitter Super Follows"
              imageAlt="Macbook with screenshot of Twitter.com Super Follows on it"
              imageDimensions={{ height: 735, width: 1258 }}
              imageSrc="./super-follows.png"
              title="Twitter Super Follows"
              url="https://techcrunch.com/2021/09/01/twitter-super-follows-monetization/"
            />
            <WorkExample
              ariaLabel="Link to Jane Wong Tweet about the Twitter video trimmer"
              imageAlt="Macbook with screenshot of Twitter.com video trimmer on it"
              imageDimensions={{ height: 735, width: 1258 }}
              imageSrc="./video-trimmer.png"
              title="Twitter Video Trimmer (beta)"
              url="https://twitter.com/wongmjane/status/1418299633382559748"
            />
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

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.tablet}) {
        margin-top: ${({ theme }) => theme.spaces.large};
      }

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.desktop}) {
        margin-top: ${({ theme }) => theme.spaces.jumbo};
      }
    }

    > section:nth-child(1) {
      margin-bottom: ${({ theme }) =>
        `calc(${theme.appDimensions.navbarMobileHeight} / 2)`};

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.tablet}) {
        margin-bottom: ${({ theme }) =>
          `calc(${theme.spaces.large} + ${theme.appDimensions.navbarDesktopHeight} / 2)`};
      }

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.desktop}) {
        margin-bottom: ${({ theme }) =>
          `calc(${theme.spaces.jumbo} + ${theme.appDimensions.navbarDesktopHeight} / 2)`};
      }
    }

    > section:nth-child(2) {
      display: grid;
      grid-row-gap: ${({ theme }) => theme.spaces.large};
      margin-bottom: ${({ theme }) =>
        `calc(${theme.appDimensions.navbarMobileHeight} / 2)`};

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.tablet}) {
        grid-column-gap: ${({ theme }) => theme.spaces.xxLarge};
        grid-row-gap: ${({ theme }) => theme.spaces.xxLarge};
        grid-template-columns: 1fr;
        margin-bottom: ${({ theme }) =>
          `calc(${theme.spaces.large} + ${theme.appDimensions.navbarDesktopHeight} / 2)`};
      }

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.desktop}) {
        grid-template-columns: 1fr 1fr;
        margin-bottom: ${({ theme }) => theme.spaces.jumbo};
      }
    }
  }
`;

export default Work;
