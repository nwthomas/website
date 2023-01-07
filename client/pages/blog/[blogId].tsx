import { BlogPosts, buildSlugToBlogPostMap } from "../../utils/sortBlogPosts";

import { BlogMarkdownRenderer } from "../../components/BlogArticle";
import { CONTENTS_ID } from "../../constants/routes";
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
  const { imageUrl: heroImageUrl, metaDescription } = blogPost.data;

  return (
    <Layout
      customSEODescription={metaDescription}
      customSEOImageUrl={heroImageUrl}
      isArticle
      pageName={blogPost.data.title}
      withFooter
    >
      <RootStyles>
        <main id={CONTENTS_ID}>
          <article>
            <BlogMarkdownRenderer
              content={blogPost.content}
              heroImageUrl={heroImageUrl}
            />
          </article>
        </main>
      </RootStyles>
    </Layout>
  );
}

const RootStyles = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;

  > main {
    align-items: center;
    display: flex;
    flex-direction: column;
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

    > article {
      width: 100%;
    }
  }
`;

export default BlogPost;
