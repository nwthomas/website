import styled, { ThemeContext } from "styled-components";

import { BlogMarkdownRenderer } from "./";
import React from "react";
import { useGetScreenDimensions } from "../../hooks";

interface Props {
  alt?: string;
  isHeroImage?: boolean;
  src?: string;
  title?: string;
}

function BlogImage({ alt, isHeroImage, src, title }: Props) {
  const {
    breakpointsInt: { tablet, ultraWide },
  } = React.useContext(ThemeContext);
  const { availableWidth } = useGetScreenDimensions();

  const borderRadiusBreakpoint = isHeroImage ? ultraWide : tablet;

  const withHeroImageRoundedCorners =
    typeof availableWidth === "number" &&
    availableWidth >= borderRadiusBreakpoint;

  return (
    <RootStyles
      isHeroImage={isHeroImage}
      withImageRoundedCorners={isHeroImage ? withHeroImageRoundedCorners : true}
    >
      <div>
        <img alt={alt} draggable={false} src={src} />
        {title ? <BlogMarkdownRenderer content={title} /> : null}
      </div>
    </RootStyles>
  );
}

interface StyleProps {
  isHeroImage?: boolean;
  withImageRoundedCorners?: boolean;
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
    width: 100%;

    > img {
      overflow: hidden;
      border-radius: ${({ theme, withImageRoundedCorners }) =>
        withImageRoundedCorners ? theme.borderRadii.large : 0};
    }

    > div {
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
