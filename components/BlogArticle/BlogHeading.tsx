import { buildDateUpdatedLabel, buildDateWrittenLabel } from "../../utils/dates";

import { CopyLinkIcon } from "../Icons";
import MetadataTag from "../MetadataTag";
import styled from "styled-components";
import { useMemo } from "react";

type HeadingLevel = 1 | 2 | 3 | 4 | 5;

interface Props {
  contents: React.ReactNode;
  dateUpdated?: string;
  dateWritten?: string;
  level: HeadingLevel;
  linkPath: string;
  routeId: string;
}

function BlogHeading({ contents, dateUpdated, dateWritten, level, linkPath, routeId }: Props) {
  const headingContent = useMemo(() => {
    switch (level) {
      case 2:
        return (
          <h2 id={routeId}>
            <a href={linkPath}>
              {/* The span is to allow contents to show up in reader mode: https://www.leereamsnyder.com/blog/making-headings-with-links-show-up-in-safari-reader */}
              <span>{contents}</span>
            </a>
          </h2>
        );
      case 3:
        return (
          <h3 id={routeId}>
            <a href={linkPath}>
              <span>{contents}</span>
            </a>
          </h3>
        );
      case 4:
        return (
          <h4 id={routeId}>
            <a href={linkPath}>
              <span>{contents}</span>
            </a>
          </h4>
        );
      case 5:
        return (
          <h5 id={routeId}>
            <a href={linkPath}>
              <span>{contents}</span>
            </a>
          </h5>
        );
      case 1:
      default:
        return (
          <h1 id={routeId}>
            <a href={linkPath}>
              <span>{contents}</span>
            </a>
          </h1>
        );
    }
  }, [contents, level, linkPath, routeId]);

  return (
    <RootStyles $level={level}>
      <div>
        <div>
          <a aria-hidden="true" href={linkPath} tabIndex={-1}>
            <CopyLinkIcon color="var(--text-secondary)" />
          </a>
        </div>
        {headingContent}
      </div>
      {dateUpdated || dateWritten ? (
        <div>
          {dateWritten ? <MetadataTag contents={buildDateWrittenLabel(dateWritten)} /> : null}
          {dateUpdated ? <MetadataTag contents={buildDateUpdatedLabel(dateUpdated)} /> : null}
        </div>
      ) : null}
    </RootStyles>
  );
}

interface StyleProps {
  $level: number;
}

const RootStyles = styled.div<StyleProps>`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding-left: 0;
    padding-right: 0;
  }

  > div:nth-child(1) {
    display: grid;
    grid-template-columns: 1fr minmax(1px, var(--article-max-width)) 1fr;
    grid-template-rows: 1fr;
    position: relative;
    width: 100%;

    > div {
      display: flex;
      grid-column-start: 1;
      grid-column-end: 2;
      justify-content: flex-end;
      margin-top: var(--space-large);
      padding-top: ${({ $level }) => ($level === 1 ? "var(--space-medium)" : "var(--space-xsmall)")};
      opacity: 0;
      transition: opacity var(--transition-short) ease-in-out;

      svg {
        display: none;
        height: ${({ $level }) => ($level === 1 ? "var(--space-xlarge)" : "var(--space-medium)")};
        margin-bottom: var(--space-micro);
        margin-right: var(--space-small);
        width: ${({ $level }) => ($level === 1 ? "var(--space-xlarge)" : "var(--space-medium)")};
      }

      @media only screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
        svg {
          display: flex;
        }
      }
    }

    @media only screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
      &:active,
      &:hover {
        > div {
          opacity: 1;
        }
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
      margin-top: var(--space-medium);
      @media only screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
        margin-top: var(--space-large);
      }

      > a {
        color: inherit;
        font-family: "Libre Baskerville", Constantia, "Lucida Bright", Lucidabright, "Lucida Serif", Lucida,
          "DejaVu Serif", "Bitstream Vera Serif", "Liberation Serif", Georgia, serif;
        font-size: inherit;
        text-decoration-color: none;
        text-decoration-style: none;
        text-decoration-line: none;

        &:hover {
          text-decoration: none;
        }

        > span {
          color: inherit;
          font-family: inherit;
          font-size: inherit;
          line-height: inherit;
        }
      }
    }

    h1 {
      grid-column-start: 2;
      grid-column-end: 3;

      @media only screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
        grid-column-end: 4;
      }
    }
  }

  > div:nth-child(2) {
    display: flex;
    flex-wrap: wrap;
    margin-top: calc(var(--space-medium) - var(--space-xxsmall));
    max-width: var(--article-max-width);
    width: 100%;

    > p {
      margin-right: var(--space-small);
    }

    > p:last-of-type {
      margin-right: 0;
    }
  }
`;

export default BlogHeading;
