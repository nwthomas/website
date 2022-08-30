import Layout from "../../components/Layout";
import fs from "fs";

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

function BlogPost({ blogId, content }) {
  const pageName = "";
  return (
    <Layout pageName={pageName} withFooter>
      {content}
    </Layout>
  );
}

export default BlogPost;
