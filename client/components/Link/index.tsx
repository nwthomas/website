import React from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import styled from "styled-components";

interface Props {
  children: string | React.ReactNode;
  hoverColor: string;
  href: string;
}

function Link({ children, hoverColor, href }: Props) {
  const { pathname } = useRouter();

  return (
    <RootStyles hoverColor={hoverColor} isActive={isActiveLink(pathname, href)}>
      <NextLink href={href} passHref>
        {children}
      </NextLink>
    </RootStyles>
  );
}

export function isActiveLink(routerPathname: string, hrefPathname: string) {
  if (
    routerPathname.length === 1 &&
    hrefPathname.length === 1 &&
    routerPathname === hrefPathname
  ) {
    return true;
  }

  // This removes any empty strings after splitting on '/' so we can compare base baths
  const routerPathnameArray = routerPathname.split("/").filter(Boolean);
  const hrefPathnameArray = hrefPathname.split("/").filter(Boolean);

  let isActive = false;
  if (!routerPathnameArray && !hrefPathnameArray) {
    isActive = true;
  } else if (
    routerPathnameArray.length &&
    hrefPathnameArray.length &&
    routerPathnameArray[0] === hrefPathnameArray[0]
  ) {
    isActive = true;
  }

  return isActive;
}

interface StyleProps {
  hoverColor: string;
  isActive: boolean;
}

const RootStyles = styled.div<StyleProps>`
  a {
    align-items: center;
    display: flex;
    color: ${({ hoverColor, isActive, theme }) =>
      isActive ? hoverColor : theme.colors.text};
    height: 100%;
    justify-content: center;
    width: 100%;

    &:hover {
      color: ${({ hoverColor }) => hoverColor};
    }
  }
`;

export default Link;
