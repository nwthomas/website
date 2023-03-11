import * as React from "react";

import { buildImageElement, getDominantRGB } from "../../utils/images";

import { BlogMarkdownRenderer } from "./";
import Image from "next/image";
import styled from "styled-components";

interface Props {
  alt?: string;
  height?: string | number;
  isHeroImage?: boolean;
  placeholderImage: string;
  src: string;
  title?: string;
  width?: string | number;
}

function BlogImage({
  alt = "",
  height = 0,
  isHeroImage,
  placeholderImage,
  src,
  title,
  width = 0,
}: Props) {
  const [showImage, setShowImage] = React.useState<boolean>(false);
  const imageHeight = Number(height);
  const imageWidth = Number(width);

  const imageElement = buildImageElement(src, imageHeight, imageWidth);
  const { r, g, b } = getDominantRGB(imageElement);

  const cssColorValue = `rgb(${r} ${g} ${b})`;

  const placeholderElementStyles: React.CSSProperties = {
    backgroundColor: cssColorValue,
    bottom: 0,
    left: 0,
    marginTop: 0,
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 1,
  };

  const handleOnLoad = () => {
    setShowImage(true);
  };

  return (
    <RootStyles isHeroImage={isHeroImage}>
      <div>
        <Image
          alt={alt}
          blurDataURL={placeholderImage}
          height={imageHeight}
          loading={isHeroImage ? "eager" : "lazy"}
          onLoad={handleOnLoad}
          placeholder="blur"
          priority={isHeroImage}
          quality={100}
          src={src}
          width={imageWidth}
        />
        {!showImage ? <div style={placeholderElementStyles} /> : null}
        {title ? <BlogMarkdownRenderer content={title} /> : null}
      </div>
    </RootStyles>
  );
}

interface StyleProps {
  isHeroImage?: boolean;
}

const RootStyles = styled.div<StyleProps>`
  display: flex;
  justify-content: center;
  width: 100%;

  > div {
    align-items: center;
    border-radius: ${({ theme }) => theme.borderRadii.medium};
    display: flex;
    flex-direction: column;
    max-width: ${({ isHeroImage, theme }) =>
      isHeroImage ? "100%" : theme.appDimensions.articleMaxWidth};
    margin-top: ${({ isHeroImage, theme }) =>
      isHeroImage ? 0 : theme.spaces.medium};
    overflow: hidden;
    position: relative;
    width: 100%;

    > div {
      display: flex;
      justify-content: center;
      margin-top: ${({ theme }) => theme.spaces.small};

      p {
        color: ${({ theme }) => theme.colors.textSecondary};
        text-align: center;
        z-index: 9;
      }
    }
  }
`;

export default BlogImage;
