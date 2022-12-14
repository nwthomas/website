import * as React from "react";

import {
  BlogPosts,
  bucketAndSortBlogPostsByTags,
} from "../../utils/sortBlogPosts";

import BlogCardSection from "../../components/BlogCardSection";
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
  }, [tagIdParam]);

  return (
    <Layout
      pageName={buildTagIdPageName(pageName)}
      withFooter
      withPageNameEmojis
    >
      <RootStyles>
        <main>{tagIdBlogSection}</main>
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
    margin-bottom: ${({ theme }) => theme.spaces.large};
    max-width: ${({ theme }) => theme.appDimensions.appMaxWidth};

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.tablet}) {
      margin-bottom: ${({ theme }) => theme.spaces.xxLarge};
    }

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.tablet}) {
      width: 100%;
    }
  }
`;

export default TagIdPage;
