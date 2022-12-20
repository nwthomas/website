import { ReactNode } from "react";
import styled from "styled-components";

interface Props {
  contents: ReactNode & Array<ReactNode>;
  isOrderedList?: boolean;
}

function BlogList({ contents, isOrderedList }: Props) {
  return (
    <RootStyles>
      <ol>{contents}</ol>
    </RootStyles>
  );
}

const RootStyles = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  > ol {
    max-width: ${({ theme }) => theme.appDimensions.articleMaxWidth};
    width: 100%;

    > li {
      font-size: 2rem;
      line-height: 1.8;
      list-style-type: disc;
      margin-top: ${({ theme }) => theme.spaces.medium};
    }
  }
`;

export default BlogList;
