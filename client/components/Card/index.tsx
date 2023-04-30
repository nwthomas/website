import * as React from "react";

import { ArrowForwardsIcon, YouTubeIcon } from "../Icons";

import Link from "next/link";
import MetadataTag from "../MetadataTag";
import styled from "styled-components";

interface Props {
  metadata?: Array<string>;
  description: string;
  routeOutLabel: string;
  title: string;
  url: string;
  withYouTubeIcon?: boolean;
}

function BlogCard({
  metadata,
  description,
  routeOutLabel,
  title,
  url,
  withYouTubeIcon,
}: Props) {
  const metadataTags = React.useMemo(() => {
    if (!metadata) {
      return [];
    }

    return metadata.map((value: string, i: number) => {
      return <MetadataTag contents={value} key={i} />;
    });
  }, [metadata]);

  return (
    <RootStyles>
      <Link href={url} passHref prefetch={false}>
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div>
          <div>
            <p>{routeOutLabel}</p>
            <ArrowForwardsIcon color="var(--text-secondary)" isAriaHidden />
          </div>
          {!withYouTubeIcon && metadata && metadata.length > 0
            ? metadataTags
            : null}
          {withYouTubeIcon ? <YouTubeIcon color="var(--color-red)" /> : null}
        </div>
      </Link>
    </RootStyles>
  );
}

const RootStyles = styled.article`
  border-radius: var(--border-radius-medium);
  display: flex;
  flex: 1;
  height: 100%;
  width: 100%;

  > a {
    border: var(--space-nano) solid var(--body-bg-accent-two);
    border-radius: var(--border-radius-medium);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 150px;
    padding: var(--space-medium);
    position: relative;
    transition: border var(--transition-short) ease-in-out;
    text-decoration: none;
    width: 100%;

    @media only screen and (min-width: ${({ theme }) =>
      theme.breakpoints.tablet}) {
      min-height: 200px;
    }

    > div:nth-child(1) {
      width: 100%;

      > h2 {
        margin-bottom: var(--space-small);
      }

      > p {
        transition: color var(--transition-short) ease-in-out;
        margin-bottom: var(--space-medium);
      }
    }

    > div:nth-child(2) {
      align-items: center;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-top: var(--space-medium);

      > div {
        align-items: center;
        display: flex;

        > p {
          color: var(--text-secondary);
          line-height: 1;
        }

        > svg {
          height: var(--space-medium);
          margin-left: var(--space-micro);
          opacity: 0;
          transition: opacity var(--transition-short) ease-in-out;
          width: var(--space-medium);
        }
      }

      > svg {
        height: auto;
        width: var(--space-large);
      }
    }

    &:hover {
      border: var(--space-nano) solid var(--color-royal-blue);
      border-radius: var(--border-radius-medium);
      outline: none;

      > div:nth-child(2) > div > svg {
        opacity: 1;
    }
  }
`;

export default BlogCard;
