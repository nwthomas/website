import * as React from "react";

import { GARDENING_TIPS_PAGE_NAME } from "../../constants/seo";
import Layout from "../../components/Layout";
import { createOgImage } from "../../utils/ogImage";
import { sendOpenAIQuery } from "../../utils/openAI";
import styled from "styled-components";

export async function getStaticProps() {
  // Dynamic og image creation at build time
  const ogImageBuildUrl = `/og-image?title=Gardening%20Tips%20Chatbot`;
  const ogImage = await createOgImage(ogImageBuildUrl);

  return {
    props: {
      ogImage,
    },
  };
}

(async function () {
  try {
    const result = await sendOpenAIQuery("");
    console.log({ result });
  } catch (error) {
    // finish
  }
})();

function GardeningTips({ ogImage }) {
  return (
    <Layout
      customSEOImageUrl={ogImage}
      pageName={GARDENING_TIPS_PAGE_NAME}
      withFooter
    >
      <RootStyles>
        <section>
          <aside>
            <p>Testing</p>
          </aside>
          <div>
            <p>Testing</p>
          </div>
        </section>
      </RootStyles>
    </Layout>
  );
}

const RootStyles = styled.main`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 0 var(--app-horizontal-gutters);
  width: 100%;

  > section {
    display: grid;
    grid-template-columns: 1fr 2fr;
    height: 100%;
    margin-bottom: var(--space-medium);
    max-width: var(--app-max-width);
    width: 100%;

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.tablet}) {
      margin-bottom: var(--space-xxlarge);
    }

    > aside {
      border: var(--space-nano) solid var(--body-bg-accent-two);
      border-radius: var(--border-radius-medium);
      height: 100%;
      width: 100%;
    }
  }
`;

export default GardeningTips;
