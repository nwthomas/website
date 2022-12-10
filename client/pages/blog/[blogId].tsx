import { BlogPosts, buildSlugToBlogPostMap } from "../../utils/sortBlogPosts";

import Layout from "../../components/Layout";
import { getDirectoryFiles } from "../../utils/readBlogFiles";
import styled from "styled-components";
import { useRouter } from "next/router";

export async function getStaticProps() {
  const blogPosts = getDirectoryFiles("/constants/blogs");
  const blogPostContent = blogPosts.map(
    (blogPost) => blogPost.fileContents
  ) as BlogPosts;
  const slugToBlogPostMap = buildSlugToBlogPostMap(blogPostContent);

  return {
    props: {
      slugToBlogPostMap,
    },
  };
}

export async function getStaticPaths() {
  const blogPosts = getDirectoryFiles("/constants/blogs");
  const blogPostContent = blogPosts.map(
    (blogPost) => blogPost.fileContents
  ) as BlogPosts;

  const paths = blogPostContent.map((blogPost) => {
    return { params: { blogId: blogPost.data.slug } };
  });

  return {
    paths,
    fallback: false,
  };
}

function BlogPost({ slugToBlogPostMap }) {
  const {
    query: { blogId },
  } = useRouter();

  const blogPost = slugToBlogPostMap[blogId as string];
  console.log({ blogPost });

  return (
    <Layout pageName={""} withFooter>
      <RootStyles>
        <main>
          <p>Testing</p>
        </main>
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

export default BlogPost;
