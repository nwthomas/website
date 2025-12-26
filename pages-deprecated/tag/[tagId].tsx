import {
  BlogPosts,
  BlogPostsFrontMatter,
  bucketAndSortBlogPostsByTags,
  getSortedTagsList,
  getTagTitleFromTagId,
} from "../../src/utils/sortBlogPosts";
import { useMemo, useState } from "react";

import BlogCardSection from "../../components/BlogCardSection";
import { CONTENTS_ID } from "../../constants/routes";
import Layout from "../../components/Layout";
import { buildKebabCaseParam } from "../../src/utils/routes";
import { createOgImage } from "../../src/utils/ogImage";
import { getDirectoryFiles } from "../../src/utils/readBlogFiles";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

function buildTagIdPageName(tag: string) {
  return `Nathan Thomas | ${tag} Posts`;
}

export async function getStaticProps({ params: { tagId } }) {
  const blogPosts = getDirectoryFiles("/constants/blogs");
  const blogPostContent = blogPosts.map((blogPost) => blogPost.fileContents) as BlogPosts;
  const blogPostsFrontMatter = blogPostContent.map((blogPost) => {
    return blogPost.data;
  }) as BlogPostsFrontMatter;

  const blogPostsByTags = bucketAndSortBlogPostsByTags(blogPostsFrontMatter);

  const tags = Object.keys(blogPostsByTags);
  const sortedTags = getSortedTagsList(tags);

  // Dynamic og image creation at build time
  const tagTitle = getTagTitleFromTagId(tagId, sortedTags);
  const ogImageBuildUrl = `/og-image?title=${tagTitle}%20Posts`;
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
  const blogPostContent = blogCardPosts.map((blogPost) => blogPost.fileContents) as BlogPosts;
  const blogPostsFrontMatter = blogPostContent.map((blogPost) => {
    return blogPost.data;
  }) as BlogPostsFrontMatter;

  const bucketedBlogPosts = bucketAndSortBlogPostsByTags(blogPostsFrontMatter);

  const paths = Object.keys(bucketedBlogPosts).map((tag) => {
    return { params: { tagId: buildKebabCaseParam(tag) } };
  });

  return {
    paths,
    fallback: false,
  };
}

function TagIdPage({ blogPostsByTags, ogImage }) {
  const [pageName, setPageName] = useState<string>("");
  const {
    query: { tagId: tagIdParam },
  } = useRouter();

  const tagIdBlogSection = useMemo(() => {
    for (const tag in blogPostsByTags) {
      if (buildKebabCaseParam(tag) === tagIdParam) {
        setPageName(tag);

        return <BlogCardSection blogPosts={blogPostsByTags[tag]} tag={tag} withCloseButton />;
      }
    }

    return null;
  }, [blogPostsByTags, tagIdParam]);

  return (
    <Layout customSEOImageUrl={ogImage} pageName={buildTagIdPageName(pageName)} withFooter>
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
  padding: 0 var(--app-horizontal-gutters);
  width: 100%;

  > main {
    max-width: var(--app-max-width);
    margin-bottom: var(--space-medium);
    width: 100%;

    @media only screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
      margin-bottom: var(--space-xxlarge);
    }
  }
`;

export default TagIdPage;
