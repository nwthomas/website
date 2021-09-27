import styled from "styled-components";
import Layout from "../../components/Layout";

const PAGE_NAME = "Work";

function Work() {
  return (
    <Layout pageName={PAGE_NAME}>
      <RootStyles>
        <main>
          <section>
            <h1>
              This is all of the work that I'm <em>really</em> proud of. I hope
              you enjoy using it. 🏗
            </h1>
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
    width: 100%;

    > section:nth-child(1) {
      display: flex;

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.tablet}) {
        margin-top: ${({ theme }) => theme.spaces.large};
      }

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.desktop}) {
        margin-top: ${({ theme }) => theme.spaces.jumbo};
      }

      > h1 > em {
        font-style: italic;
      }
    }
  }
`;

export default Work;
