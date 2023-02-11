import * as React from "react";

import { BlogMarkdownRenderer } from "./";
import Image from "next/image";
import styled from "styled-components";

interface Props {
  alt?: string;
  height?: string | number;
  isHeroImage?: boolean;
  src: string;
  title?: string;
  width?: string | number;
}

function BlogImage({
  alt = "",
  height = 0,
  isHeroImage,
  src,
  title,
  width = 0,
}: Props) {
  return (
    <RootStyles isHeroImage={isHeroImage}>
      <div>
        <Image
          alt={alt}
          draggable={false}
          height={Number(height)}
          priority={isHeroImage}
          quality={100}
          src={src}
          width={Number(width)}
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
    display: flex;
    flex-direction: column;
    max-width: ${({ isHeroImage, theme }) =>
      isHeroImage ? "100%" : theme.appDimensions.articleMaxWidth};
    margin-top: ${({ isHeroImage, theme }) =>
      isHeroImage ? 0 : theme.spaces.medium};
    overflow: hidden;
    width: 100%;

    > img {
      border-radius: ${({ theme }) => theme.borderRadii.medium};
    }

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
