import React, { ReactNode } from "react";

import Footer from "../Footer";
import Modal from "../Modal";
import { RootState } from "../../store";
import SEO from "../SEO";
import styled from "styled-components";
import { useSelector } from "react-redux";

interface Props {
  children: ReactNode | Array<ReactNode>;
  isArticle?: boolean;
  pageName: string;
  withFooter?: boolean;
  withPageNameEmojis?: boolean;
}

function Layout({
  children,
  isArticle,
  pageName,
  withFooter,
  withPageNameEmojis,
}: Props) {
  const shouldShowModal = useSelector(
    (state: RootState) => state.modal.shouldShowModal
  );

  return (
    <>
      <SEO
        isArticle={isArticle}
        pageName={pageName}
        withPageNameEmojis={withPageNameEmojis}
      />
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
  justify-content: center;
  padding: ${({ theme }) =>
    `${theme.appDimensions.navbarMobileHeight} 0 ${theme.appDimensions.footerMobileHeight}`};
  min-height: ${({ theme }) => theme.appDimensions.appMinHeight};
  position: relative;
  width: 100%;

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpoints.tablet}) {
    padding: ${({ theme }) =>
      `${theme.appDimensions.navbarTabletHeight} 0 ${theme.appDimensions.footerTabletHeight}`};
  }

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpoints.desktop}) {
    padding: ${({ theme }) =>
      `${theme.appDimensions.navbarDesktopHeight} 0 ${theme.appDimensions.footerDesktopHeight}`};
  }
`;

export default Layout;
