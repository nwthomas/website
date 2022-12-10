import {
  BlogPosts,
  bucketAndSortBlogPostsByTags,
} from "../../utils/sortBlogPosts";

import Layout from "../../components/Layout";
import fs from "fs";
import { getDirectoryFiles } from "../../utils/readBlogFiles";

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
  const files = fs.readdirSync("../../constants/blogs");
  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

function BlogPost({ blogPostsByTags }) {
  return (
    <Layout pageName={""} withFooter>
      <p>Testing</p>
    </Layout>
  );
}

export default BlogPost;
