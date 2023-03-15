import * as React from "react";

import Link from "next/link";
import styled from "styled-components";

interface Props {
  ariaLabel?: string;
  children: React.ReactNode | Array<React.ReactNode>;
  currentPath: string;
  route: string;
}

function NavbarLink({ ariaLabel, children, currentPath, route }: Props) {
  const isCurrentPage = currentPath === route;

  return (
    <RootStyles isCurrentPage={isCurrentPage}>
      <Link aria-label={ariaLabel} href={route} prefetch={false}>
        {children}
      </Link>
    </RootStyles>
  );
}

interface StyleProps {
  isCurrentPage: boolean;
}

const RootStyles = styled.div<StyleProps>`
  > a {
    ${({ isCurrentPage, theme }) => {
      if (isCurrentPage) {
        return `color: ${theme.colors.text};`;
      }

      return "";
    }}
  }
`;

export default NavbarLink;
