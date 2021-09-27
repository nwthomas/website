import styled from "styled-components";
import Layout from "../../components/Layout";

const PAGE_NAME = "Work";

function Work() {
  return (
    <Layout pageName={PAGE_NAME}>
      <RootStyles>
        <div></div>
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
  }
`;

export default Work;
