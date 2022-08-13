import * as React from "react";

import { WEB3_KEY, useGetPreferredForm } from "../hooks/useGetPreferredForm";
import {
  abbreviateWalletAddress,
  useConnectWallet,
} from "../hooks/useConnectWallet";
import { resetMessageValues, updateMessageValues } from "../store/contactSlice";
import { useDispatch, useSelector } from "react-redux";

import ContactForm from "../components/ContactForm";
import Layout from "../components/Layout";
import type { MessageValues } from "../components/ContactForm";
import { RootState } from "../store";
import { sendMessage } from "./api/message";
import styled from "styled-components";
import { updateModalValues } from "../store/modalSlice";
import { useMutation } from "react-query";

const PAGE_NAME = "Contact";

function Contact() {
  const [preferredForm, setPreferredForm] = useGetPreferredForm();
  const {
    checkIfWalletIsConnected,
    currentAccount,
    connectToWallet,
    errorMessage,
    isError,
    isLoaded,
    isSending: isSendingToSmartContract,
    reset: resetWalletState,
    sendNewMessage,
  } = useConnectWallet();

  const dispatch = useDispatch();
  const initialMessageValues = useSelector(
    (state: RootState) => state.contact.message
  );

  React.useEffect(() => {
    if (preferredForm === WEB3_KEY && isError && errorMessage) {
      dispatch(
        updateModalValues({
          buttonLabel: "Okay",
          message: errorMessage,
          shouldShowModal: true,
        })
      );
    }
  }, [preferredForm, isError]);

  const { mutate, isLoading: isSendingEmail } = useMutation(sendMessage, {
    onSuccess: () => {
      dispatch(
        updateModalValues({
          buttonLabel: "Okay",
          message: "Message sent",
          shouldShowModal: true,
        })
      );
      dispatch(resetMessageValues());
    },
    onError: () => {
      dispatch(
        updateModalValues({
          buttonLabel: "Okay",
          message: "Error sending message",
          shouldShowModal: true,
        })
      );
    },
  });

  const handleSendMessage = (
    messageValues: MessageValues,
    onSuccess: () => void
  ) => {
    if (preferredForm === WEB3_KEY) {
      sendNewMessage(messageValues, onSuccess);
    } else {
      mutate(messageValues, { onSuccess });
    }
  };

  const handleOnFormChange = (key: string, value: string) => {
    dispatch(updateMessageValues({ [key]: value }));
  };

  const handleConnectToWalletClick = () => {
    connectToWallet();

    if (isError && errorMessage) {
      dispatch(
        updateModalValues({
          buttonLabel: "Okay",
          message: errorMessage,
          shouldShowModal: true,
        })
      );
    }
  };

  const handleSetPreferredFormClick = () => {
    resetWalletState();
    checkIfWalletIsConnected();
    setPreferredForm();
  };

  const abbreviatedCurrentAccountAddress = currentAccount
    ? abbreviateWalletAddress(currentAccount)
    : undefined;

  return (
    <Layout pageName={PAGE_NAME} withFooter>
      <RootStyles>
        <main>
          <section>
            <h1>
              You can reach me on{" "}
              <a
                href="https://twitter.com/nwthomas_"
                aria-label="Link to Nathan's Twitter profile"
                rel="noopener noreferrer"
                target="_target"
              >
                Twitter
              </a>{" "}
              🐦 or my contact form here:
            </h1>
          </section>
          <section>
            <ContactForm
              currentAccount={abbreviatedCurrentAccountAddress}
              initialValues={initialMessageValues}
              isWeb3Loaded={isLoaded}
              onDropdownButtonClick={handleSetPreferredFormClick}
              onConnectWalletClick={handleConnectToWalletClick}
              onFormChange={handleOnFormChange}
              onSendMessageClick={handleSendMessage}
              withSpinner={isSendingEmail || isSendingToSmartContract}
              withWeb3={preferredForm === WEB3_KEY}
            />
          </section>
        </main>
      </RootStyles>
    </Layout>
  );
}

const RootStyles = styled.div`
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
      margin-bottom: ${({ theme }) => theme.spaces.large};

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.tablet}) {
        margin-bottom: ${({ theme }) => theme.spaces.xxLarge};
        margin-top: ${({ theme }) => theme.spaces.xxLarge};
      }

      a {
        background-clip: text;
        background-image: ${({ theme }) =>
          `linear-gradient(120deg, ${theme.colorsHex.royalBlue} 0%, ${theme.colorsHex.pictonBlue} 100%)`};
        background-size: 100%;
        -webkit-background-clip: text;
        -moz-background-clip: text;
        -webkit-text-fill-color: transparent;
        -moz-text-fill-color: transparent;
        font-size: inherit;
      }
    }

    > section:nth-child(2) {
      margin-bottom: ${({ theme }) => theme.spaces.large};

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.tablet}) {
        margin-bottom: ${({ theme }) => `calc(${theme.spaces.xxLarge} * 2)`};
      }
    }
  }
`;

export default Contact;
