import styled from "styled-components";
import Layout from "../components/Layout";

const PAGE_NAME = "Work";

function Work() {
  return (
    <Layout pageName={PAGE_NAME} withFooter>
      <RootStyles>
        <main>
          <section>
            <h1>
              This is all the work that I'm really proud of. I hope you enjoy
              it. 🏗
            </h1>
          </section>
          <section>
            <a
              href="https://github.com/nwthomas/personal-portfolio"
              aria-label="Link to portfolio site GitHub repository"
              rel="noopener noreferrer"
              target="_target"
            >
              <img
                alt="Macbook with screenshot of Nathan's personal site on it"
                src="./personal-site.png"
              />
              <h2>Personal Site</h2>
            </a>
            <a
              href="https://twitter.com/home"
              aria-label="Link to Twitter"
              rel="noopener noreferrer"
              target="_target"
            >
              <img
                alt="Macbook with screenshot of Twitter.com video trimmer on it"
                src="./videotrimmer.png"
              />
              <h2>Twitter Video Trimmer (beta)</h2>
            </a>
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
      display: flex;
      flex-direction: column;
      margin-bottom: ${({ theme }) =>
        `calc(${theme.appDimensions.navbarMobileHeight} / 2)`};

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.tablet}) {
        flex-direction: row;
        justify-content: space-around;
        margin-bottom: ${({ theme }) =>
          `calc(${theme.spaces.large} + ${theme.appDimensions.navbarDesktopHeight} / 2)`};
      }

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.desktop}) {
        margin-bottom: ${({ theme }) => theme.spaces.jumbo};
      }

      > a {
        align-items: center;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        margin-bottom: ${({ theme }) => theme.spaces.xxLarge};
        transition: transform ${({ theme }) => theme.transitions.medium}
            ease-in-out,
          opacity ${({ theme }) => theme.transitions.medium} ease-in-out;
        width: 100%;

        @media only screen and (min-width: ${({ theme }) =>
            theme.breakpoints.ultraWide}) {
          max-width: 700px;
        }

        > h2 {
          margin-top: ${({ theme }) => theme.spaces.medium};
        }

        &:hover {
          opacity: ${({ theme }) => theme.opacity.opacity70};
          transform: translateY(-3px);
        }
      }

      > a:last-of-type {
        margin-bottom: 0;
      }
    }
  }
`;

export default Work;
