import * as React from "react";

import {
  buildDateUpdatedLabel,
  buildDateWrittenLabel,
} from "../../utils/dates";
import styled, { ThemeContext } from "styled-components";

import { CopyLinkIcon } from "../Icons";

type HeadingLevel = 1 | 2 | 3 | 4 | 5;

interface Props {
  contents: React.ReactNode & Array<React.ReactNode>;
  dateUpdated?: string;
  dateWritten?: string;
  level: HeadingLevel;
  linkPath: string;
  routeId: string;
}

function BlogHeading({
  contents,
  dateUpdated,
  dateWritten,
  level,
  linkPath,
  routeId,
}: Props) {
  const [isSelected, setIsSelected] = React.useState<boolean>(false);
  const { colors } = React.useContext(ThemeContext);

  const handleOnActivated = React.useCallback(() => {
    setIsSelected(true);
  }, []);

  const handleOnUnactivated = React.useCallback(() => {
    setIsSelected(false);
  }, []);

  const handleHeadingClicked = React.useCallback(() => {
    document.getElementById(routeId)?.scrollIntoView();
  }, [routeId]);

  const headingHandlers = React.useMemo(() => {
    return {
      onClick: handleHeadingClicked,
      onFocus: handleOnActivated,
      onBlur: handleOnUnactivated,
      onMouseEnter: handleOnActivated,
      onMouseLeave: handleOnUnactivated,
    };
  }, [handleHeadingClicked, handleOnActivated, handleOnUnactivated]);

  const headingContent = React.useMemo(() => {
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
  }, [contents, headingHandlers, level, linkPath, routeId]);

  return (
    <RootStyles isSelected={isSelected} level={level}>
      <div>
        <div
          onFocus={handleOnActivated}
          onBlur={handleOnUnactivated}
          onMouseEnter={handleOnActivated}
          onMouseLeave={handleOnUnactivated}
        >
          <a
            {...headingHandlers}
            aria-hidden="true"
            href={linkPath}
            tabIndex={-1}
          >
            <CopyLinkIcon color={colors.textSecondary} />
          </a>
        </div>
        {headingContent}
      </div>
      {dateUpdated || dateWritten ? (
        <div>
          {dateWritten ? <p>{buildDateWrittenLabel(dateWritten)}</p> : null}
          {dateUpdated ? <p>{buildDateUpdatedLabel(dateUpdated)}</p> : null}
        </div>
      ) : null}
    </RootStyles>
  );
}

interface StyleProps {
  isSelected: boolean;
  level: number;
}

const RootStyles = styled.div<StyleProps>`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpoints.desktop}) {
    padding-left: 0;
    padding-right: 0;
  }

  > div:nth-child(1) {
    display: grid;
    grid-template-columns: ${({ theme }) =>
      `1fr minmax(1px, ${theme.appDimensions.articleMaxWidth}) 1fr`};
    grid-template-rows: 1fr;
    position: relative;
    width: 100%;

    > div {
      display: flex;
      margin-top: ${({ theme }) => theme.spaces.large};
      padding-top: ${({ level, theme }) =>
        level === 1 ? theme.spaces.medium : theme.spaces.xSmall};
      opacity: ${({ theme }) => theme.opacity.opacity00};
      transition: opacity ${({ theme }) => theme.transitions.short} ease-in-out;
    }

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.desktop}) {
      &:active,
      &:hover {
        @media only screen and (min-width: ${({ theme }) =>
            theme.breakpoints.desktop}) {
          > div {
            grid-column-start: 1;
            grid-column-end: 2;
            justify-content: flex-end;
            opacity: ${({ theme }) => theme.opacity.opacity100};

            svg {
              height: ${({ level, theme }) =>
                level === 1 ? theme.spaces.xLarge : theme.spaces.medium};
              margin-bottom: ${({ theme }) => theme.spaces.micro};
              margin-right: ${({ theme }) => theme.spaces.small};
              width: ${({ level, theme }) =>
                level === 1 ? theme.spaces.xLarge : theme.spaces.medium};
            }
          }
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
      margin-top: ${({ theme }) => theme.spaces.large};

      > a {
        color: inherit;
        font-family: "Libre Baskerville", Constantia, "Lucida Bright",
          Lucidabright, "Lucida Serif", Lucida, "DejaVu Serif",
          "Bitstream Vera Serif", "Liberation Serif", Georgia, serif;
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
      grid-column-start: 2;
      grid-column-end: 3;

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.desktop}) {
        grid-column-end: 4;
      }
    }
  }

  > div:nth-child(2) {
    display: flex;
    max-width: ${({ theme }) => theme.appDimensions.articleMaxWidth};
    margin-top: ${({ theme }) => theme.spaces.medium};
    width: 100%;

    > p {
      background-color: ${({ theme }) => theme.colors.bodyBackgroundAccentTwo};
      border-radius: ${({ theme }) => theme.borderRadii.small};
      font-size: 1.4rem;
      margin-right: ${({ theme }) => theme.spaces.small};
      padding: ${({ theme }) =>
        `${theme.spaces.nano} calc(${theme.spaces.micro} * 2) ${theme.spaces.micro}`};

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.tablet}) {
        font-size: 1.6rem;
      }
    }

    > p:last-of-type {
      margin-right: 0;
    }
  }
`;

export default BlogHeading;
