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
const styled_components_1 = __importStar(require("styled-components"));
const formik_1 = require("formik");
const Yup = __importStar(require("yup"));
const icons_1 = require("../icons");
const DropdownAnchor_1 = __importDefault(require("../DropdownAnchor"));
const useGetPreferredTheme_1 = require("../../hooks/useGetPreferredTheme");
const Spinner_1 = __importDefault(require("../Spinner"));
const web2DropdownContent = {
    paragraphOne: "I get it. Sometimes the old ways are better. 🧙🏻‍♂️",
    paragraphTwo: "Would you like to switch back to the Web2 form?",
    buttonLabel: "Take me back",
};
const web3DropdownContent = {
    paragraphOne: "You discovered a cool feature. 🎉",
    paragraphTwo: "Would you like the Web3 form? It requires sending messages with an Ethereum wallet.",
    buttonLabel: "Yes",
};
function ContactForm({ initialValues, isWalletConnected, isWeb3Loaded, onConnectWalletClick, onDropdownButtonClick, onFormChange, onSendMessageClick, withSpinner, withWeb3, }) {
    const { colors } = React.useContext(styled_components_1.ThemeContext);
    const isFormButtonDisabled = (withWeb3 && !isWalletConnected) || withSpinner;
    const formik = (0, formik_1.useFormik)({
        initialValues: {
            email: initialValues.email,
            message: initialValues.message,
            name: initialValues.name,
            // This is a honeypot field. The server will reject the message if this field
            // has length when the server receives the request.
            fax: initialValues.fax,
        },
        validationSchema: Yup.object({
            email: Yup.string().required("Required"),
            name: Yup.string().required("Required"),
            message: Yup.string().required("Required"),
        }),
        onSubmit: (messageValues) => {
            onSendMessageClick(messageValues);
        },
    });
    const handleOnFormChange = (event) => {
        formik.handleChange(event);
        onFormChange(event.target.name, event.target.value);
    };
    return (<RootStyles isWalletConnected={isWalletConnected} isFormButtonDisabled={isFormButtonDisabled}>
      <div>
        <h2>Message</h2>
        <div>
          {!!process.env.NEXT_PUBLIC_WITH_WEB3 && withWeb3 && isWeb3Loaded ? (<div>
              <div />
              <button onClick={onConnectWalletClick}>
                {isWalletConnected ? "Switch Wallet Address" : "Connect Wallet"}
              </button>
            </div>) : null}
          {!!process.env.NEXT_PUBLIC_WITH_WEB3 ? (<DropdownAnchor_1.default content={withWeb3 ? web2DropdownContent : web3DropdownContent} onDropdownButtonClick={onDropdownButtonClick}>
              <button>
                <div>
                  <icons_1.SettingsIcon color={colors.text}/>
                </div>
              </button>
            </DropdownAnchor_1.default>) : null}
        </div>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div>
          {formik.touched.name && formik.errors.name ? (<p>{formik.errors.name}</p>) : null}
          <input name="name" onBlur={formik.handleBlur} onChange={handleOnFormChange} placeholder="What's your name?" type="text" value={formik.values.name}></input>
        </div>
        <div>
          {formik.touched.email && formik.errors.email ? (<p>{formik.errors.email}</p>) : null}
          <input name="email" onBlur={formik.handleBlur} onChange={handleOnFormChange} placeholder="How can I get back to you?" type="text" value={formik.values.email}></input>
        </div>
        <div>
          {formik.touched.message && formik.errors.message ? (<p>{formik.errors.message}</p>) : null}
          <textarea autoComplete="off" name="message" onBlur={formik.handleBlur} onChange={handleOnFormChange} placeholder="What's happening?" value={formik.values.message}></textarea>
        </div>
        <div>
          <input autoComplete="off" name="fax" onBlur={formik.handleBlur} onChange={handleOnFormChange} type="text" tabIndex={-1} value={formik.values.fax}></input>
        </div>
        <button disabled={isFormButtonDisabled} type="submit">
          {withSpinner ? (<Spinner_1.default color="white" height="40px" width="40px"/>) : ("Submit")}
        </button>
      </form>
    </RootStyles>);
}
const RootStyles = styled_components_1.default.div `
  border-radius: ${({ theme }) => theme.borderRadii.xxLarge};
  background: ${({ theme }) => theme.colors.bodyBackgroundAccentOne};
  padding: ${({ theme }) => theme.spaces.small};
  -webkit-box-shadow: rgb(0 0 0 / 1%) 0px 0px 1px, rgb(0 0 0 / 4%) 0px 4px 8px,
    rgb(0 0 0 / 4%) 0px 16px 24px, rgb(0 0 0 / 1%) 0px 24px 32px;
  -moz-box-shadow: rgb(0 0 0 / 1%) 0px 0px 1px, rgb(0 0 0 / 4%) 0px 4px 8px,
    rgb(0 0 0 / 4%) 0px 16px 24px, rgb(0 0 0 / 1%) 0px 24px 32px;
  box-shadow: rgb(0 0 0 / 1%) 0px 0px 1px, rgb(0 0 0 / 4%) 0px 4px 8px,
    rgb(0 0 0 / 4%) 0px 16px 24px, rgb(0 0 0 / 1%) 0px 24px 32px;
  width: 100%;

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    max-width: 550px;
  }

  > div {
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-bottom: ${({ theme }) => theme.spaces.small};
    margin-top: ${({ theme }) => theme.spaces.micro};
    padding: 0 ${({ theme }) => theme.spaces.small};

    > h2 {
      font-size: 1.6rem;
    }

    > div {
      align-items: center;
      display: flex;
      height: ${({ theme }) => theme.spaces.medium};

      > div:nth-child(1) {
        align-items: center;
        display: flex;
        justify-content: center;

        > div {
          background: ${({ isWalletConnected, theme }) => isWalletConnected ? theme.colors.success : theme.colors.error};
          border-radius: ${({ theme }) => theme.borderRadii.infinity};
          height: ${({ theme }) => theme.spaces.small};
          margin-right: ${({ theme }) => theme.spaces.small};
          width: ${({ theme }) => theme.spaces.small};
        }

        > button {
          background: ${({ theme }) => {
    return theme.currentTheme === useGetPreferredTheme_1.DARK_THEME
        ? `${theme.colorsHex.royalBlue}30`
        : `${theme.colorsHex.cabaret}30`;
}};
          border: 1px solid
            ${({ theme }) => theme.colors.buttonPrimaryBackground};
          border-radius: ${({ theme }) => theme.borderRadii.xxLarge};
          color: ${({ theme }) => theme.colors.buttonPrimaryBackground};
          cursor: pointer;
          margin-right: ${({ theme }) => theme.spaces.small};
          padding: ${({ theme }) => `${theme.spaces.micro} ${theme.spaces.small}`};
        }
      }

      > button {
        background: ${({ theme }) => theme.colors.transparent};
        align-items: flex-end;
        border: none;
        cursor: pointer;
        display: flex;
        justify-content: center;
        overflow: hidden;
        padding: ${({ theme }) => theme.spaces.nano} 0 0 0;

        > div {
          height: 20px;
          width: 20px;
        }
      }
    }
  }

  > form {
    display: flex;
    flex-direction: column;

    > div {
      background: ${({ theme }) => theme.currentTheme === useGetPreferredTheme_1.DARK_THEME
    ? theme.colors.bodyBackground
    : theme.colors.bodyBackgroundAccentThree};
      border: 1px solid ${({ theme }) => theme.colors.bodyBackgroundAccentTwo};
      border-radius: ${({ theme }) => theme.borderRadii.large};
      margin-bottom: ${({ theme }) => theme.spaces.micro};
      min-height: ${({ theme }) => theme.spaces.xxLarge};
      position: relative;
      width: 100%;

      > input {
        background: ${({ theme }) => theme.colorsHex.transparent};
        border: none;
        border-radius: ${({ theme }) => theme.borderRadii.large};
        min-height: ${({ theme }) => theme.spaces.xxLarge};
        padding: ${({ theme }) => theme.spaces.medium};
        width: 100%;
      }

      > textarea {
        background: ${({ theme }) => theme.colors.transparent};
        border: none;
        border-top-left-radius: ${({ theme }) => theme.borderRadii.large};
        border-bottom-left-radius: ${({ theme }) => theme.borderRadii.large};
        border-top-right-radius: ${({ theme }) => theme.borderRadii.large};
        min-height: ${({ theme }) => theme.spaces.xxLarge};
        padding: ${({ theme }) => theme.spaces.medium};
        resize: vertical;
        width: 100%;
      }

      &:nth-of-type(3) {
        border-bottom-right-radius: 0;
        margin-bottom: ${({ theme }) => theme.spaces.micro};
      }

      &:last-of-type {
        display: none;
      }

      > p {
        align-items: center;
        bottom: 0;
        color: ${({ theme }) => theme.colors.error};
        display: flex;
        font-size: 1.6rem;
        height: ${({ theme }) => theme.spaces.xxLarge};
        margin-right: ${({ theme }) => theme.spaces.micro};
        padding: 0 ${({ theme }) => theme.spaces.small};
        position: absolute;
        right: 0;
        user-select: none;
        top: 0;
      }
    }

    > button {
      align-items: center;
      background: ${({ theme }) => theme.colors.buttonPrimaryBackground};
      border-radius: ${({ theme }) => theme.borderRadii.large};
      border: 1px solid ${({ theme }) => theme.colors.bodyBackgroundAccentOne};
      color: ${({ theme }) => theme.colorsHex.white};
      cursor: ${({ isFormButtonDisabled }) => isFormButtonDisabled ? "default" : "pointer"};
      display: flex;
      justify-content: center;
      margin-top: ${({ theme }) => theme.spaces.nano};
      opacity: ${({ isFormButtonDisabled, theme }) => isFormButtonDisabled
    ? theme.opacity.opacity50
    : theme.opacity.opacity100};
      height: ${({ theme }) => theme.spaces.xLarge};

      &:hover {
        opacity: ${({ isFormButtonDisabled, theme }) => isFormButtonDisabled
    ? theme.opacity.opacity50
    : theme.opacity.opacity70};
      }
    }
  }
`;
exports.default = ContactForm;
//# sourceMappingURL=index.js.map