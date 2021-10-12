"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const head_1 = __importDefault(require("next/head"));
const styled_components_1 = __importDefault(require("styled-components"));
const react_redux_1 = require("react-redux");
const Footer_1 = __importDefault(require("../Footer"));
const Modal_1 = __importDefault(require("../Modal"));
const useGetPageName_1 = require("../../hooks/useGetPageName");
function Layout({ children, pageName, withFooter }) {
    const currentPageName = (0, useGetPageName_1.useGetPageName)(pageName);
    const shouldShowModal = (0, react_redux_1.useSelector)((state) => state.modal.shouldShowModal);
    return (<>
      <head_1.default>
        <title>{currentPageName}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      </head_1.default>
      <RootStyles>
        {children}
        {withFooter ? <Footer_1.default /> : null}
        {shouldShowModal ? <Modal_1.default /> : null}
      </RootStyles>
    </>);
}
const RootStyles = styled_components_1.default.div `
  display: flex;
  background: ${({ theme }) => theme.colors.bodyBackground};
  justify-content: center;
  padding: ${({ theme }) => `${theme.appDimensions.navbarHeight} 0 ${theme.appDimensions.footerMobileHeight}`};
  min-height: ${({ theme }) => theme.appDimensions.appMinHeight};
  position: relative;
  width: 100%;

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => `${theme.appDimensions.navbarHeight} 0 ${theme.appDimensions.footerDesktopHeight}`};
  }
`;
exports.default = Layout;
//# sourceMappingURL=index.js.map