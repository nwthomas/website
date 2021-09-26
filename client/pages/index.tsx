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
              Hey, I'm Nathan. I'm a full stack software engineer, writer, and
              runner. I also build stuff with Bitcoin and Ethereum in my spare
              time.
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

  > main > section {
    margin-top: ${({ theme }) => theme.spaces.xLarge};
  }
`;

export default Home;
