import * as React from "react";

import styled, { ThemeContext } from "styled-components";

import { ArrowForwardsIcon } from "../Icons";
import { useGetMouseRadian } from "../../hooks/useGetMouseRadian";

type Props = {
  title: string;
  description: string;
};

function BlogCard({ description, title }: Props) {
  const [isActive, setIsActive] = React.useState<boolean>(false);
  const blogCardRef = React.useRef<HTMLElement | null>(null);
  const { colorsHex } = React.useContext(ThemeContext);
  const radians = useGetMouseRadian(blogCardRef);

  const handleIsCardActive = React.useCallback(() => {
    setIsActive(!isActive);
  }, [isActive]);

  return (
    <RootStyles
      onMouseEnter={handleIsCardActive}
      onMouseLeave={handleIsCardActive}
      ref={blogCardRef}
      style={{ transform: `rotate3d(1, 1, 1, ${isActive ? radians : 0}rad)` }}
    >
      <a href="/blog/clone-graph">
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
  background-color: ${({ theme }) => theme.colors.bodyBackground};
  border-radius: ${({ theme }) => theme.borderRadii.xxLarge};
  height: 300px;
  margin-right: 20px;
  max-width: 350px;
  transition: transform ${({ theme }) => theme.transitions.medium} ease-in-out
  width: 100%;

  > a {
    justify-content: space-between;
    border: ${({ theme }) =>
      `${theme.spaces.nano} solid ${theme.colors.bodyBackgroundAccentTwo}`};
    border-radius: ${({ theme }) => theme.borderRadii.xxLarge};
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: ${({ theme }) => theme.spaces.medium};
    transition: border ${({ theme }) => theme.transitions.medium} ease-in-out;
    text-decoration: none;
    width: 100%;

    > div {
      width: 100%;

      > h2 {
        font-size: 2rem;
        letter-spacing: ${({ theme }) => theme.spaces.micro};
        transition: opacity ${({ theme }) => theme.transitions.medium}
          ease-in-out;
        text-transform: uppercase;
      }

      > p {
        font-size: 2rem;
        transition: color ${({ theme }) =>
          theme.transitions.medium} ease-in-out,
          opacity ${({ theme }) => theme.transitions.medium} ease-in-out;
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
      border: ${({ theme }) =>
        `${theme.spaces.nano} solid ${theme.colorsHex.royalBlue}`};
      border-radius: ${({ theme }) => theme.borderRadii.xxLarge};
      outline: none;

      > div:nth-child(1) {
        h2,
        p {
          opacity: ${({ theme }) => theme.opacity.opacity80};
        }
      }

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
