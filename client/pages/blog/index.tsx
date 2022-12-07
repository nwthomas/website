import * as React from "react";

import {
  BlogPosts,
  bucketAndSortBlogPostsByTags,
} from "../../utils/sortBlogPosts";

import { BLOG_PAGE_NAME } from "../../constants/seo";
import BlogSection from "../../components/BlogSection";
import Layout from "../../components/Layout";
import { getDirectoryFiles } from "../../utils/readBlogFiles";
import styled from "styled-components";

export async function getStaticProps() {
  const blogPosts = getDirectoryFiles("/constants/blogs");
  const blogPostContent = blogPosts.map(
    (blogPost) => blogPost.fileContents
  ) as BlogPosts;

  return {
    props: {
      blogPosts,
      blogPostsByTags: bucketAndSortBlogPostsByTags(blogPostContent),
    },
  };
}

function Blogs({ blogPostsByTags }) {
  const blogSections = React.useMemo(() => {
    const sections: JSX.Element[] = [];

    for (const tag in blogPostsByTags) {
      sections.push(
        <BlogSection
          blogPosts={blogPostsByTags[tag]}
          key={sections.length}
          tag={tag}
        />
      );
    }

    return sections;
  }, [blogPostsByTags]);

  return (
    <Layout pageName={BLOG_PAGE_NAME} withFooter>
      <RootStyles>
        <main>{blogSections}</main>
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

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.tablet}) {
      padding-top: ${({ theme }) => theme.spaces.medium};
      width: 100%;
    }
  }
`;

export default Blogs;
