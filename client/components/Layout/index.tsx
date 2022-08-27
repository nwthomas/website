import React, { ReactNode } from "react";
import styled, { ThemeContext } from "styled-components";

import Footer from "../Footer";
import Modal from "../Modal";
import { RootState } from "../../store";
import SEO from "../SEO";
import { useGetPageName } from "../../hooks/useGetPageName";
import { useSelector } from "react-redux";

interface Props {
  children: ReactNode | Array<ReactNode>;
  pageName: string;
  withFooter?: boolean;
}

function Layout({ children, pageName, withFooter }: Props) {
  const tabTitle = useGetPageName(pageName);
  const { currentTheme } = React.useContext(ThemeContext);
  const shouldShowModal = useSelector(
    (state: RootState) => state.modal.shouldShowModal
  );

  return (
    <>
      <SEO
        seoTitle={pageName}
        tabTitle={tabTitle}
        currentTheme={currentTheme}
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
