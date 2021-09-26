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
              <span>full stack software engineer</span>, <span>writer</span>,
              and <span>teacher</span>. I also build stuff with Bitcoin and
              Ethereum in my spare time.
            </h1>
          </section>
          <section>
            <div>
              <h2>Currently</h2>
              <TwitterLogo>
                <img src="twitter-logo.png" alt="Twitter logo" />
              </TwitterLogo>
            </div>
            <div>
              <h2>Previously</h2>
              <LambdaLogo>
                <img src="lambda-logo.png" alt="Twitter logo" />
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
      margin: ${({ theme }) => theme.spaces.jumbo} 0;

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
        > span {
          font-size: inherit;
        }

        > span:nth-child(1) {
          color: ${({ theme }) => theme.colorsHex.eastSide};
        }

        > span:nth-child(2) {
          color: ${({ theme }) => theme.colorsHex.justRight};
        }

        > span:nth-child(3) {
          color: ${({ theme }) => theme.colorsHex.sinbad};
        }
      }
    }
  }
`;

const TwitterLogo = styled.div`
  width: 190px;
`;

const LambdaLogo = styled.div`
  width: 100%;
`;

export default Home;
