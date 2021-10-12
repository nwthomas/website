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
              it. 🧙🏻‍♂️
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
                alt="Macbook with screenshot of Nathan's portfolio site on it"
                src="./portfolio-site.png"
              />
              <h2>Portfolio Site</h2>
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
      margin-bottom: ${({ theme }) => theme.spaces.large};

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.tablet}) {
        margin-bottom: ${({ theme }) => theme.spaces.xLarge};
      }
    }

    > section:nth-child(2) {
      display: flex;
      margin-bottom: ${({ theme }) =>
        `calc(${theme.appDimensions.navbarMobileHeight} / 2)`};

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.tablet}) {
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
    }
  }
`;

export default Work;
