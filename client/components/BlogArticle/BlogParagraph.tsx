import * as React from "react";

import styled from "styled-components";

interface Props {
  contents: React.ReactNode & Array<React.ReactNode>;
}

function BlogParagraph({ contents }: Props) {
  return (
    <RootStyles>
      <p>{contents}</p>
    </RootStyles>
  );
}

const RootStyles = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spaces.medium};
  width: 100%;

  > p {
    max-width: ${({ theme }) => theme.appDimensions.articleMaxWidth};
    width: 100%;

    a {
      font-family: inherit;
      font-size: inherit;
    }

    em,
    i {
      font-style: italic;
    }

    b {
      font-style: bold;
    }
  }
`;

export default BlogParagraph;
