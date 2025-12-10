import { NextApiRequest, NextApiResponse } from "next";
import { resetMessageValues, updateMessageValues } from "../store/reducers/contactFormSlice";
import { useDispatch, useSelector } from "react-redux";

import { CONTACT_PAGE_NAME } from "../constants/seo";
import { CONTENTS_ID } from "../constants/routes";
import ContactForm from "../components/ContactForm";
import Layout from "../components/Layout";
import { MessageValues } from "../components/ContactForm";
import { NewEmail } from "../utils/sendEmail";
import { SEND_EMAIL } from "../constants/routes";
import { generateCsrfToken } from "../utils/csrfToken";
import { selectContactFormMessageValues } from "../store/selectors/contactFormSelectors";
import styled from "@emotion/styled";
import { updateModalValues } from "../store/reducers/modalSlice";
import { useMutation } from "@tanstack/react-query";

export async function getServerSideProps({ req, res }: { req: NextApiRequest; res: NextApiResponse }) {
  // This is set both on a cookie as well as in the hidden form input in the ContactForm component
  const token = await generateCsrfToken(res, req);

  return {
    props: {
      token,
    },
  };
}

async function sendMessage(email: NewEmail) {
  const response = await fetch(SEND_EMAIL, {
    method: "POST",
    body: JSON.stringify(email),
  });

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.statusText}, Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

function Contact({ ogImage, token }) {
  const dispatch = useDispatch();

  const initialMessageValues = useSelector(selectContactFormMessageValues);

  const { mutate, isPending: isSendingEmail } = useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      dispatch(
        updateModalValues({
          buttonLabel: "Okay",
          message: "Message sent",
          shouldShowModal: true,
        }),
      );
      dispatch(resetMessageValues());
    },
    onError: () => {
      dispatch(
        updateModalValues({
          buttonLabel: "Okay",
          message: "Error sending message",
          shouldShowModal: true,
        }),
      );
    },
  });

  const handleSendMessage = (messageValues: MessageValues, onSuccess: () => void) => {
    mutate(messageValues, { onSuccess });
  };

  const handleOnFormChange = (key: string, value: string) => {
    dispatch(updateMessageValues({ [key]: value }));
  };

  return (
    <Layout customSEOImageUrl={ogImage} pageName={CONTACT_PAGE_NAME} withFooter>
      <RootStyles>
        <main id={CONTENTS_ID}>
          <section>
            <h1>You know where you can reach me</h1>
          </section>
          <section>
            <div>
              <ContactForm
                token={token}
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
  padding: 0 var(--app-horizontal-gutters);
  width: 100%;

  > main {
    max-width: var(--app-max-width);
    width: 100%;

    > section:nth-of-type(1) {
      display: flex;
      margin-bottom: var(--space-medium);

      @media only screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
        margin-bottom: var(--space-large);
      }

      > h1 > span > a {
        background-clip: text;
        -moz-background-clip: text;
        -webkit-background-clip: text;
        background-image: url(/images/backgrounds/noise.webp);
        background-size: 50px;
        font-family: inherit;
        font-size: inherit;
        padding: var(--space-micro) 0;
        -moz-text-fill-color: transparent;
        -webkit-text-fill-color: transparent;
        text-decoration: none;
        transition: opacity var(--transition-short) ease-in-out;

        &:hover {
          opacity: 0.8;
        }
      }

      > h1 span {
        font-family: inherit;
        white-space: nowrap;
      }
    }

    > section:nth-of-type(2) {
      margin-bottom: var(--space-medium);

      @media only screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
        margin-bottom: var(--space-xxlarge);
      }

      > div {
        max-width: none;
        width: 100%;

        @media only screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
          max-width: var(--contact-form-max-width);
        }
      }
    }
  }
`;

export default Contact;
