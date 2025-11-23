import * as React from "react";

import styled from "styled-components";

interface Props {
  contents: React.ReactNode;
  isOrderedList?: boolean;
}

function BlogList({ contents, isOrderedList }: Props) {
  const list = React.useMemo(() => {
    if (isOrderedList) {
      return <ol>{contents}</ol>;
    }

    return <ul>{contents}</ul>;
  }, [contents, isOrderedList]);

  return <RootStyles>{list}</RootStyles>;
}

const RootStyles = styled.div`
  display: flex;
  justify-content: center;
  padding-top: var(--space-medium);
  width: 100%;

  > ol,
  ul {
    max-width: var(--article-max-width);
    width: 100%;
  }

  li {
    line-height: 1.8;
    list-style-type: decimal;
    list-style-position: inside;
    margin-top: var(--space-nano);
    /* Offset the bullets to not have text wrap underneath */
    padding-left: 1em;
    text-indent: -1em;

    > a {
      font-family: inherit;
      font-size: inherit;
    }
  }

  li:nth-child(1) {
    margin-top: 0;
  }

  ul > li {
    list-style-type: "→ ";
    padding-left: 1.2em;
    text-indent: -1.2em;
  }
`;

export default BlogList;
