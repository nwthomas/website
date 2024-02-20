import * as React from "react";

import { BlogMarkdownRenderer } from "./";
import Image from "next/image";
import { showImageOverlay } from "../../store/reducers/blogSlice";
import styled from "styled-components";
import { useDispatch } from "react-redux";

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

  const dispatch = useDispatch();

  const handleImageClick = () => {
    dispatch(
      showImageOverlay({
        alt,
        height: imageHeight,
        placeholderImage,
        width: imageWidth,
        src,
      })
    );
  };

  const image = (
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
  );

  return (
    <RootStyles isHeroImage={isHeroImage}>
      {!isHeroImage ? (
        <button aria-label="Enlarge image" onClick={handleImageClick}>
          {image}
        </button>
      ) : (
        <div>{image}</div>
      )}
      {title ? <BlogMarkdownRenderer content={title} /> : null}
    </RootStyles>
  );
}

interface StyleProps {
  isHeroImage?: boolean;
}

const RootStyles = styled.div<StyleProps>`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;

  > button,
  div {
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
    transition: opacity var(--transition-short) ease-in-out;
    width: 100%;

    ${({ isHeroImage }) => {
      if (!isHeroImage) {
        return `
          &:hover {
            cursor: zoom-in;
            opacity: 0.8;
          }  
        `;
      }
    }}
  }

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
`;

export default BlogImage;
