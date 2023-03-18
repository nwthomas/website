import * as React from "react";

import styled, { ThemeContext } from "styled-components";

import { BLOG_PAGE } from "../../constants/routes";
import { BlogPosts } from "../../utils/sortBlogPosts";
import Card from "../BlogCard";
import { CloseIcon } from "../Icons";
import Tag from "../Tag";
import { buildDateWrittenLabel } from "../../utils/dates";
import { getBlogPostFullDate } from "../../utils/dates";
import { useRouter } from "next/router";

const CLOSE_BUTTON_ARIA_LABEL = "Go back to all blogs page";

interface Props {
  blogPosts: BlogPosts;
  tag: string;
  withCloseButton?: boolean;
}

function buildBlogPostsCountText(blogPostsCount: number) {
  const pluralBlogPostCountEndin = blogPostsCount > 1 ? "s" : "";

  return `${blogPostsCount} Article${pluralBlogPostCountEndin}`;
}

function BlogCardSection({ blogPosts, tag, withCloseButton }: Props) {
  const { colors } = React.useContext(ThemeContext);
  const router = useRouter();

  const blogCards = React.useMemo(() => {
    return blogPosts.map((blogPost, i) => {
      const { dateWritten, description, title, slug } = blogPost.data;
      const dateWrittenLabel = getBlogPostFullDate(dateWritten || "");
      const normalizedDateWritten = buildDateWrittenLabel(dateWrittenLabel);

      return (
        <li key={i}>
          <Card
            dateWritten={normalizedDateWritten}
            description={description}
            title={title}
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
          <div>
            {withCloseButton ? (
              <>
                <button
                  aria-label={CLOSE_BUTTON_ARIA_LABEL}
                  onClick={handleOnCloseButtonClick}
                  type="button"
                >
                  <CloseIcon color={colors.error} isAriaHidden />
                </button>
                <h1>{tag}</h1>
              </>
            ) : (
              <Tag text={tag} />
            )}
          </div>
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
    height: ${({ theme }) => theme.spaces.large};
    justify-content: space-between;
    margin-bottom: ${({ theme }) => theme.spaces.small};

    > div {
      align-items: center;
      display: flex;

      > div {
        align-items: center;
        display: flex;

        > button {
          align-items: center;
          background: none;
          background-color: transparent;
          border: ${({ theme }) =>
            `${theme.spaces.nano} solid ${theme.colors.bodyBackgroundAccentTwo}`};
          border-radius: ${({ theme }) => theme.borderRadii.infinity};
          -webkit-box-shadow: ${({ theme }) => theme.dropshadows.small};
          -moz-box-shadow: ${({ theme }) => theme.dropshadows.small};
          box-shadow: ${({ theme }) => theme.dropshadows.small};
          cursor: pointer;
          display: flex;
          height: ${({ theme }) => theme.spaces.large};
          width: ${({ theme }) => theme.spaces.large};
          justify-content: center;
          padding: 0;
          outline: none;
          transition: border-color ${({ theme }) => theme.transitions.short}
            ease-in-out;

          @media only screen and (min-width: ${({ theme }) =>
              theme.breakpoints.tablet}) {
            height: 42px;
            width: 42px;
          }

          > svg {
            height: ${({ theme }) => theme.spaces.medium};
            width: ${({ theme }) => theme.spaces.medium};
          }

          &:hover {
            border: ${({ theme }) =>
              `${theme.spaces.nano} solid ${theme.colorsHex.royalBlue}`};
            opacity: ${({ theme }) => theme.opacity.opacity100};
          }
        }

        > h1 {
          font-size: 1.6rem;
          line-height: 1;
          margin-left: ${({ theme }) => theme.spaces.xxSmall};

          @media only screen and (min-width: ${({ theme }) =>
              theme.breakpoints.tablet}) {
            font-size: 2rem;
            margin-left: ${({ theme }) => theme.spaces.small};
          }
        }
      }
    }

    > p {
      font-size: 1.6rem;
      line-height: 1;

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.tablet}) {
        font-size: 2rem;
      }
    }
  }

  > ul {
    display: grid;
    grid-column-gap: ${({ theme }) => theme.spaces.small};
    grid-row-gap: ${({ theme }) => theme.spaces.small};
    grid-template-columns: 1fr;
    grid-auto-rows: 1fr;

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.desktop}) {
      grid-template-columns: 1fr 1fr;
    }

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.ultrawide}) {
      grid-template-columns: 1fr 1fr 1fr;
    }

    > li {
      line-height: 1;
      list-style-type: none;
    }
  }
`;

export default BlogCardSection;
