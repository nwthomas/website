import * as React from "react";

import styled from "styled-components";
import { useRouter } from "next/router";

export const OG_IMAGE_HEIGHT = 600;
export const OG_IMAGE_WIDTH = 1200;

export async function getStaticProps() {
  return {
    props: {},
  };
}

// While Vercel has an edge function way of rendering dynamic OG images, I didn't want to deal with edge function.
// Instead, I generate OG images at build time and thereby offload any future costs of image generation to Vercel.
//
// See: https://phiilu.com/generate-open-graph-images-for-your-static-next-js-site
// Also: /utils/ogImage.ts
function DynamicOGImage() {
  const router = useRouter();
  const searchParams = new URLSearchParams(router.asPath.split(/\?/)[1]);
  const title = searchParams.get("title");

  return (
    <RootStyles>
      <h1>{title || ""}</h1>
      <div>
        <div />
        <h2>Nathan Thomas</h2>
      </div>
    </RootStyles>
  );
}

const RootStyles = styled.div`
  display: flex;
  flex-direction: column;
  height: ${OG_IMAGE_HEIGHT}px;
  justify-content: space-between;
  overflow: hidden;
  padding: ${({ theme }) => theme.spaces.xxLarge};
  width: ${OG_IMAGE_WIDTH}px;

  > h1 {
    color: ${({ theme }) => theme.colors.textAccentTwo};
    font-family: inherit;
    font-size: 8rem;
  }

  > div {
    align-items: flex-end;
    display: flex;

    > h2 {
      color: ${({ theme }) => theme.colors.textSecondary};
      font-family: "Fira Sans", ui-sans-serif, system-ui, -apple-system,
        BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans,
        sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol,
        Noto Color Emoji;
      font-size: 4rem;
      line-height: 0.5;
    }
  }
`;

export default DynamicOGImage;
