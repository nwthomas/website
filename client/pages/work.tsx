import Layout from "../components/Layout";
import WorkExample from "../components/WorkExample";
import styled from "styled-components";

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
              imageSrc="/portfolio-site.png"
              title="Personal Site"
              url="https://github.com/nwthomas/personal-portfolio"
            />
            <WorkExample
              ariaLabel="Link to Twitter blog post about Twitter Super Follows"
              imageAlt="Macbook with screenshot of Twitter.com Super Follows on it"
              imageDimensions={{ height: 735, width: 1258 }}
              imageSrc="/super-follows.png"
              title="Twitter Super Follows"
              url="https://blog.twitter.com/en_us/topics/product/2021/introducing-super-follows"
            />
            <WorkExample
              ariaLabel="Link to Jane Wong Tweet about the Twitter video trimmer"
              imageAlt="Macbook with screenshot of Twitter.com video trimmer on it"
              imageDimensions={{ height: 735, width: 1258 }}
              imageSrc="/video-trimmer.png"
              title="Twitter Video Trimmer"
              url="https://twitter.com/wongmjane/status/1418299633382559748"
            />
            <WorkExample
              ariaLabel="Link to Twitter blog post about Fleets deprecation"
              imageAlt="Macbook with screenshot of Twitter.com Fleets on it"
              imageDimensions={{ height: 735, width: 1258 }}
              imageSrc="/fleets.png"
              title="Twitter Fleets"
              url="https://blog.twitter.com/en_us/topics/product/2021/goodbye-fleets"
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
        margin-top: ${({ theme }) => theme.spaces.xxLarge};
      }
    }

    > section:nth-child(1) {
      margin-bottom: ${({ theme }) => theme.spaces.large};

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.desktop}) {
        margin-bottom: ${({ theme }) => `calc(${theme.spaces.xxLarge} * 2)`};
      }
    }

    > section:nth-child(2) {
      display: grid;
      grid-row-gap: ${({ theme }) => theme.spaces.large};
      margin-bottom: ${({ theme }) => theme.spaces.large};

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.tablet}) {
        grid-column-gap: ${({ theme }) => theme.spaces.xxLarge};
        grid-row-gap: ${({ theme }) => theme.spaces.xxLarge};
        grid-template-columns: 1fr;
        margin-bottom: ${({ theme }) => `calc(${theme.spaces.xxLarge} * 2)`};
      }

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.desktop}) {
        grid-template-columns: 1fr 1fr;
      }
    }
  }
`;

export default Work;
