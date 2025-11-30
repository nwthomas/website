import { BlogPosts, buildSlugToBlogPostMap } from "../../utils/sortBlogPosts";
import { useDispatch, useSelector } from "react-redux";

import { BLOG_FILES_PATH } from "../../utils/readBlogFiles";
import { BlogMarkdownRenderer } from "../../components/BlogArticle";
import { CONTENTS_ID } from "../../constants/routes";
import ImageOverlay from "../../components/ImageOverlay";
import Layout from "../../components/Layout";
import { getDirectoryFiles } from "../../utils/readBlogFiles";
import { hideImageOverlay } from "../../store/reducers/blogSlice";
import { selectIsShowingImageOverlay } from "../../store/selectors/blogSelector";
import styled from "@emotion/styled";
import { useEffect } from "react";

export async function getStaticProps({ params: { blogId } }) {
  const blogPosts = getDirectoryFiles(BLOG_FILES_PATH);
  const slugToBlogPostMap = buildSlugToBlogPostMap(blogPosts);

  const blogPost = slugToBlogPostMap[blogId as string];

  return {
    props: {
      blogPost,
    },
  };
}

export async function getStaticPaths() {
  const blogPosts = getDirectoryFiles(BLOG_FILES_PATH);
  const blogPostContent: BlogPosts = blogPosts.map((blogPost) => blogPost.fileContents);

  const paths = blogPostContent.map((blogPost) => {
    return { params: { blogId: blogPost.data.slug } };
  });

  return {
    paths,
    fallback: false,
  };
}

function BlogPost({ blogPost }) {
  const { imageUrl: heroImageUrl, description, dateUpdated, dateWritten } = blogPost.data;

  const dispatch = useDispatch();

  const isShowingImageOverlay = useSelector(selectIsShowingImageOverlay);

  useEffect(() => {
    // On any navigation away from current blog page, clear blog image overlay state
    return () => {
      dispatch(hideImageOverlay());
    };
  }, [dispatch]);

  return (
    <Layout
      customSEODescription={description}
      customSEOImageUrl={heroImageUrl}
      isArticle
      pageName={blogPost.data.title}
    >
      {isShowingImageOverlay ? <ImageOverlay /> : null}
      <RootStyles>
        <main id={CONTENTS_ID}>
          <article>
            <BlogMarkdownRenderer
              dateUpdated={dateUpdated}
              dateWritten={dateWritten}
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
  padding: 0 var(--app-horizontal-gutters);
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
    max-width: var(--app-max-width);
    margin-bottom: var(--space-medium);

    @media only screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
      margin-bottom: var(--space-xxlarge);
    }

    @media only screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
      width: 100%;
    }

    > article {
      width: 100%;
    }
  }
`;

export default BlogPost;
