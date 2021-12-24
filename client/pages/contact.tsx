import * as React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useMutation } from "react-query";
import Layout from "../components/Layout";
import ContactForm from "../components/ContactForm";
import { useGetPreferredForm, WEB3_KEY } from "../hooks/useGetPreferredForm";
import {
  abbreviateWalletAddress,
  useConnectWallet,
} from "../hooks/useConnectWallet";
import type { MessageValues } from "../components/ContactForm";
import { sendMessage } from "./api/message";
import { resetMessageValues, updateMessageValues } from "../store/contactSlice";
import { RootState } from "../store";
import { updateModalValues } from "../store/modalSlice";

const PAGE_NAME = "Contact";

function Contact() {
  const [preferredForm, setPreferredForm] = useGetPreferredForm();
  const {
    currentAccount,
    connectToWallet,
    errorMessage,
    isError,
    isLoaded,
    isSending: isSendingToSmartContract,
    sendNewMessage,
  } = useConnectWallet();

  const dispatch = useDispatch();
  const initialMessageValues = useSelector(
    (state: RootState) => state.contact.message
  );

  React.useEffect(() => {
    if (isError && preferredForm === WEB3_KEY) {
      dispatch(
        updateModalValues({
          buttonLabel: "Okay",
          message: errorMessage,
          shouldShowModal: true,
        })
      );
    }
  }, [isError]);

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

  const abbreviatedCurrentAccountAddress = currentAccount
    ? abbreviateWalletAddress(currentAccount)
    : undefined;

  return (
    <Layout pageName={PAGE_NAME} withFooter>
      <RootStyles>
        <main>
          <section>
            <h1>
              You can use{" "}
              <a
                href="https://twitter.com/nwthomas_"
                aria-label="Link to Nathan's Twitter profile"
                rel="noopener noreferrer"
                target="_target"
              >
                Twitter DMs
              </a>{" "}
              ✨ or my contact form here:
            </h1>
          </section>
          <section>
            <ContactForm
              currentAccount={abbreviatedCurrentAccountAddress}
              initialValues={initialMessageValues}
              isWeb3Loaded={isLoaded}
              onDropdownButtonClick={setPreferredForm}
              onConnectWalletClick={connectToWallet}
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

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.tablet}) {
        margin-top: ${({ theme }) => theme.spaces.large};
      }

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.desktop}) {
        margin-top: ${({ theme }) => theme.spaces.jumbo};
      }

      a {
        background-clip: text;
        background-image: ${({ theme }) =>
          `linear-gradient(120deg, ${theme.colorsHex.cornFlowerBlue} 0%, ${theme.colorsHex.electricViolet} 100%)`};
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

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.tablet}) {
        margin-bottom: ${({ theme }) => theme.spaces.xLarge};
      }
    }

    > section:nth-child(2) {
      margin-bottom: ${({ theme }) =>
        `calc(${theme.appDimensions.navbarMobileHeight} / 2)`};

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.tablet}) {
        margin-bottom: ${({ theme }) =>
          `calc(${theme.spaces.large} + ${theme.appDimensions.navbarDesktopHeight} / 2)`};
      }

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.desktop}) {
        margin-bottom: ${({ theme }) => theme.spaces.jumbo};
      }
    }
  }
`;

export default Contact;
