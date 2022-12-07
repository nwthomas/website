import { BlogPosts } from "../../utils/sortBlogPosts";
import Card from "../Card";
import Tag from "../Tag";
import styled from "styled-components";

type Props = {
  blogPosts: BlogPosts;
  tag: string;
};

function BlogSection({ blogPosts, tag }: Props) {
  return (
    <RootStyles>
      <Tag text={tag} />
    </RootStyles>
  );
}

const RootStyles = styled.section`
  width: 100%;
`;

export default BlogSection;
