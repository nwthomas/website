import styled, { ThemeContext } from "styled-components";

import { BlogMarkdownRenderer } from "./";
import { useContext } from "react";
import { useGetScreenDimensions } from "../../hooks/useGetScreenDimensions";

interface Props {
  alt?: string;
  isHeroImage?: boolean;
  src?: string;
  title?: string;
}

function BlogImage({ alt, isHeroImage, src, title }: Props) {
  const {
    breakpointsInt: { ultraWide },
  } = useContext(ThemeContext);
  const { availableWidth } = useGetScreenDimensions();

  const withImageRoundedCorners =
    typeof availableWidth === "number" && availableWidth > ultraWide;

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

      @media only screen and (min-width: ${({ isHeroImage, theme }) =>
          isHeroImage
            ? theme.breakpoints.ultraWide
            : theme.breakpoints.tablet}) {
        border-radius: ${({ theme }) => theme.borderRadii.xxLarge};
      }
    }

    > div {
      display: flex;
      justify-content: center;
      padding-top: ${({ theme }) => theme.spaces.medium};

      p {
        color: ${({ theme }) => theme.colors.textSecondary};
        font-style: italic;
        text-align: center;
      }
    }
  }
`;

export default BlogImage;
