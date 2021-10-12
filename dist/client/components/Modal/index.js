"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const useLockBodyScroll_1 = require("../../hooks/useLockBodyScroll");
const react_redux_1 = require("react-redux");
const modalSlice_1 = require("../../store/modalSlice");
function Modal() {
    const dispatch = (0, react_redux_1.useDispatch)();
    const modalMessage = (0, react_redux_1.useSelector)((state) => state.modal.message);
    const modalButtonLabel = (0, react_redux_1.useSelector)((state) => state.modal.buttonLabel);
    // This hook automatically removes the lock on modal unmount
    (0, useLockBodyScroll_1.useLockBodyScroll)();
    const handleDismissClick = () => {
        dispatch((0, modalSlice_1.updateModalValues)({
            message: "",
            buttonLabel: "",
            shouldShowModal: false,
        }));
    };
    return (<RootStyles>
      <div>
        <h1>{modalMessage}</h1>
        <button onClick={handleDismissClick}>{modalButtonLabel}</button>
      </div>
    </RootStyles>);
}
const RootStyles = styled_components_1.default.div `
  align-items: center;
  background-color: ${({ theme }) => `${theme.colorsHex.black}90`};
  display: flex;
  justify-content: center;
  position: fixed;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => `0 ${theme.appDimensions.appHorizontalGutters}`};
  }

  > div {
    align-items: center;
    background-color: ${({ theme }) => theme.colors.bodyBackground};
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    width: 100%;

    @media only screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
      border-radius: ${({ theme }) => theme.borderRadii.xxLarge};
      background: ${({ theme }) => theme.colors.bodyBackgroundAccentOne};
      -webkit-box-shadow: rgb(0 0 0 / 1%) 0px 0px 1px,
        rgb(0 0 0 / 4%) 0px 4px 8px, rgb(0 0 0 / 4%) 0px 16px 24px,
        rgb(0 0 0 / 1%) 0px 24px 32px;
      -moz-box-shadow: rgb(0 0 0 / 1%) 0px 0px 1px, rgb(0 0 0 / 4%) 0px 4px 8px,
        rgb(0 0 0 / 4%) 0px 16px 24px, rgb(0 0 0 / 1%) 0px 24px 32px;
      box-shadow: rgb(0 0 0 / 1%) 0px 0px 1px, rgb(0 0 0 / 4%) 0px 4px 8px,
        rgb(0 0 0 / 4%) 0px 16px 24px, rgb(0 0 0 / 1%) 0px 24px 32px;
      height: initial;
      max-width: ${({ theme }) => theme.appDimensions.modalMaxWidth};
      padding: ${({ theme }) => theme.spaces.large};
      width: 100%;

      > h1 {
        font-size: 1.6rem;

        @media only screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
          font-size: 2rem;
        }

        @media only screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
          font-size: 3rem;
        }
      }
    }

    > h1 {
      margin-bottom: ${({ theme }) => theme.spaces.medium};
    }

    > button {
      align-items: center;
      background: ${({ theme }) => theme.colors.buttonPrimaryBackground};
      border-radius: ${({ theme }) => theme.borderRadii.large};
      border: 1px solid ${({ theme }) => theme.colors.bodyBackgroundAccentOne};
      color: ${({ theme }) => theme.colorsHex.white};
      cursor: pointer;
      display: flex;
      justify-content: center;
      margin-top: ${({ theme }) => theme.spaces.nano};
      height: ${({ theme }) => theme.spaces.xLarge};
      width: 70%;

      &:hover {
        opacity: ${({ theme }) => theme.opacity.opacity70};
      }
    }
  }
`;
exports.default = Modal;
//# sourceMappingURL=index.js.map