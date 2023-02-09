import * as React from "react";

import {
  BlogPosts,
  bucketAndSortBlogPostsByTags,
  getSortedTagsList,
} from "../../utils/sortBlogPosts";

import { BLOG_FILES_PATH } from "../../utils/readBlogFiles";
import { BLOG_PAGE_NAME } from "../../constants/seo";
import BlogCardSection from "../../components/BlogCardSection";
import { CONTENTS_ID } from "../../constants/routes";
import Layout from "../../components/Layout";
import { createOgImage } from "../../utils/ogImage";
import { getDirectoryFiles } from "../../utils/readBlogFiles";
import styled from "styled-components";

export async function getStaticProps() {
  const blogPosts = getDirectoryFiles(BLOG_FILES_PATH);
  const blogPostContent = blogPosts.map(
    (blogPost) => blogPost.fileContents
  ) as BlogPosts;
  const blogPostsByTags = bucketAndSortBlogPostsByTags(blogPostContent);

  const tags = Object.keys(blogPostsByTags);
  const sortedTags = getSortedTagsList(tags);

  // Dynamic og image creation at build time
  const ogImageBuildUrl = `/og-image?title=All%20${BLOG_PAGE_NAME}%20Posts`;
  const ogImage = await createOgImage(ogImageBuildUrl);

  return {
    props: {
      blogPostsByTags,
      ogImage,
      sortedTags,
    },
  };
}

function Blogs({ blogPostsByTags, ogImage, sortedTags }) {
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
    <Layout
      customSEOImageUrl={ogImage}
      pageName={BLOG_PAGE_NAME}
      withFooter
      withPageNameEmojis
    >
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
      margin-bottom: ${({ theme }) => theme.spaces.xxLarge};
    }

    > div {
      margin-bottom: ${({ theme }) => theme.spaces.large};

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
