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

  return `${blogPostsCount} Item${pluralBlogPostCountEndin}`;
}

function BlogCardSection({ blogPosts, tag, withCloseButton }: Props) {
  const { colors } = React.useContext(ThemeContext);
  const router = useRouter();

  const blogCards = React.useMemo(() => {
    return blogPosts.map((blogPost, i) => {
      const { dateWritten, description, title, slug, youTubeLink } =
        blogPost.data;
      const dateWrittenLabel = getBlogPostFullDate(dateWritten || "");
      const normalizedDateWritten = buildDateWrittenLabel(dateWrittenLabel);

      return (
        <li key={i}>
          <Card
            dateWritten={!youTubeLink ? normalizedDateWritten : undefined}
            description={description}
            key={i}
            title={title}
            url={slug}
            youTubeLink={youTubeLink}
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
    height: var(--space-large);
    justify-content: space-between;
    margin-bottom: var(--space-small);

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
          border: var(--space-nano) solid var(--body-bg-accent-two);
          border-radius: var(--border-radius-infinity);
          cursor: pointer;
          display: flex;
          height: var(--space-large);
          width: var(--space-large);
          justify-content: center;
          padding: 0;
          outline: none;
          transition: border-color var(--transition-short) ease-in-out;

          @media only screen and (min-width: ${({ theme }) =>
              theme.breakpoints.tablet}) {
            height: 42px;
            width: 42px;
          }

          > svg {
            height: var(--space-medium);
            width: var(--space-medium);
          }

          &:hover {
            border: var(--space-nano) solid var(--color-royal-blue);
            opacity: 1;
          }
        }

        > h1 {
          font-size: 1.6rem;
          line-height: 1;
          margin-left: var(--space-xxsmall);

          @media only screen and (min-width: ${({ theme }) =>
              theme.breakpoints.tablet}) {
            font-size: 2rem;
            margin-left: var(--space-small);
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
    grid-column-gap: var(--space-small);
    grid-row-gap: var(--space-small);
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
