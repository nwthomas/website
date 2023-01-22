import * as React from "react";

import {
  BlogPosts,
  bucketAndSortBlogPostsByTags,
} from "../../utils/sortBlogPosts";

import BlogCardSection from "../../components/BlogCardSection";
import { CONTENTS_ID } from "../../constants/routes";
import Layout from "../../components/Layout";
import { buildKebabCaseParam } from "../../utils/routes";
import { getDirectoryFiles } from "../../utils/readBlogFiles";
import styled from "styled-components";
import { useRouter } from "next/router";

function buildTagIdPageName(tag: string) {
  return `${tag} Articles`;
}

export async function getStaticProps() {
  const blogPosts = getDirectoryFiles("/constants/blogs");
  const blogPostContent = blogPosts.map(
    (blogPost) => blogPost.fileContents
  ) as BlogPosts;
  const blogPostsByTags = bucketAndSortBlogPostsByTags(blogPostContent);

  return {
    props: {
      blogPostsByTags,
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

function TagIdPage({ blogPostsByTags }) {
  const [pageName, setPageName] = React.useState<string>("");
  const {
    query: { tagId: tagIdParam },
  } = useRouter();

  const tagIdBlogSection = React.useMemo(() => {
    for (const tag in blogPostsByTags) {
      if (buildKebabCaseParam(tag) === tagIdParam) {
        setPageName(tag);

        return <BlogCardSection blogPosts={blogPostsByTags[tag]} tag={tag} />;
      }
    }

    return null;
  }, [blogPostsByTags, tagIdParam]);

  return (
    <Layout
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
      margin-bottom: ${({ theme }) =>
        `calc(${theme.spaces.xxLarge} + ${theme.spaces.medium})`};
      margin-top: ${({ theme }) => theme.spaces.medium};
    }
  }
`;

export default TagIdPage;
