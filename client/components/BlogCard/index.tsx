import * as React from "react";

import styled, { ThemeContext } from "styled-components";

import { ArrowForwardsIcon } from "../Icons";

interface Props {
  description: string;
  title: string;
  url: string;
}

function BlogCard({ description, title, url }: Props) {
  const { colors } = React.useContext(ThemeContext);

  return (
    <RootStyles>
      <a href={`/blog/${url}`}>
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div>
          <p>Read more</p>
          <ArrowForwardsIcon color={colors.textSecondary} />
        </div>
      </a>
    </RootStyles>
  );
}

const RootStyles = styled.article`
  border-radius: ${({ theme }) => theme.borderRadii.xxLarge};
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
    min-height: 200px;
    padding: ${({ theme }) => theme.spaces.medium};
    transition: border ${({ theme }) => theme.transitions.short} ease-in-out;
    text-decoration: none;
    width: 100%;

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.tablet}) {
      min-height: 300px;
    }

    > div {
      width: 100%;

      > h2 {
        margin-bottom: ${({ theme }) => theme.spaces.medium};
      }

      > p {
        transition: color ${({ theme }) => theme.transitions.short} ease-in-out;
      }
    }

    > div:nth-child(2) {
      align-items: center;
      display: flex;
      margin-top: ${({ theme }) => theme.spaces.medium};

      > p {
        color: ${({ theme }) => theme.colors.textSecondary};
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
      border: ${({ theme }) =>
        `${theme.spaces.nano} solid ${theme.colorsHex.pictonBlue}`};
      border-radius: ${({ theme }) => theme.borderRadii.medium};
      outline: none;

      > div > h2 {
        background-clip: text;
        -moz-background-clip: text;
        -webkit-background-clip: text;
        background-image: ${({ theme }) =>
          `linear-gradient(90deg, ${theme.colorsHex.lavender} 0%, ${theme.colorsHex.orchid} 33%, ${theme.colorsHex.brilliantRose} 66%, ${theme.colorsHex.brilliantRose} 100%)`};
        background-size: 100%;
        -moz-text-fill-color: transparent;
        -webkit-text-fill-color: transparent;
        text-decoration: none;
      }

      > div:nth-child(2) > svg {
        opacity: ${({ theme }) => theme.opacity.opacity100};
      }
    }
  }
`;

export default BlogCard;
