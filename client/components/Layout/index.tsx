import React, { ReactNode } from "react";

import Footer from "../Footer";
import Head from "next/head";
import Modal from "../Modal";
import { RootState } from "../../store";
import styled from "styled-components";
import { useGetPageName } from "../../hooks/useGetPageName";
import { useSelector } from "react-redux";

interface Props {
  children: ReactNode | Array<ReactNode>;
  pageName: string;
  withFooter?: boolean;
}

function Layout({ children, pageName, withFooter }: Props) {
  const currentPageName = useGetPageName(pageName);
  const shouldShowModal = useSelector(
    (state: RootState) => state.modal.shouldShowModal
  );

  return (
    <>
      <Head>
        <title>{currentPageName}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <RootStyles>
        {children}
        {withFooter ? <Footer /> : null}
        {shouldShowModal ? <Modal /> : null}
      </RootStyles>
    </>
  );
}

const RootStyles = styled.div`
  display: flex;
  background: ${({ theme }) => theme.colors.bodyBackground};
  justify-content: center;
  padding: ${({ theme }) =>
    `${theme.appDimensions.navbarMobileHeight} 0 ${theme.appDimensions.footerMobileHeight}`};
  min-height: ${({ theme }) => theme.appDimensions.appMinHeight};
  position: relative;
  width: 100%;

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpoints.tablet}) {
    padding: ${({ theme }) =>
      `${theme.appDimensions.navbarDesktopHeight} 0 ${theme.appDimensions.footerDesktopHeight}`};
  }
`;

export default Layout;
