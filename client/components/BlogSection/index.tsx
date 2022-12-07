import * as React from "react";

import { BlogPosts } from "../../utils/sortBlogPosts";
import Card from "../BlogCard";
import Tag from "../Tag";
import styled from "styled-components";

type Props = {
  blogPosts: BlogPosts;
  tag: string;
};

function BlogSection({ blogPosts, tag }: Props) {
  const blogCards = React.useMemo(() => {
    return blogPosts.map((blogPost, i) => {
      return (
        <Card
          description={blogPost.data.metaDescription}
          title={blogPost.data.metaTitle}
          key={i}
        />
      );
    });
  }, [blogPosts]);

  return (
    <RootStyles>
      <div>
        <Tag text={tag} />
      </div>
      <div>{blogCards}</div>
    </RootStyles>
  );
}

const RootStyles = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;

  > div:nth-child(1) {
    display: flex;
    margin-bottom: ${({ theme }) => theme.spaces.medium};
  }

  > div:nth-child(2) {
    display: flex;
    margin-bottom: ${({ theme }) => theme.spaces.xxLarge};
  }
`;

export default BlogSection;
