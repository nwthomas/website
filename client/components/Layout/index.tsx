import React, { ReactNode } from "react";
import Head from "next/head";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Footer from "../Footer";
import Modal from "../Modal";
import { useGetPageName } from "../../hooks/useGetPageName";
import { RootState } from "../../store";

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
