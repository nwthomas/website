import * as React from "react";

import {
  resetMessageValues,
  updateMessageValues,
} from "../store/reducers/contactFormSlice";
import { useDispatch, useSelector } from "react-redux";

import { CONTACT_PAGE_NAME } from "../constants/seo";
import { CONTENTS_ID } from "../constants/routes";
import ContactForm from "../components/ContactForm";
import Layout from "../components/Layout";
import { MessageValues } from "../components/ContactForm";
import { NewEmail } from "../utils/sendEmail";
import { SEND_EMAIL } from "../constants/routes";
import axios from "axios";
import { getOgImage } from "../utils/ogImage";
import { selectContactFormMessageValues } from "../store/selectors/contactFormSelectors";
import styled from "styled-components";
import { updateModalValues } from "../store/reducers/modalSlice";
import { useMutation } from "react-query";

const TWITTER_LINK_ARIA_LABEL = "Link to Nathan's Twitter profile";

export async function getStaticProps() {
  // Dynamic og image creation at build time
  const ogImageBuildUrl = `/og-image?title=${CONTACT_PAGE_NAME}%20Form`;
  const ogImage = getOgImage(ogImageBuildUrl);

  return {
    props: {
      ogImage,
    },
  };
}

async function sendMessage(email: NewEmail) {
  return axios.post(SEND_EMAIL, email);
}

function Contact({ ogImage }) {
  const dispatch = useDispatch();
  const initialMessageValues = useSelector(selectContactFormMessageValues);

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
    <Layout
      customSEOImageUrl={ogImage}
      pageName={CONTACT_PAGE_NAME}
      withFooter
      withPageNameEmojis
    >
      <RootStyles>
        <main id={CONTENTS_ID}>
          <section>
            <h1>
              Message me on{" "}
              <a
                href="https://twitter.com/nwthomas_"
                aria-label={TWITTER_LINK_ARIA_LABEL}
                rel="noopener noreferrer"
                target="_blank"
              >
                Twitter
              </a>{" "}
              or right here:
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
        margin-bottom: ${({ theme }) => theme.spaces.large};
        margin-top: ${({ theme }) => theme.spaces.medium};
      }

      > h1 > a {
        background-clip: text;
        background-image: ${({ theme }) =>
          `linear-gradient(90deg, ${theme.colorsHex.danube} 0%, ${theme.colorsHex.turquoise} 100%)`};
        background-size: 100%;
        -webkit-background-clip: text;
        -moz-background-clip: text;
        -webkit-text-fill-color: transparent;
        -moz-text-fill-color: transparent;
        font-size: inherit;
        text-decoration: none;
        transition: opacity ${({ theme }) => theme.transitions.short}
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
