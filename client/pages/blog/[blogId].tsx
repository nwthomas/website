import {
  BlogHeading,
  BlogHorizontalRule,
  BlogImage,
  BlogParagraph,
} from "../../components/BlogArticle";
import { BlogPosts, buildSlugToBlogPostMap } from "../../utils/sortBlogPosts";

import Layout from "../../components/Layout";
import ReactMarkdown from "react-markdown";
import { getDirectoryFiles } from "../../utils/readBlogFiles";
import { rehypeAccessibleEmojis } from "rehype-accessible-emojis";
import remarkGfm from "remark-gfm";
import remarkUnwrapImages from "remark-unwrap-images";
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
  const { imageUrl: heroImageUrl } = blogPost.data;

  return (
    <Layout pageName={blogPost.data.title} withFooter>
      <RootStyles>
        <main>
          <ReactMarkdown
            children={blogPost.content}
            components={{
              blockquote({ ...props }) {
                // console.log(props);

                return null;
              },
              h1({ children }) {
                return <BlogHeading contents={children} level={1} />;
              },
              h2({ children }) {
                return <BlogHeading contents={children} level={2} />;
              },
              h3({ children }) {
                return <BlogHeading contents={children} level={3} />;
              },
              h4({ children }) {
                return <BlogHeading contents={children} level={4} />;
              },
              h5({ children }) {
                return <BlogHeading contents={children} level={5} />;
              },
              hr() {
                return <BlogHorizontalRule />;
              },
              p({ children }) {
                return <BlogParagraph contents={children} />;
              },
              img({ alt, src, title }) {
                const isHeroImage = heroImageUrl === src;

                return (
                  <BlogImage
                    alt={alt}
                    isHeroImage={isHeroImage}
                    src={src}
                    title={title}
                  />
                );
              },
            }}
            rehypePlugins={[rehypeAccessibleEmojis]}
            remarkPlugins={[remarkGfm, remarkUnwrapImages]}
          />
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
  }
`;

export default BlogPost;
