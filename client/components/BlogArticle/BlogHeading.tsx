import { ReactNode, useCallback, useMemo, useState } from "react";

import styled from "styled-components";

type HeadingLevel = 1 | 2 | 3 | 4 | 5;

interface Props {
  contents: ReactNode & Array<ReactNode>;
  level: HeadingLevel;
  linkPath: string;
  routeId: string;
}

function BlogHeading({ contents, level, linkPath, routeId }: Props) {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const handleOnActivated = useCallback(() => {
    setIsSelected(true);
  }, []);

  const handleOnUnactivated = useCallback(() => {
    setIsSelected(false);
  }, []);

  const headingHandlers = useMemo(() => {
    return {
      onFocus: handleOnActivated,
      onBlur: handleOnUnactivated,
      onMouseEnter: handleOnActivated,
      onMouseLeave: handleOnUnactivated,
    };
  }, [handleOnActivated, handleOnUnactivated]);

  const headingContent = useMemo(() => {
    switch (level) {
      case 2:
        return (
          <h2 {...headingHandlers} id={routeId}>
            <a href={linkPath}>{contents}</a>
          </h2>
        );
      case 3:
        return (
          <h3 {...headingHandlers} id={routeId}>
            <a href={linkPath}>{contents}</a>
          </h3>
        );
      case 4:
        return (
          <h4 {...headingHandlers} id={routeId}>
            <a href={linkPath}>{contents}</a>
          </h4>
        );
      case 5:
        return (
          <h5 {...headingHandlers} id={routeId}>
            <a href={linkPath}>{contents}</a>
          </h5>
        );
      case 1:
      default:
        return (
          <h1 {...headingHandlers} id={routeId}>
            <a href={linkPath}>{contents}</a>
          </h1>
        );
    }
  }, [contents, headingHandlers, level, linkPath]);

  return (
    <RootStyles isSelected={isSelected} level={level}>
      <div>
        <div
          onFocus={handleOnActivated}
          onBlur={handleOnUnactivated}
          onMouseEnter={handleOnActivated}
          onMouseLeave={handleOnUnactivated}
          className="hovered-heading"
        >
          <p {...headingHandlers} tabIndex={-1}>
            #
          </p>
        </div>
        {headingContent}
      </div>
    </RootStyles>
  );
}

interface StyleProps {
  isSelected: boolean;
  level: number;
}

const RootStyles = styled.div<StyleProps>`
  display: flex;
  justify-content: center;
  width: 100%;

  > div {
    display: grid;
    grid-template-columns: ${({ theme }) =>
      `1fr minmax(1px, ${theme.appDimensions.articleMaxWidth}) 1fr`};
    grid-template-rows: 1fr;
    width: 100%;

    > div {
      align-items: flex-end;
      display: ${({ isSelected }) => (isSelected ? "flex" : "none")};
      grid-column-start: 1;
      grid-column-end: 2;
      justify-content: flex-end;

      > p {
        color: ${({ theme }) => theme.colors.textSecondary};
        margin-right: ${({ theme }) => theme.spaces.small};

        ${({ level, theme }) => {
          switch (level) {
            case 1:
              return `font-size: 3rem;

              @media only screen and (min-width: ${theme.breakpoints.tablet}) {
                font-size: 5rem;
              }`;
            default:
              return "font-size: 2rem";
          }
        }}
      }
    }

    h1,
    h2,
    h3,
    h4,
    h5 {
      cursor: pointer;
      grid-column-start: 2;
      grid-column-end: 3;
      padding-top: ${({ theme }) => theme.spaces.large};

      > a {
        color: inherit;
        font-size: inherit;
        text-decoration-color: none;
        text-decoration-style: none;
        text-decoration-line: none;

        &:hover {
          text-decoration: none;
        }
      }
    }

    h1 {
      cursor: pointer;
      grid-column-start: 2;
      grid-column-end: 3;
      padding-top: ${({ theme }) => theme.spaces.large};

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.ultraWide}) {
        grid-column-end: 4;
      }
    }
  }
`;

export default BlogHeading;
