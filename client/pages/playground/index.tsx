import * as React from "react";

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
        <h1>Coming Soon™</h1>
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

export default Playground;
