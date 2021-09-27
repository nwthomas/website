import React, { ReactNode, useContext } from "react";
import Head from "next/head";
import { usePageName } from "../../hooks/usePageName";
import styled, { ThemeContext } from "styled-components";
import Footer from "../Footer";

interface Props {
  children: ReactNode | Array<ReactNode>;
  pageName: string;
}

function Layout({ children, pageName }: Props) {
  const currentPageName = usePageName(pageName);
  const theme = useContext(ThemeContext);

  return (
    <>
      <Head>
        <title>{currentPageName}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <RootStyles>
        {children}
        <Footer />
      </RootStyles>
    </>
  );
}
const RootStyles = styled.div`
  display: flex;
  background: ${({ theme }) => theme.colors.bodyBackground};
  justify-content: center;
  padding: ${({ theme }) =>
    `${theme.appDimensions.navbarHeight} 0 ${theme.appDimensions.footerMobileHeight}`};
  min-height: ${({ theme }) => theme.appDimensions.appMinHeight};
  position: relative;
  width: 100%;

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpoints.tablet}) {
    padding: ${({ theme }) =>
      `${theme.appDimensions.navbarHeight} 0 ${theme.appDimensions.footerDesktopHeight}`};
  }
`;

export default Layout;
