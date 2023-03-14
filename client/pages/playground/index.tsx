import Layout from "../../components/Layout";
import { PLAYGROUND_PAGE_NAME } from "../../constants/seo";
import styled from "styled-components";

interface Props {
  // finish
}

function Playground(props: Props) {
  return (
    <Layout pageName={PLAYGROUND_PAGE_NAME} withFooter>
      <RootStyles></RootStyles>
    </Layout>
  );
}

const RootStyles = styled.div``;

export default Playground;
