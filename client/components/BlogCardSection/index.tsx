import * as React from "react";

import { BlogPosts } from "../../utils/sortBlogPosts";
import Card from "../BlogCard";
import Tag from "../Tag";
import styled from "styled-components";

interface Props {
  blogPosts: BlogPosts;
  tag: string;
}

function buildBlogPostsCountText(blogPostsCount: number) {
  return `${blogPostsCount} Article${blogPostsCount > 1 ? "s" : ""}`;
}

function BlogCardSection({ blogPosts, tag }: Props) {
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

  return (
    <RootStyles>
      <div>
        <Tag text={tag} />
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
    margin-bottom: ${({ theme }) => theme.spaces.medium};

    > p {
      font-size: 2rem;
      line-height: 1;
    }
  }

  > ul {
    display: grid;
    grid-column-gap: ${({ theme }) => theme.spaces.medium};
    grid-row-gap: ${({ theme }) => theme.spaces.medium};
    grid-template-columns: 1fr;
    grid-auto-rows: 1fr;

    > li {
      line-height: 1;
      list-style-type: none;
    }

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.tablet}) {
      grid-template-columns: 1fr 1fr;
    }

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.desktop}) {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
`;

export default BlogCardSection;