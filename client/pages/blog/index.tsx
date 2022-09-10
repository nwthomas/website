import {
  BlogPosts,
  bucketAndSortBlogPostsByTags,
} from "../../utils/sortBlogPosts";

import Card from "../../components/Card";
import Layout from "../../components/Layout";
import { getDirectoryFiles } from "../../utils/readBlogFiles";
import styled from "styled-components";

const PAGE_NAME = "Nathan Thomas | Blog";

export async function getStaticProps() {
  const blogPosts = getDirectoryFiles("/constants/blogs");
  const blogPostContent = blogPosts.map(
    (blogPost) => blogPost.fileContents
  ) as BlogPosts;

  return {
    props: {
      blogPosts,
      blogPostsByTags: bucketAndSortBlogPostsByTags(blogPostContent),
    },
  };
}

function Blogs({ blogPosts }) {
  console.log(blogPosts);
  return (
    <Layout pageName={PAGE_NAME} withFooter>
      <RootStyles>
        <main>
          <section>
            <h1>
              I write a lot and publish most of it here. I also have a{" "}
              <span>
                <a
                  href="https://www.getrevue.co/profile/nathan-thomas"
                  aria-label="Link to Nathan's newsletter"
                  rel="noopener noreferrer"
                  target="_target"
                >
                  newsletter
                </a>
                . 📬
              </span>
            </h1>
          </section>
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
    max-width: ${({ theme }) => theme.appDimensions.appMaxWidth};

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.tablet}) {
      width: 100%;
    }

    > section {
      display: flex;

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.tablet}) {
        margin-top: ${({ theme }) => theme.spaces.xxLarge};
      }

      > h1 {
        background: ${({ theme }) => theme.colors.transparent};

        span {
          white-space: nowrap;
        }

        a {
          background-clip: text;
          background-image: ${({ theme }) =>
            `linear-gradient(120deg, ${theme.colorsHex.royalBlue} 0%, ${theme.colorsHex.pictonBlue} 100%)`};
          -moz-background-clip: text;
          -webkit-background-clip: text;
          background-size: 100%;
          font-size: inherit;
          padding: ${({ theme }) => `${theme.spaces.micro} 0`};
          -moz-text-fill-color: transparent;
          -webkit-text-fill-color: transparent;
        }
      }
    }
  }
`;

export default Blogs;
