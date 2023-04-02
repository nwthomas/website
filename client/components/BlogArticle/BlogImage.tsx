import * as React from "react";

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
  const imageHeight = Number(height);
  const imageWidth = Number(width);

  return (
    <RootStyles isHeroImage={isHeroImage}>
      <div>
        <Image
          alt={alt}
          blurDataURL={placeholderImage}
          draggable={false}
          height={imageHeight}
          loading={isHeroImage ? "eager" : "lazy"}
          placeholder="blur"
          priority={isHeroImage}
          quality={100}
          src={src}
          width={imageWidth}
        />
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
    border-radius: var(--border-radius-medium);
    display: flex;
    flex-direction: column;
    max-width: ${({ isHeroImage }) =>
      isHeroImage
        ? "var(--article-hero-image-max-width)"
        : "var(--article-max-width)"};
    margin-top: ${({ isHeroImage }) =>
      isHeroImage ? 0 : "var(--space-medium)"};
    overflow: hidden;
    position: relative;
    width: 100%;

    > div {
      display: flex;
      justify-content: center;
      margin-top: var(--space-small);

      p {
        color: var(--text-secondary);
        text-align: center;
        z-index: 9;
      }
    }
  }
`;

export default BlogImage;
