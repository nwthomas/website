import * as React from "react";
import Link from "next/link";
import styled from "styled-components";

interface Props {
  children: React.ReactNode | Array<React.ReactNode>;
  currentPath: string;
  route: string;
}

function NavbarLink({ children, currentPath, route }: Props) {
  const isCurrentPage = currentPath === route;

  return (
    <RootStyles isCurrentPage={isCurrentPage}>
      <Link href={route}>{children}</Link>
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
        return `text-decoration-color: ${theme.colors.textSecondary};`;
      }

      return "";
    }}

    &:focus {
      outline: none;
      text-decoration-color: ${({ theme }) => theme.colors.textSecondary};
    }
  }
`;

export default NavbarLink;
