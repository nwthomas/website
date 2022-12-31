import React, { ReactNode } from "react";

import Footer from "../Footer";
import Modal from "../Modal";
import { RootState } from "../../store";
import SEO from "../SEO";
import styled from "styled-components";
import { useIsArticlePage } from "../../hooks";
import { useSelector } from "react-redux";

interface Props {
  children: ReactNode | Array<ReactNode>;
  imageUrl?: string;
  isArticle?: boolean;
  pageName: string;
  withFooter?: boolean;
  withPageNameEmojis?: boolean;
}

function Layout({
  children,
  imageUrl,
  isArticle,
  pageName,
  withFooter,
  withPageNameEmojis,
}: Props) {
  const isArticlePage = useIsArticlePage();
  const shouldShowModal = useSelector(
    (state: RootState) => state.modal.shouldShowModal
  );

  return (
    <>
      <SEO
        customImageUrl={imageUrl}
        isArticle={isArticle}
        pageName={pageName}
        withPageNameEmojis={withPageNameEmojis}
      />
      <RootStyles isArticlePage={isArticlePage}>
        {children}
        {withFooter ? <Footer /> : null}
        {shouldShowModal ? <Modal /> : null}
      </RootStyles>
    </>
  );
}

interface StyleProps {
  isArticlePage: boolean;
}

const RootStyles = styled.div<StyleProps>`
  display: flex;
  justify-content: center;
  padding-top: ${({ theme }) => theme.appDimensions.navbarMobileHeight};
  padding-bottom: ${({ theme }) => theme.appDimensions.footerMobileHeight};
  min-height: ${({ theme }) => theme.appDimensions.appMinHeight};
  /* mobile viewport bug fix */
  min-height: -webkit-fill-available;
  position: relative;
  width: 100%;

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpoints.tablet}) {
    padding-top: ${({ theme }) => theme.appDimensions.navbarTabletHeight};
    padding-bottom: ${({ isArticlePage, theme }) =>
      isArticlePage
        ? theme.appDimensions.footerArticleHeight
        : theme.appDimensions.footerTabletHeight};
  }

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpoints.desktop}) {
    padding-top: ${({ theme }) => theme.appDimensions.navbarDesktopHeight};
    padding-bottom: ${({ isArticlePage, theme }) =>
      isArticlePage
        ? theme.appDimensions.footerArticleHeight
        : theme.appDimensions.footerDesktopHeight};
  }
`;

export default Layout;
