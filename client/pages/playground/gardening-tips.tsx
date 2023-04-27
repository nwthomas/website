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

// (async function () {
//   try {
//     await sendOpenAIQuery("testing testing");
//   } catch (error) {
//     // finish
//   }
// })();

function GardeningTips({ ogImage }) {
  return (
    <Layout customSEOImageUrl={ogImage} pageName={GARDENING_TIPS_PAGE_NAME}>
      <RootStyles>
        <h1>Hola</h1>
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

  > h1 {
    color: var(--text);
    font-display: swap;
    font-family: "Fira Sans", ui-sans-serif, system-ui, -apple-system,
      BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans,
      sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol,
      Noto Color Emoji;
    font-size: 1.6rem;

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.tablet}) {
      font-size: 2rem;
    }
  }
`;

export default GardeningTips;
