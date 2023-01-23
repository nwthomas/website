import * as React from "react";

import styled, { ThemeContext } from "styled-components";

import { BLOG_PAGE } from "../../constants/routes";
import { BlogPosts } from "../../utils/sortBlogPosts";
import Card from "../BlogCard";
import { CloseIcon } from "../Icons";
import Tag from "../Tag";
import { useRouter } from "next/router";

const CLOSE_BUTTON_ARIA_LABEL = "Go back to all blogs page";

interface Props {
  blogPosts: BlogPosts;
  tag: string;
  withCloseButton?: boolean;
}

function buildBlogPostsCountText(blogPostsCount: number) {
  return `${blogPostsCount} Article${blogPostsCount > 1 ? "s" : ""}`;
}

function BlogCardSection({ blogPosts, tag, withCloseButton }: Props) {
  const { colors } = React.useContext(ThemeContext);
  const router = useRouter();

  const blogCards = React.useMemo(() => {
    return blogPosts.map((blogPost, i) => {
      const { metaDescription, metaTitle, slug } = blogPost.data;

      return (
        <li key={i}>
          <Card
            description={metaDescription}
            title={metaTitle}
            url={slug}
            key={i}
          />
        </li>
      );
    });
  }, [blogPosts]);

  const handleOnCloseButtonClick = () => {
    router.push(BLOG_PAGE);
  };

  return (
    <RootStyles>
      <div>
        <div>
          <Tag text={tag} />
          {withCloseButton ? (
            <button
              aria-label={CLOSE_BUTTON_ARIA_LABEL}
              onClick={handleOnCloseButtonClick}
              type="button"
            >
              <CloseIcon color={colors.error} isAriaHidden />
            </button>
          ) : null}
        </div>
        <p>{buildBlogPostsCountText(blogPosts.length)}</p>
      </div>
      <ul>{blogCards}</ul>
    </RootStyles>
  );
}

const RootStyles = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;

  > div {
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-bottom: ${({ theme }) => theme.spaces.micro};

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.tablet}) {
      margin-bottom: ${({ theme }) => theme.spaces.small};
    }

    > div {
      align-items: center;
      display: flex;

      > button {
        align-items: center;
        background-color: ${({ theme }) => theme.colors.transparent};
        border: ${({ theme }) =>
          `${theme.spaces.nano} solid ${theme.colors.bodyBackgroundAccentTwo}`};
        border-radius: ${({ theme }) => theme.borderRadii.infinity};
        display: flex;
        height: 38px;
        justify-content: center;
        margin-left: ${({ theme }) => theme.spaces.micro};
        outline: none;
        transition: border-color ${({ theme }) => theme.transitions.short}
          ease-in-out;
        width: 38px;

        @media only screen and (min-width: ${({ theme }) =>
            theme.breakpoints.tablet}) {
          margin-left: ${({ theme }) => theme.spaces.small};
        }

        > svg {
          height: 50px;
          width: 50px;
        }

        &:hover,
        &:focus,
        &:active {
          border: ${({ theme }) =>
            `${theme.spaces.nano} solid ${theme.colorsHex.pictonBlue}`};
        }
      }
    }

    > p {
      font-size: 1.6rem;
      line-height: 1;
      margin-top: ${({ theme }) => theme.spaces.nano};

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.tablet}) {
        font-size: 2rem;
        margin-top: ${({ theme }) => theme.spaces.micro};
      }
    }
  }

  > ul {
    display: grid;
    grid-column-gap: ${({ theme }) => theme.spaces.micro};
    grid-row-gap: ${({ theme }) => theme.spaces.micro};
    grid-template-columns: 1fr;
    grid-auto-rows: 1fr;

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.tablet}) {
      grid-column-gap: ${({ theme }) => theme.spaces.small};
      grid-row-gap: ${({ theme }) => theme.spaces.small};
      grid-template-columns: 1fr 1fr;
    }

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.desktop}) {
      grid-template-columns: 1fr 1fr 1fr;
    }

    > li {
      line-height: 1;
      list-style-type: none;
    }
  }
`;

export default BlogCardSection;
