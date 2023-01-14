import * as React from "react";

import {
  BlogPosts,
  bucketAndSortBlogPostsByTags,
  getSortedTagsList,
} from "../../utils/sortBlogPosts";

import { BLOG_PAGE_NAME } from "../../constants/seo";
import BlogCardSection from "../../components/BlogCardSection";
import { CONTENTS_ID } from "../../constants/routes";
import Layout from "../../components/Layout";
import { getDirectoryFiles } from "../../utils/readBlogFiles";
import styled from "styled-components";

export async function getStaticProps() {
  const blogPosts = getDirectoryFiles("/constants/blogs");
  const blogPostContent = blogPosts.map(
    (blogPost) => blogPost.fileContents
  ) as BlogPosts;
  const blogPostsByTags = bucketAndSortBlogPostsByTags(blogPostContent);

  const tags = Object.keys(blogPostsByTags);
  const sortedTags = getSortedTagsList(tags);

  return {
    props: {
      blogPostsByTags,
      sortedTags,
    },
  };
}

function Blogs({ blogPostsByTags, sortedTags }) {
  const blogCardSections = React.useMemo(() => {
    const sections: JSX.Element[] = [];

    // Using the sortedTags array as the source of truth keeps the page sorted by tag name
    for (const tag of sortedTags) {
      sections.push(
        <div key={sections.length}>
          <BlogCardSection blogPosts={blogPostsByTags[tag]} tag={tag} />
        </div>
      );
    }

    return sections;
  }, [blogPostsByTags, sortedTags]);

  return (
    <Layout pageName={BLOG_PAGE_NAME} withFooter withPageNameEmojis>
      <RootStyles>
        <main id={CONTENTS_ID}>{blogCardSections}</main>
      </RootStyles>
    </Layout>
  );
}

const RootStyles = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => `0 ${theme.appDimensions.appHorizontalGutters}`};
  width: 100%;

  > main {
    max-width: ${({ theme }) => theme.appDimensions.appMaxWidth};
    margin-bottom: ${({ theme }) => theme.spaces.medium};

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.tablet}) {
      margin-bottom: ${({ theme }) =>
        `calc(${theme.spaces.xxLarge} + ${theme.spaces.medium})`};
      margin-top: ${({ theme }) => theme.spaces.medium};
    }

    > div {
      margin-bottom: ${({ theme }) => theme.spaces.medium};

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.tablet}) {
        margin-bottom: ${({ theme }) => theme.spaces.xxLarge};
      }
    }

    > div:last-child {
      margin-bottom: 0;
    }
  }
`;

export default Blogs;
