import { ReactNode, useMemo } from "react";

import styled from "styled-components";

interface Props {
  contents: ReactNode & Array<ReactNode>;
  level: 1 | 2 | 3 | 4 | 5;
}

function BlogHeading({ contents, level }: Props) {
  const headingContent = useMemo(() => {
    switch (level) {
      case 2:
        return <h2>{contents}</h2>;
      case 3:
        return <h3>{contents}</h3>;
      case 4:
        return <h4>{contents}</h4>;
      case 5:
        return <h5>{contents}</h5>;
      case 1:
      default:
        return <h1>{contents}</h1>;
    }
  }, [contents, level]);

  return (
    <RootStyles>
      <div>{headingContent}</div>
    </RootStyles>
  );
}

const RootStyles = styled.div`
  display: flex;
  justify-content: center;
  padding-top: ${({ theme }) => theme.spaces.large};
  width: 100%;

  > div {
    margin-left: ${({ theme }) =>
      `calc((100% - ${theme.appDimensions.articleMaxWidth}) / 2)`};
    width: 100%;
  }
`;

export default BlogHeading;
