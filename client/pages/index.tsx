import type { NextPage } from "next";
import styled from "styled-components";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  return (
    <Layout pageName="Home">
      <RootStyles>
        <main>
          <section>
            <h1>
              Hey, I'm Nathan. 👋🏻 I'm a{" "}
              <a
                href="https://github.com/nwthomas"
                aria-label="Link to GitHub"
                rel="noopener noreferrer"
                target="_target"
              >
                full stack software engineer
              </a>
              ,{" "}
              <a
                href=""
                aria-label="Link to writing"
                rel="noopener noreferrer"
                target="_target"
              >
                writer
              </a>
              , and{" "}
              <a
                href="https://www.youtube.com/watch?v=GNrQTbIFsG4&t=2909s"
                aria-label="Link to presentation on YouTube"
                rel="noopener noreferrer"
                target="_target"
              >
                teacher
              </a>
              . I also build stuff with Bitcoin and Ethereum in my spare time.
            </h1>
          </section>
          <section>
            <div>
              <h2>Currently</h2>
              <TwitterLogo>
                <a
                  href="https://twitter.com/nwthomas_"
                  aria-label="Link to Twitter profile"
                  rel="noopener noreferrer"
                  target="_target"
                >
                  <img src="twitter-logo.png" alt="Twitter logo" />
                </a>
              </TwitterLogo>
            </div>
            <div>
              <h2>Previously</h2>
              <LambdaLogo>
                <a
                  href="https://lambdaschool.com/"
                  aria-label="Link to Lambda School website"
                  rel="noopener noreferrer"
                  target="_target"
                >
                  <img src="lambda-logo.png" alt="Twitter logo" />
                </a>
              </LambdaLogo>
            </div>
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
    width: 100%;

    > section {
      display: flex;
      margin-top: ${({ theme }) => theme.spaces.jumbo};

      > div {
        width: 600px;

        > h2 {
          margin-bottom: ${({ theme }) => theme.spaces.xLarge};
        }
      }
      > div:nth-child(1) {
        width: 400px;
      }

      > h1 {
        > a {
          font-size: inherit;
          transition: opacity ${({ theme }) => theme.transitions.medium}
            ease-in-out;

          &:hover {
            opacity: ${({ theme }) => theme.opacity.opacity90};
          }
        }

        > a:nth-child(1) {
          color: ${({ theme }) => theme.colorsHex.eastSide};
        }

        > a:nth-child(2) {
          color: ${({ theme }) => theme.colorsHex.justRight};
        }

        > a:nth-child(3) {
          color: ${({ theme }) => theme.colorsHex.sinbad};
        }
      }
    }

    > section:nth-child(1) {
      margin-bottom: ${({ theme }) =>
        `calc(${theme.spaces.xxLarge} + ${theme.appDimensions.navbarHeight} / 2)`};
    }
  }
`;

const TwitterLogo = styled.div`
  transition: transform ${({ theme }) => theme.transitions.medium} ease-in-out,
    opacity ${({ theme }) => theme.transitions.medium} ease-in-out;
  width: 190px;

  &:hover {
    opacity: ${({ theme }) => theme.opacity.opacity90};
    transform: translateY(-3px);
  }
`;

const LambdaLogo = styled.div`
  transition: transform ${({ theme }) => theme.transitions.medium} ease-in-out,
    opacity ${({ theme }) => theme.transitions.medium} ease-in-out;
  width: 100%;

  &:hover {
    opacity: ${({ theme }) => theme.opacity.opacity90};
    transform: translateY(-3px);
  }
`;

export default Home;
