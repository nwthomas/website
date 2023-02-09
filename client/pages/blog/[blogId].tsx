import { BlogPosts, buildSlugToBlogPostMap } from "../../utils/sortBlogPosts";

import { BLOG_FILES_PATH } from "../../utils/readBlogFiles";
import { BlogMarkdownRenderer } from "../../components/BlogArticle";
import { CONTENTS_ID } from "../../constants/routes";
import Layout from "../../components/Layout";
import { getDirectoryFiles } from "../../utils/readBlogFiles";
import styled from "styled-components";
import { useRouter } from "next/router";

export async function getStaticProps({ params: { blogId } }) {
  // Get and sort blog posts
  const blogPosts = getDirectoryFiles(BLOG_FILES_PATH);
  const slugToBlogPostMap = buildSlugToBlogPostMap(blogPosts);

  return {
    props: {
      slugToBlogPostMap,
    },
  };
}

export async function getStaticPaths() {
  // Get all blog posts paths from blog post directory
  const blogPosts = getDirectoryFiles(BLOG_FILES_PATH);
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
  const { imageUrl: heroImageUrl, description, lastUpdated } = blogPost.data;

  return (
    <Layout
      customSEODescription={description}
      customSEOImageUrl={heroImageUrl}
      isArticle
      pageName={blogPost.data.title}
    >
      <RootStyles>
        <main id={CONTENTS_ID}>
          <article>
            <BlogMarkdownRenderer
              date={lastUpdated}
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
  display: flex;
  justify-content: center;
  /**
    * If I told you how long I spent figuring out why my code blog <pre> tags weren't respecting
    * 'overflow-x: auto;', you wouldn't believe me. Let's just say this 'min-width: 0;' is
    * really really necessary.
    *
    * See: https://weblog.west-wind.com/posts/2016/feb/15/flexbox-containers-pre-tags-and-managing-overflow
    */
  min-width: 0;
  padding: ${({ theme }) => `0 ${theme.appDimensions.appHorizontalGutters}`};
  width: 100%;

  > main {
    align-items: center;
    display: flex;
    flex-direction: column;
    /**
      * If I told you how long I spent figuring out why my code blog <pre> tags weren't respecting
      * 'overflow-x: auto;', you wouldn't believe me. Let's just say this 'min-width: 0;' is
      * really really necessary.
      *
      * See: https://weblog.west-wind.com/posts/2016/feb/15/flexbox-containers-pre-tags-and-managing-overflow
      */
    min-width: 0;
    max-width: ${({ theme }) => theme.appDimensions.appMaxWidth};
    margin-bottom: ${({ theme }) => theme.spaces.medium};

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
