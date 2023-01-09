import styled, { ThemeContext } from "styled-components";
import Image from "next/image";
import { BlogMarkdownRenderer } from "./";
import * as React from "react";
import { useGetScreenDimensions } from "../../hooks";

interface Props {
  alt?: string;
  height?: string | number;
  isHeroImage?: boolean;
  src: string;
  title?: string;
  width?: string | number;
}

function BlogImage({ alt, height, isHeroImage, src, title, width }: Props) {
  const {
    breakpointsInt: { tablet, ultraWide },
  } = React.useContext(ThemeContext);
  const { availableWidth } = useGetScreenDimensions();

  const borderRadiusBreakpoint = isHeroImage ? ultraWide : tablet;

  const isNotFullWidthImage =
    typeof availableWidth === "number" &&
    availableWidth > borderRadiusBreakpoint;

  const withRoundedCorners =
    typeof availableWidth === "number" && isHeroImage
      ? isNotFullWidthImage
      : true;

  return (
    <RootStyles
      isHeroImage={isHeroImage}
      withRoundedCorners={withRoundedCorners}
    >
      <div>
        <Image
          alt={alt}
          draggable={false}
          height={height}
          priority={isHeroImage}
          quality={60}
          src={src}
          width={width}
        />
        {title ? <BlogMarkdownRenderer content={title} /> : null}
      </div>
    </RootStyles>
  );
}

interface StyleProps {
  isHeroImage?: boolean;
  withRoundedCorners: boolean;
}

const RootStyles = styled.div<StyleProps>`
  display: flex;
  justify-content: center;
  padding: ${({ isHeroImage, theme }) =>
    isHeroImage
      ? 0
      : `${theme.spaces.medium} ${theme.appDimensions.appHorizontalGutters} 0`};
  width: 100%;

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpoints.tablet}) {
    padding: ${({ isHeroImage, theme }) =>
      isHeroImage
        ? 0
        : `${theme.spaces.large} ${theme.appDimensions.appHorizontalGutters} 0`};
  }

  > div {
    align-items: center;
    display: flex;
    flex-direction: column;
    max-width: ${({ isHeroImage, theme }) =>
      isHeroImage ? "100%" : theme.appDimensions.articleMaxWidth};
    overflow: hidden;
    width: 100%;

    > div:nth-child(1) {
      border-radius: ${({ theme, withRoundedCorners }) =>
        withRoundedCorners ? theme.borderRadii.large : 0};
      width: 100%;
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
        font-style: italic;
        line-height: 1;
        text-align: center;
      }
    }
  }
`;

export default BlogImage;
