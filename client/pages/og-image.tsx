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
    background-clip: text;
    -moz-background-clip: text;
    -webkit-background-clip: text;
    background-image: ${({ theme }) =>
      `linear-gradient(90deg, ${theme.colorsHex.lavender} 0%, ${theme.colorsHex.orchid} 33%, ${theme.colorsHex.brilliantRose} 66%, ${theme.colorsHex.brilliantRose} 100%)`};
    color: ${({ theme }) => theme.colorsHex.mercury};
    font-size: 10rem;
    line-height: 1.3;
    background-size: 100%;
    -moz-text-fill-color: transparent;
    -webkit-text-fill-color: transparent;
  }

  > div {
    align-items: flex-end;
    display: flex;

    > div:first-child {
      background-color: ${({ theme }) => theme.colors.text};
      border-radius: ${({ theme }) => theme.borderRadii.micro};
      height: 36px;
      margin-right: ${({ theme }) => theme.spaces.small};
      width: 36px;
    }

    > h2 {
      font-size: 5rem;
      line-height: 0.5;
    }
  }
`;

export default DynamicOGImage;
