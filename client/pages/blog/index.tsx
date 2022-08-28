import Layout from "../../components/Layout";
import Link from "next/link";
import styled from "styled-components";

const PAGE_NAME = "Nathan Thomas | Blog";

function Blog() {
  return (
    <Layout pageName={PAGE_NAME} withFooter>
      <RootStyles>
        <main>
          <section>
            <h1>I write a lot and publish most of it here. 📓</h1>
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

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.tablet}) {
      width: 100%;
    }

    > section {
      display: flex;

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.tablet}) {
        margin-top: ${({ theme }) => theme.spaces.xxLarge};
      }

      > h1 {
        background: ${({ theme }) => theme.colors.transparent};
      }
    }
  }
`;

export default Blog;
