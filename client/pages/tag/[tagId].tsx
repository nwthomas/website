import * as React from "react";

import {
  BlogPosts,
  bucketAndSortBlogPostsByTags,
  getSortedTagsList,
  getTagTitleFromTagId,
} from "../../utils/sortBlogPosts";

import BlogCardSection from "../../components/BlogCardSection";
import { CONTENTS_ID } from "../../constants/routes";
import Layout from "../../components/Layout";
import { buildKebabCaseParam } from "../../utils/routes";
import { createOgImage } from "../../utils/ogImage";
import { getDirectoryFiles } from "../../utils/readBlogFiles";
import styled from "styled-components";
import { useRouter } from "next/router";

function buildTagIdPageName(tag: string) {
  return `${tag} Articles`;
}

export async function getStaticProps({ params: { tagId } }) {
  const blogPosts = getDirectoryFiles("/constants/blogs");
  const blogPostContent = blogPosts.map(
    (blogPost) => blogPost.fileContents
  ) as BlogPosts;
  const blogPostsByTags = bucketAndSortBlogPostsByTags(blogPostContent);

  const tags = Object.keys(blogPostsByTags);
  const sortedTags = getSortedTagsList(tags);

  // Dynamic og image creation at build time
  const tagTitle = getTagTitleFromTagId(tagId, sortedTags);
  const ogImageBuildUrl = `/og-image?title=${buildTagIdPageName(tagTitle)}`;
  const ogImage = await createOgImage(ogImageBuildUrl);

  return {
    props: {
      blogPostsByTags,
      ogImage,
    },
  };
}

export async function getStaticPaths() {
  const blogCardPosts = getDirectoryFiles("/constants/blogs");
  const blogPostContent = blogCardPosts.map(
    (blogPost) => blogPost.fileContents
  ) as BlogPosts;

  const bucketedBlogPosts = bucketAndSortBlogPostsByTags(blogPostContent);

  const paths = Object.keys(bucketedBlogPosts).map((tag) => {
    return { params: { tagId: buildKebabCaseParam(tag) } };
  });

  return {
    paths,
    fallback: false,
  };
}

function TagIdPage({ blogPostsByTags, ogImage }) {
  const [pageName, setPageName] = React.useState<string>("");
  const {
    query: { tagId: tagIdParam },
  } = useRouter();

  const tagIdBlogSection = React.useMemo(() => {
    for (const tag in blogPostsByTags) {
      if (buildKebabCaseParam(tag) === tagIdParam) {
        setPageName(tag);

        return (
          <BlogCardSection
            blogPosts={blogPostsByTags[tag]}
            tag={tag}
            withCloseButton
          />
        );
      }
    }

    return null;
  }, [blogPostsByTags, tagIdParam]);

  return (
    <Layout
      customSEOImageUrl={ogImage}
      pageName={buildTagIdPageName(pageName)}
      withFooter
      withPageNameEmojis
    >
      <RootStyles>
        <main id={CONTENTS_ID}>{tagIdBlogSection}</main>
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
  }
`;

export default TagIdPage;
