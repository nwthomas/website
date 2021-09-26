import type { NextPage } from "next";
import styled from "styled-components";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";

const Home: NextPage = () => {
  return (
    <RootStyles>
      <Layout pageName="Home">
        <Navbar />
      </Layout>
    </RootStyles>
  );
};

const RootStyles = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
`;

export default Home;
