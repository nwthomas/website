import * as React from "react";

import Footer from "../Footer";
import Modal from "../Modal";
import Navbar from "../Navbar";
import SEO from "../SEO";
import { selectShouldShowModal } from "../../store/selectors/modalSelectors";
import styled from "styled-components";
import { useGetScreenDimensions } from "../../hooks";
import { useSelector } from "react-redux";

interface Props {
  children: React.ReactNode | Array<React.ReactNode>;
  customSEODescription?: string;
  customSEOImageUrl?: string;
  isArticle?: boolean;
  pageName: string;
  withFooter?: boolean;
  withPageNameEmojis?: boolean;
}

function Layout({
  children,
  customSEODescription,
  customSEOImageUrl,
  isArticle,
  pageName,
  withFooter,
  withPageNameEmojis,
}: Props) {
  const { availableHeight } = useGetScreenDimensions();
  const shouldShowModal = useSelector(selectShouldShowModal);

  // This is a bit of a hack to get around the fact that mobile devices don't play nicely
  // with 100vh. This will pin the footer to the bottom of any screen on mobile.
  React.useEffect(() => {
    if (typeof availableHeight === "number" && typeof window !== "undefined") {
      const { documentElement } = document;
      const newAvailableHeightPx = `${availableHeight}px`;

      documentElement.style.setProperty(
        "--app-min-height",
        newAvailableHeightPx
      );
    }
  }, [availableHeight]);

  return (
    <>
      <SEO
        customImageUrl={customSEOImageUrl}
        customDescription={customSEODescription}
        isArticle={isArticle}
        pageName={pageName}
        withPageNameEmojis={withPageNameEmojis}
      />
      <RootStyles>
        <Navbar />
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
  /**
    * If I told you how long I spent figuring out why my code blog <pre> tags weren't respecting
    * 'overflow-x: auto;', you wouldn't believe me. Let's just say this 'min-width: 0;' is
    * really really necessary.
    *
    * See: https://weblog.west-wind.com/posts/2016/feb/15/flexbox-containers-pre-tags-and-managing-overflow
    */
  min-width: 0;
  padding-top: ${({ theme }) => theme.appDimensions.navbarMobileHeight};
  padding-bottom: ${({ theme }) => theme.appDimensions.footerMobileHeight};
  min-height: ${({ theme }) => theme.appDimensions.appMinHeight};
  position: relative;
  width: 100%;

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpoints.tablet}) {
    padding-top: ${({ theme }) => theme.appDimensions.navbarTabletHeight};
    padding-bottom: ${({ theme }) => theme.appDimensions.footerTabletHeight};
  }

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpoints.desktop}) {
    padding-top: ${({ theme }) => theme.appDimensions.navbarDesktopHeight};
    padding-bottom: ${({ theme }) => theme.appDimensions.footerDesktopHeight};
  }
`;

export default Layout;
