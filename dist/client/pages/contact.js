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
const react_redux_1 = require("react-redux");
const react_query_1 = require("react-query");
const Layout_1 = __importDefault(require("../components/Layout"));
const ContactForm_1 = __importDefault(require("../components/ContactForm"));
const useGetPreferredForm_1 = require("../hooks/useGetPreferredForm");
const useConnectWallet_1 = require("../hooks/useConnectWallet");
const message_1 = require("./api/message");
const contactSlice_1 = require("../store/contactSlice");
const modalSlice_1 = require("../store/modalSlice");
const PAGE_NAME = "Contact";
function Contact() {
    const [preferredForm, setPreferredForm] = (0, useGetPreferredForm_1.useGetPreferredForm)();
    const { currentAccount, connectToWallet, isLoaded } = (0, useConnectWallet_1.useConnectWallet)();
    const dispatch = (0, react_redux_1.useDispatch)();
    const initialMessageValues = (0, react_redux_1.useSelector)((state) => state.contact.message);
    const { mutate, isLoading } = (0, react_query_1.useMutation)(message_1.sendMessage, {
        onSuccess: (data) => {
            dispatch((0, modalSlice_1.updateModalValues)({
                message: "Message sent",
                buttonLabel: "Okay",
                shouldShowModal: true,
            }));
        },
        onError: () => {
            dispatch((0, modalSlice_1.updateModalValues)({
                message: "Error sending message",
                buttonLabel: "Okay",
                shouldShowModal: true,
            }));
        },
    });
    const handleSendMessage = (messageValues) => {
        if (preferredForm === useGetPreferredForm_1.WEB3_KEY) {
            // finish for Web3
        }
        else {
            mutate(messageValues);
        }
    };
    const handleOnFormChange = (key, value) => {
        dispatch((0, contactSlice_1.updateMessage)({ [key]: value }));
    };
    return (<Layout_1.default pageName={PAGE_NAME} withFooter>
      <RootStyles>
        <main>
          <section>
            <h1>
              You can use{" "}
              <a href="https://twitter.com/nwthomas_" aria-label="Link to presentation on Twitter" rel="noopener noreferrer" target="_target">
                Twitter DMs
              </a>{" "}
              ✨ or my contact form here:
            </h1>
          </section>
          <section>
            <ContactForm_1.default initialValues={initialMessageValues} isWalletConnected={!!currentAccount} isWeb3Loaded={isLoaded} onDropdownButtonClick={setPreferredForm} onConnectWalletClick={connectToWallet} onFormChange={handleOnFormChange} onSendMessageClick={handleSendMessage} withSpinner={isLoading} withWeb3={preferredForm === useGetPreferredForm_1.WEB3_KEY}/>
          </section>
        </main>
      </RootStyles>
    </Layout_1.default>);
}
const RootStyles = styled_components_1.default.div `
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => `0 ${theme.appDimensions.appHorizontalGutters}`};
  width: 100%;

  > main {
    max-width: ${({ theme }) => theme.appDimensions.appMaxWidth};
    width: 100%;

    > section:nth-child(1) {
      display: flex;

      @media only screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
        margin-top: ${({ theme }) => theme.spaces.large};
      }

      @media only screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
        margin-top: ${({ theme }) => theme.spaces.jumbo};
      }

      a {
        background-clip: text;
        background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
        background-size: 100%;
        -webkit-background-clip: text;
        -moz-background-clip: text;
        -webkit-text-fill-color: transparent;
        -moz-text-fill-color: transparent;
        font-size: inherit;
      }
    }

    > section:nth-child(1) {
      margin-bottom: ${({ theme }) => theme.spaces.large};

      @media only screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
        margin-bottom: ${({ theme }) => theme.spaces.xLarge};
      }
    }

    > section:nth-child(2) {
      margin-bottom: ${({ theme }) => `calc(${theme.appDimensions.navbarHeight} / 2)`};

      @media only screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
        margin-bottom: ${({ theme }) => `calc(${theme.spaces.large} + ${theme.appDimensions.navbarHeight} / 2)`};
      }

      @media only screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
        margin-bottom: ${({ theme }) => theme.spaces.jumbo};
      }
    }
  }
`;
exports.default = Contact;
//# sourceMappingURL=contact.js.map