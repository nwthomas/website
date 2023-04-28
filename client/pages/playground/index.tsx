import * as React from "react";

import Card from "../../components/Card";
import Layout from "../../components/Layout";
import { PLAYGROUND_PAGE_NAME } from "../../constants/seo";
import { createOgImage } from "../../utils/ogImage";
import styled from "styled-components";

export async function getStaticProps() {
  // Dynamic og image creation at build time
  const ogImageBuildUrl = `/og-image?title=All%20Playground%20Projects`;
  const ogImage = await createOgImage(ogImageBuildUrl);

  return {
    props: {
      ogImage,
    },
  };
}

function Playground({ ogImage }) {
  return (
    <Layout
      customSEOImageUrl={ogImage}
      pageName={PLAYGROUND_PAGE_NAME}
      withFooter
    >
      <RootStyles>
        <main>
          <div>
            <Card
              description="A chatbot to help you will all your gardening needs"
              routeOutLabel="Try it out"
              title="Gardening Chatbot"
              url="/playground/gardening-tips"
            />
          </div>
        </main>
      </RootStyles>
    </Layout>
  );
}

const RootStyles = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 0 var(--app-horizontal-gutters);
  width: 100%;

  > main {
    max-width: var(--app-max-width);

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.tablet}) {
      width: 100%;
    }

    > div {
      max-width: 400px;
    }
  }
`;

export default Playground;
