import * as React from "react";

import styled from "styled-components";

interface Props {
  contents: React.ReactNode & Array<React.ReactNode>;
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
  padding-top: ${({ theme }) => theme.spaces.medium};
  width: 100%;

  > ol {
    max-width: ${({ theme }) => theme.appDimensions.articleMaxWidth};
    width: 100%;

    > li {
      line-height: 1.8;
      list-style-type: disc;
      margin-top: ${({ theme }) => theme.spaces.medium};

      > a {
        font-family: inherit;
        font-size: inherit;
      }
    }

    > li:nth-child(1) {
      margin-top: 0;
    }
  }
`;

export default BlogList;
