import * as React from "react";

import {
  BlogPosts,
  bucketAndSortBlogPostsByTags,
} from "../../utils/sortBlogPosts";

import BlogSection from "../../components/BlogSection";
import Layout from "../../components/Layout";
import { buildTagIdParam } from "../../utils/tags";
import { getDirectoryFiles } from "../../utils/readBlogFiles";
import styled from "styled-components";
import { useRouter } from "next/router";

function buildTagIdPageName(tag: string) {
  return `${tag} Blogs`;
}

export async function getStaticProps() {
  const blogPosts = getDirectoryFiles("/constants/blogs");
  const blogPostContent = blogPosts.map(
    (blogPost) => blogPost.fileContents
  ) as BlogPosts;

  return {
    props: {
      blogPostsByTags: bucketAndSortBlogPostsByTags(blogPostContent),
    },
  };
}

export async function getStaticPaths() {
  const blogPosts = getDirectoryFiles("/constants/blogs");
  const blogPostContent = blogPosts.map(
    (blogPost) => blogPost.fileContents
  ) as BlogPosts;

  const bucketedBlogPosts = bucketAndSortBlogPostsByTags(blogPostContent);

  const paths = Object.keys(bucketedBlogPosts).map((tag) => {
    return { params: { tagId: buildTagIdParam(tag) } };
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
      if (buildTagIdParam(tag) === tagIdParam) {
        setPageName(tag);

        return <BlogSection blogPosts={blogPostsByTags[tag]} tag={tag} />;
      }
    }

    return null;
  }, [tagIdParam]);

  return (
    <Layout pageName={buildTagIdPageName(pageName)} withFooter>
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
      margin-bottom: ${({ theme }) =>
        `calc(${theme.spaces.medium} + ${theme.spaces.xxLarge})`};
      margin-top: ${({ theme }) => theme.spaces.medium};
    }

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.tablet}) {
      padding-top: ${({ theme }) => theme.spaces.medium};
      width: 100%;
    }
  }
`;

export default TagIdPage;
