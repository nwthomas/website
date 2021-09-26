import type { NextPage } from "next";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";

const Home: NextPage = () => {
  return (
    <Layout pageName="Home">
      <Navbar />
    </Layout>
  );
};

export default Home;
