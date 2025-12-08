import { BLOG_PAGE } from "../constants/routes";
import { BlogPostsFrontMatter } from "../utils/sortBlogPosts";
import Card from "./BlogCard";
import Tag from "./Tag";
import { buildDateWrittenLabel } from "../utils/dates";
import { buildLinkHref } from "../utils/routes";
import { getBlogPostFullDate } from "../utils/dates";
import styled from "@emotion/styled";
import { useMemo } from "react";
import { useRouter } from "next/router";

const BACK_TO_BLOG_PAGE_ARIA_LABEL = "Return to all blog posts page";

export function buildTagLinkAriaLabel(tagName: string): string {
  return `${tagName} blog section, link is to page with only ${tagName} posts`;
}

interface Props {
  blogPosts: BlogPostsFrontMatter;
  tag: string;
  withCloseButton?: boolean;
}

function buildBlogPostsCountText(blogPostsCount: number) {
  const pluralBlogPostCountEndin = blogPostsCount > 1 ? "s" : "";

  return `${blogPostsCount} Item${pluralBlogPostCountEndin}`;
}

function BlogCardSection({ blogPosts, tag }: Props) {
  const router = useRouter();

  const tagAriaLabel = buildTagLinkAriaLabel(tag);
  const tagRoute = buildLinkHref(tag);
  const isTagPage = router.asPath === tagRoute;

  const blogCards = useMemo(() => {
    return blogPosts.map((blogPost, i) => {
      const { dateWritten, description, title, slug, youTubeLink } = blogPost;
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

  return (
    <RootStyles>
      <div>
        <div>
          <div>
            <Tag
              ariaLabel={isTagPage ? BACK_TO_BLOG_PAGE_ARIA_LABEL : tagAriaLabel}
              text={tag}
              url={isTagPage ? BLOG_PAGE : tagRoute}
              withCloseIcon={isTagPage}
            />
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
      }
    }

    > p {
      font-size: 1.6rem;
      line-height: 1;

      @media only screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
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

    @media only screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
      grid-template-columns: 1fr 1fr;
    }

    @media only screen and (min-width: ${({ theme }) => theme.breakpoints.ultrawide}) {
      grid-template-columns: 1fr 1fr 1fr;
    }

    > li {
      line-height: 1;
      list-style-type: none;
    }
  }
`;

export default BlogCardSection;
