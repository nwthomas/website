import styled, { ThemeContext } from "styled-components";

import { BlogMarkdownRenderer } from "./";
import { useContext } from "react";
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
  } = useContext(ThemeContext);
  const { availableWidth } = useGetScreenDimensions();

  const borderRadiusBreakpoint = isHeroImage ? ultraWide : tablet;
  const withImageRoundedCorners =
    typeof availableWidth === "number" &&
    availableWidth >= borderRadiusBreakpoint;

  return (
    <RootStyles
      isHeroImage={isHeroImage}
      withImageRoundedCorners={withImageRoundedCorners}
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
  padding-top: ${({ isHeroImage, theme }) =>
    isHeroImage ? 0 : theme.spaces.large};
  width: 100%;

  > div {
    align-items: center;
    display: flex;
    flex-direction: column;
    max-width: ${({ isHeroImage, theme }) =>
      isHeroImage ? "100%" : theme.appDimensions.articleMaxWidth};
    width: 100%;

    > img {
      overflow: hidden;
      border-radius: 0;
      border-radius: ${({ theme, withImageRoundedCorners }) =>
        withImageRoundedCorners ? theme.borderRadii.xxLarge : 0};
    }

    > div {
      display: flex;
      justify-content: center;
      padding-top: ${({ theme }) => theme.spaces.medium};

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
