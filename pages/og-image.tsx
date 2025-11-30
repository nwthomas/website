import styled from "@emotion/styled";
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
        <div>
          <img alt="" height="100" src="/images/pfp/nathan-thomas-pfp.jpg" width="100"></img>
        </div>
        <h2>Nathan Thomas</h2>
      </div>
    </RootStyles>
  );
}

const RootStyles = styled.div`
  align-items: center;
  background-image: url(/images/backgrounds/gradient-high.webp);
  display: flex;
  flex-direction: column;
  height: ${OG_IMAGE_HEIGHT}px;
  justify-content: space-between;
  overflow: hidden;
  padding: var(--space-xlarge);
  position: relative;
  width: ${OG_IMAGE_WIDTH}px;

  &::after {
    bottom: 0;
    background-image: url(/images/backgrounds/transparent-noise.png);
    content: "";
    left: 0;
    position: absolute;
    opacity: 0.3;
    right: 0;
    top: 0;
  }

  > h1 {
    color: var(--text);
    font-family:
      "Libre Baskerville", Constantia, "Lucida Bright", Lucidabright, "Lucida Serif", Lucida, "DejaVu Serif",
      "Bitstream Vera Serif", "Liberation Serif", Georgia, serif;
    font-size: 8rem;
    text-align: center;
    z-index: 1;
  }

  > div {
    align-items: center;
    display: flex;
    flex-direction: column;
    z-index: 1;

    > div {
      border-radius: var(--border-radius-infinity);
      display: flex;
      height: auto;
      margin-bottom: var(--space-medium);
      overflow: hidden;
      width: 150px;
    }

    > h2 {
      font-family:
        "Fira Sans",
        ui-sans-serif,
        system-ui,
        -apple-system,
        BlinkMacSystemFont,
        Segoe UI,
        Roboto,
        Helvetica Neue,
        Arial,
        Noto Sans,
        sans-serif,
        Apple Color Emoji,
        Segoe UI Emoji,
        Segoe UI Symbol,
        Noto Color Emoji;
      font-size: 4rem;
      padding: var(--space-micro) 0;
    }
  }
`;

export default DynamicOGImage;
