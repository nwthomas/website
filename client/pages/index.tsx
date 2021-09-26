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
            </div>
            <div>
              <h2>Previously</h2>
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
        width: 35%;
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

export default Home;
