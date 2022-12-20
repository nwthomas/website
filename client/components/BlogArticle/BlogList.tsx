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
  padding-left: ${({ theme }) => theme.appDimensions.appHorizontalGutters};
  padding-right: ${({ theme }) => theme.appDimensions.appHorizontalGutters};
  padding-top: ${({ theme }) => theme.spaces.medium};
  width: 100%;

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpoints.tablet}) {
    padding-top: ${({ theme }) => theme.spaces.large};
  }

  > ol {
    max-width: ${({ theme }) => theme.appDimensions.articleMaxWidth};
    width: 100%;

    > li {
      line-height: 1.8;
      list-style-type: disc;
      margin-top: ${({ theme }) => theme.spaces.small};

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.tablet}) {
        margin-top: ${({ theme }) => theme.spaces.medium};
      }
    }

    > li:nth-child(1) {
      margin-top: 0;
    }
  }
`;

export default BlogList;
