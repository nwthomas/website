import Layout from "../../components/Layout";
import styled from "styled-components";

const PAGE_NAME = "Playground";

interface Props {
  // finish
}

function Playground(props: Props) {
  return (
    <Layout pageName={PAGE_NAME} withFooter>
      <RootStyles></RootStyles>
    </Layout>
  );
}

const RootStyles = styled.div``;

export default Playground;
