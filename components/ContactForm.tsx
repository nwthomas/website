import * as Yup from "yup";

import { useGetMouseRadian, useGetScreenDimensions } from "../hooks";

import Spinner from "./Spinner";
import { ThemeEnum } from "../store/reducers/themeSlice";
import { createRef } from "react";
import styled from "@emotion/styled";
import { useTheme as useEmotionTheme } from "@emotion/react";
import { useFormik } from "formik";
import { useTheme } from "../hooks";

const contactFormRef = createRef<HTMLDivElement>();

function getContactFormBorder(radians: number, isDesktopLayout: boolean) {
  if (isDesktopLayout) {
    return `linear-gradient(calc(${radians}rad), var(--body-bg-accent-two) 0%, var(--body-bg-accent-two) 50%, rgba(121,40,202,0) 75%)`;
  }

  return "linear-gradient(to right, var(--body-bg-accent-two) 0%, var(--body-bg-accent-two) 100%)";
}

export interface MessageValues {
  csrfToken: string;
  email: string;
  message: string;
  name: string;
  fax?: string;
}

interface Props {
  initialValues: {
    csrfToken: string;
    name: string;
    email: string;
    message: string;
    fax: string;
  };
  onFormChange: (key: string, value: string) => void;
  onSendMessageClick: (messageValues: MessageValues, onSuccess: () => void) => void;
  withSpinner?: boolean;
}

function ContactForm({ initialValues, onFormChange, onSendMessageClick, withSpinner }: Props) {
  const { breakpointsInt } = useEmotionTheme();
  const [currentTheme] = useTheme();
  const { viewportWidth } = useGetScreenDimensions();

  const isDesktopLayout = Boolean(viewportWidth && viewportWidth > breakpointsInt.tablet);

  const radians = useGetMouseRadian(contactFormRef);

  const formik = useFormik({
    initialValues: {
      email: initialValues.email,
      message: initialValues.message,
      name: initialValues.name,

      // This is a honeypot field. The server will reject the message if this field
      // has length when the server receives the request.
      fax: initialValues.fax,

      // This is required for valid send email requests
      csrfToken: initialValues.csrfToken,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      name: Yup.string().required("Required"),
      message: Yup.string().required("Required"),
    }),
    onSubmit: (messageValues: MessageValues) => {
      onSendMessageClick(messageValues, formik.resetForm);
    },
  });

  const handleOnFormChange = (event) => {
    formik.handleChange(event);
    onFormChange(event.target.name, event.target.value);
  };

  return (
    <RootStyles
      $currentTheme={currentTheme}
      $isFormButtonDisabled={withSpinner}
      style={{
        backgroundImage: getContactFormBorder(radians, isDesktopLayout),
      }}
    >
      <div ref={contactFormRef}>
        <div>
          <h2>Message</h2>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div>
            {formik.touched.name && formik.errors.name ? <p>{formik.errors.name}</p> : null}
            <input
              name="name"
              onBlur={formik.handleBlur}
              onChange={handleOnFormChange}
              placeholder="What's your name?"
              type="text"
              value={formik.values.name}
            ></input>
          </div>
          <div>
            {formik.touched.email && formik.errors.email ? <p>{formik.errors.email}</p> : null}
            <input
              autoCapitalize="off"
              name="email"
              onBlur={formik.handleBlur}
              onChange={handleOnFormChange}
              placeholder="What's your email?"
              type="text"
              value={formik.values.email}
            ></input>
          </div>
          <div>
            {formik.touched.message && formik.errors.message ? <p>{formik.errors.message}</p> : null}
            <textarea
              autoComplete="off"
              name="message"
              onBlur={formik.handleBlur}
              onChange={handleOnFormChange}
              placeholder="What's happening?"
              value={formik.values.message}
            ></textarea>
          </div>
          <div>
            <input
              autoComplete="off"
              name="fax"
              onBlur={formik.handleBlur}
              onChange={handleOnFormChange}
              type="text"
              tabIndex={-1}
              value={formik.values.fax}
            ></input>
            <input
              autoComplete="off"
              name="token"
              onBlur={formik.handleBlur}
              onChange={handleOnFormChange}
              type="hidden"
              tabIndex={-1}
              value={formik.values.csrfToken}
            ></input>
          </div>
          <button disabled={withSpinner} type="submit">
            {withSpinner ? <Spinner color="white" height="40px" width="40px" /> : "Submit"}
          </button>
        </form>
      </div>
    </RootStyles>
  );
}

interface StyleProps {
  $currentTheme: ThemeEnum | null;
  $isFormButtonDisabled?: boolean;
}

const RootStyles = styled.div<StyleProps>`
  border-radius: var(--border-radius-large);
  padding: var(--space-nano);
  width: 100%;

  > div {
    /* Compensate for the inner curve of this element against its parent */
    border-radius: calc(var(--border-radius-large) - var(--space-nano));
    background-color: var(--body-bg);
    padding: var(--space-small);
    width: 100%;

    > div {
      align-items: center;
      display: flex;
      justify-content: space-between;
      margin-bottom: var(--space-small);
      margin-top: var(--space-micro);
      padding: 0 var(--space-small);

      > h2 {
        font-size: 1.6rem;
      }
    }

    > form {
      display: flex;
      flex-direction: column;

      > div {
        border: none;
        border-radius: var(--border-radius-medium);
        margin-bottom: var(--space-micro);
        min-height: var(--space-xxlarge);
        position: relative;
        width: 100%;

        > input {
          background-color: var(--body-bg);
          border: var(--space-nano) solid var(--body-bg-accent-two);
          border-radius: var(--border-radius-medium);
          min-height: var(--space-xxlarge);
          padding: var(--space-medium);
          transition: border-color var(--transition-short) ease-in-out;
          width: 100%;

          &:hover,
          &:active,
          &:focus {
            outline: none;
            border: var(--space-nano) solid var(--color-royal-blue);
          }
        }

        > textarea {
          background: var(--body-bg);
          border: var(--space-nano) solid var(--body-bg-accent-two);
          border-top-left-radius: var(--border-radius-medium);
          border-bottom-left-radius: var(--border-radius-medium);
          border-top-right-radius: var(--border-radius-medium);
          min-height: var(--space-xxlarge);
          padding: var(--space-medium);
          resize: vertical;
          transition: border-color var(--transition-short) ease-in-out;
          width: 100%;

          &:hover,
          &:active,
          &:focus {
            outline: none;
            border: var(--space-nano) solid var(--color-royal-blue);
          }
        }

        &:nth-of-type(3) {
          border-bottom-right-radius: 0;
          margin-bottom: var(--space-micro);
        }

        &:last-of-type {
          display: none;
        }

        > p {
          align-items: center;
          background-color: var(--body-bg);
          border-radius: var(--border-radius-large);
          bottom: 0;
          color: var(--error);
          display: flex;
          font-size: 1.6rem;
          height: var(--space-xlarge);
          margin-right: var(--space-micro);
          margin-top: var(--space-small);
          padding: 0 var(--space-small);
          position: absolute;
          right: 0;
          user-select: none;
          top: 0;
        }
      }

      > button {
        align-items: center;
        border-radius: var(--border-radius-medium);
        background-color: var(--color-royal-blue);
        border: var(--space-nano) solid var(--color-royal-blue);
        color: var(--color-white);
        cursor: ${({ $isFormButtonDisabled }) => ($isFormButtonDisabled ? "wait" : "pointer")};
        display: flex;
        font-family:
          "Fira Sans",
          ui-sans-serif,
          system-ui,
          -apple-system,
          BlinkMacSystemFont,
          Segoe UI,
          Roboto,
          Helvetica Neue,
          Arial,
          Noto Sans,
          sans-serif;
        font-size: 1.6rem;
        font-weight: bold;
        height: var(--space-xlarge);
        justify-content: center;
        margin-top: var(--space-nano);
        opacity: ${({ $isFormButtonDisabled }) => ($isFormButtonDisabled ? "0.5" : "1")};
        transition:
          background-color var(--transition-short) ease-in-out,
          color var(--transition-short) ease-in-out;

        &:hover {
          background-color: ${({ $isFormButtonDisabled }) =>
            $isFormButtonDisabled ? "var(--color-royal-blue)" : "transparent"};
          color: var(--color-royal-blue);
        }
      }
    }
  }
`;

export default ContactForm;
