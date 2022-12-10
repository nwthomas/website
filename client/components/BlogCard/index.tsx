import * as React from "react";

import styled, { ThemeContext } from "styled-components";

import { ArrowForwardsIcon } from "../Icons";

interface Props {
  description: string;
  title: string;
  url: string;
}

function BlogCard({ description, title, url }: Props) {
  const { colorsHex } = React.useContext(ThemeContext);

  return (
    <RootStyles>
      <a href={`/blog/${url}`}>
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div>
          <p>Read more</p>
          <ArrowForwardsIcon color={colorsHex.royalBlue} />
        </div>
      </a>
    </RootStyles>
  );
}

const RootStyles = styled.article`
  border-radius: ${({ theme }) => theme.borderRadii.xxLarge};
  display: flex;
  flex: 1;
  width: 100%;

  > a {
    background-color: ${({ theme }) => theme.colors.bodyBackground};
    border: ${({ theme }) =>
      `${theme.spaces.nano} solid ${theme.colors.bodyBackgroundAccentTwo}`};
    border-radius: ${({ theme }) => theme.borderRadii.xxLarge};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 300px;
    padding: ${({ theme }) => theme.spaces.medium};
    transition: background-color ${({ theme }) => theme.transitions.short}
        ease-in-out,
      border ${({ theme }) => theme.transitions.short} ease-in-out;
    text-decoration: none;
    width: 100%;

    > div {
      width: 100%;

      > h2 {
        display: block;
        font-size: 2rem;
        letter-spacing: ${({ theme }) => theme.spaces.micro};
        margin-bottom: ${({ theme }) => theme.spaces.medium};
      }

      > p {
        font-size: 2rem;
        transition: color ${({ theme }) => theme.transitions.short} ease-in-out;
      }
    }

    > div:nth-child(2) {
      align-items: center;
      display: flex;

      > p {
        color: ${({ theme }) => theme.colors.textSecondary};
        font-size: 2rem;
      }

      > svg {
        height: ${({ theme }) => theme.spaces.medium};
        margin-left: ${({ theme }) => theme.spaces.micro};
        opacity: ${({ theme }) => theme.opacity.opacity00};
        transition: opacity ${({ theme }) => theme.transitions.medium}
          ease-in-out;
        width: ${({ theme }) => theme.spaces.medium};
      }
    }

    &:focus,
    &:hover {
      background-color: ${({ theme }) => theme.colors.bodyBackgroundAccentOne};
      border: ${({ theme }) =>
        `${theme.spaces.nano} solid ${theme.colorsHex.royalBlue}`};
      border-radius: ${({ theme }) => theme.borderRadii.xxLarge};
      outline: none;

      > div:nth-child(2) {
        > p {
          color: ${({ theme }) => theme.colorsHex.royalBlue};
        }

        > svg {
          opacity: ${({ theme }) => theme.opacity.opacity100};
        }
      }
    }
  }
`;

export default BlogCard;
