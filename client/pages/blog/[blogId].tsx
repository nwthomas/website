import Layout from "../../components/Layout";
import fs from "fs";

const BLOG_DEFAULT_NAME = "Nathan Thomas | Blog Post";
const buildBlogPostPageName = (blogName?: string) => {
  if (!blogName) {
    return BLOG_DEFAULT_NAME;
  }

  return `Nathan Thomas | ${blogName}`;
};

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

function BlogPost() {
  return (
    <Layout pageName={buildBlogPostPageName()} withFooter>
      ""
    </Layout>
  );
}

export default BlogPost;
