import * as React from "react";

import { resetMessageValues, updateMessageValues } from "../store/contactSlice";
import { useDispatch, useSelector } from "react-redux";

import { CONTACT_PAGE_NAME } from "../constants/seo";
import { CONTENTS_ID } from "../constants/routes";
import ContactForm from "../components/ContactForm";
import Layout from "../components/Layout";
import { MessageValues } from "../components/ContactForm";
import { RootState } from "../store";
import { sendMessage } from "./api/message";
import styled from "styled-components";
import { updateModalValues } from "../store/modalSlice";
import { useMutation } from "react-query";

function Contact() {
  const dispatch = useDispatch();
  const initialMessageValues = useSelector(
    (state: RootState) => state.contact.message
  );

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
    mutate(messageValues, { onSuccess });
  };

  const handleOnFormChange = (key: string, value: string) => {
    dispatch(updateMessageValues({ [key]: value }));
  };

  return (
    <Layout pageName={CONTACT_PAGE_NAME} withFooter withPageNameEmojis>
      <RootStyles>
        <main id={CONTENTS_ID}>
          <section>
            <h1>
              You can reach me on{" "}
              <span>
                <a
                  href="https://twitter.com/nwthomas_"
                  aria-label="Link to Nathan's Twitter profile"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Twitter
                </a>{" "}
                🐦
              </span>{" "}
              or my contact form here:
            </h1>
          </section>
          <section>
            <div>
              <ContactForm
                initialValues={initialMessageValues}
                onFormChange={handleOnFormChange}
                onSendMessageClick={handleSendMessage}
                withSpinner={isSendingEmail}
              />
            </div>
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
      margin-bottom: ${({ theme }) => theme.spaces.medium};

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.tablet}) {
        margin-bottom: ${({ theme }) => theme.spaces.xxLarge};
      }

      a {
        background-clip: text;
        background-image: ${({ theme }) => theme.gradients.getLinkText()};
        background-size: 100%;
        -webkit-background-clip: text;
        -moz-background-clip: text;
        -webkit-text-fill-color: transparent;
        -moz-text-fill-color: transparent;
        font-size: inherit;
        text-decoration: none;
        transition: opacity ${({ theme }) => theme.transitions.medium}
          ease-in-out;

        &:hover {
          opacity: ${({ theme }) => theme.opacity.opacity80};
        }
      }

      span {
        white-space: nowrap;
      }
    }

    > section:nth-child(2) {
      margin-bottom: ${({ theme }) => theme.spaces.medium};

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.tablet}) {
        margin-bottom: ${({ theme }) => theme.spaces.xxLarge};
      }

      > div {
        max-width: none;
        width: 100%;

        @media only screen and (min-width: ${({ theme }) =>
            theme.breakpoints.tablet}) {
          max-width: ${({ theme }) => theme.appDimensions.contactFormMaxWidth};
        }
      }
    }
  }
`;

export default Contact;
