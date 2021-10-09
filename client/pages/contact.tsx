import * as React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useQueryClient, useMutation } from "react-query";
import Layout from "../components/Layout";
import ContactForm from "../components/ContactForm";
import { useGetPreferredForm, WEB3_KEY } from "../hooks/useGetPreferredForm";
import { useConnectWallet } from "../hooks/useConnectWallet";
import type { MessageValues } from "../components/ContactForm";
import { sendMessage } from "./api/message";
import { updateMessage } from "../store/contactSlice";
import { RootState } from "../store";

const PAGE_NAME = "Contact";

function Contact() {
  const [preferredForm, setPreferredForm] = useGetPreferredForm();
  const { accounts, currentAccount, connectToWallet, errorMessage, isLoaded } =
    useConnectWallet();

  const dispatch = useDispatch();
  const initialMessageValues = useSelector(
    (state: RootState) => state.contact.message
  );

  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(sendMessage, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries("emailResponse");
    },
  });

  const handleSendMessage = (messageValues: MessageValues) => {
    if (preferredForm === WEB3_KEY) {
      // finish for Web3
    } else {
      mutate(messageValues);
    }
  };

  const handleOnFormChange = (key: string, value: string) => {
    dispatch(updateMessage({ [key]: value }));
  };

  return (
    <Layout pageName={PAGE_NAME} withFooter>
      <RootStyles>
        <main>
          <section>
            <h1>
              You can use{" "}
              <a
                href="https://twitter.com/nwthomas_"
                aria-label="Link to presentation on Twitter"
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
              initialValues={initialMessageValues}
              isWalletConnected={!!currentAccount}
              isWeb3Loaded={isLoaded}
              onDropdownButtonClick={setPreferredForm}
              onConnectWalletClick={connectToWallet}
              onFormChange={handleOnFormChange}
              onSendMessageClick={handleSendMessage}
              withSpinner={isLoading}
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

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.tablet}) {
        margin-bottom: ${({ theme }) => theme.spaces.xLarge};
      }
    }

    > section:nth-child(2) {
      margin-bottom: ${({ theme }) =>
        `calc(${theme.appDimensions.navbarHeight} / 2)`};

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.tablet}) {
        margin-bottom: ${({ theme }) =>
          `calc(${theme.spaces.large} + ${theme.appDimensions.navbarHeight} / 2)`};
      }

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.desktop}) {
        margin-bottom: ${({ theme }) => theme.spaces.jumbo};
      }
    }
  }
`;

export default Contact;
