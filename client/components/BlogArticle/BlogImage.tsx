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
          quality={60}
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
    padding-top: ${({ isHeroImage, theme }) =>
      !isHeroImage ? theme.spaces.large : 0};
    overflow: hidden;
    width: 100%;

    > img {
      border-radius: ${({ theme }) => theme.borderRadii.medium};
    }

    > div:nth-child(2) {
      display: flex;
      justify-content: center;
      padding-top: ${({ theme }) => theme.spaces.small};

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.tablet}) {
        padding-top: ${({ theme }) => theme.spaces.medium};
      }

      p {
        color: ${({ theme }) => theme.colors.textSecondary};
        text-align: center;
        z-index: 9;
      }
    }
  }
`;

export default BlogImage;
