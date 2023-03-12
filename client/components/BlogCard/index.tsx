import * as React from "react";

import styled, { ThemeContext } from "styled-components";

import { ArrowForwardsIcon } from "../Icons";
import Link from "next/link";
import MetadataTag from "../MetadataTag";

interface Props {
  dateWritten?: string;
  description: string;
  title: string;
  url: string;
}

function BlogCard({ dateWritten, description, title, url }: Props) {
  const { colors } = React.useContext(ThemeContext);

  return (
    <RootStyles>
      <Link href={`/blog/${url}`} passHref>
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div>
          <div>
            <p>Read more</p>
            <ArrowForwardsIcon color={colors.textSecondary} isAriaHidden />
          </div>
          {dateWritten ? <MetadataTag contents={dateWritten} /> : null}
        </div>
      </Link>
    </RootStyles>
  );
}

const RootStyles = styled.article`
  border-radius: ${({ theme }) => theme.borderRadii.medium};
  display: flex;
  flex: 1;
  height: 100%;
  width: 100%;

  > a {
    border: ${({ theme }) =>
      `${theme.spaces.nano} solid ${theme.colors.bodyBackgroundAccentTwo}`};
    border-radius: ${({ theme }) => theme.borderRadii.medium};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 150px;
    padding: ${({ theme }) => theme.spaces.medium};
    position: relative;
    transition: border ${({ theme }) => theme.transitions.short} ease-in-out;
    text-decoration: none;
    width: 100%;

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.tablet}) {
      min-height: 200px;
    }

    > div:nth-child(1) {
      width: 100%;

      > h2 {
        margin-bottom: ${({ theme }) => theme.spaces.small};
      }

      > p {
        transition: color ${({ theme }) => theme.transitions.short} ease-in-out;
        margin-bottom: ${({ theme }) => theme.spaces.medium};
      }
    }

    > div:nth-child(2) {
      display: flex;
      justify-content: space-between;
      margin-top: ${({ theme }) => theme.spaces.medium};

      > div {
        align-items: center;
        display: flex;

        > p {
          color: ${({ theme }) => theme.colors.textSecondary};
        }

        > svg {
          height: ${({ theme }) => theme.spaces.medium};
          margin-left: ${({ theme }) => theme.spaces.micro};
          opacity: ${({ theme }) => theme.opacity.opacity00};
          transition: opacity ${({ theme }) => theme.transitions.short}
            ease-in-out;
          width: ${({ theme }) => theme.spaces.medium};
        }
      }
    }

    &:hover {
      border: ${({ theme }) =>
        `${theme.spaces.nano} solid ${theme.colorsHex.pictonBlue}`};
      border-radius: ${({ theme }) => theme.borderRadii.medium};
      outline: none;

      > div:nth-child(2) > div > svg {
        opacity: ${({ theme }) => theme.opacity.opacity100};
      }
    }
  }
`;

export default BlogCard;
