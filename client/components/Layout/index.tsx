import React, { ReactNode, useContext } from "react";
import Head from "next/head";
import { usePageName } from "../../hooks/usePageName";
import BabyYoda from "../EasterEggs/BabyYoda";
import styled, { ThemeContext } from "styled-components";

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
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RootStyles>
        {children}
        <BabyYoda />
      </RootStyles>
    </>
  );
}
const RootStyles = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: ${({ theme }) => theme.appDimensions.footerHeight};
  max-width: ${({ theme }) => theme.appDimensions.appMaxWidth};
  min-height: ${({ theme }) => theme.appDimensions.appMinHeight};
  padding: ${({ theme }) =>
    `${theme.appDimensions.navbarHeight} 0 calc(${theme.appDimensions.mobileFooterHeight} + ${theme.spaces.large})`};
  position: relative;
  width: 100%;
`;

export default Layout;
