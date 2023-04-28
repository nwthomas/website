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
    <Layout customSEOImageUrl={ogImage} pageName={GARDENING_TIPS_PAGE_NAME}>
      <RootStyles>
        <div>
          <aside>
            <p>Testing</p>
          </aside>
          <div>
            <p>Testing</p>
          </div>
        </div>
      </RootStyles>
    </Layout>
  );
}

const RootStyles = styled.main`
  align-items: center;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  left: 0;
  position: absolute;
  padding: 0 var(--app-horizontal-gutters);
  right: 0;
  top: 0;
  width: 100%;

  > div {
    display: flex;
    height: 100%;
    margin-top: var(--navbar-desktop-height);
    margin-bottom: var(--footer-desktop-height);
    width: 100%;

    > aside {
      background-color: var(--body-bg-accent-one);
      border-radius: var(--border-radius-small);
      height: 100%;
      width: 100%;
    }
  }
`;

export default GardeningTips;
