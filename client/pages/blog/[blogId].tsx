import { BlogPosts, buildSlugToBlogPostMap } from "../../utils/sortBlogPosts";

import Layout from "../../components/Layout";
import { getDirectoryFiles } from "../../utils/readBlogFiles";
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
      <p>Testing</p>
    </Layout>
  );
}

export default BlogPost;
