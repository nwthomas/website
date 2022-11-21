import * as React from "react";
import * as Yup from "yup";

import styled, { ThemeContext } from "styled-components";

import Spinner from "../Spinner";
import type { ThemeEnum } from "../../hooks/useGetPreferredTheme";
import { useFormik } from "formik";

export interface MessageValues {
  email: string;
  message: string;
  name: string;
  fax?: string;
}

interface Props {
  initialValues: {
    name: string;
    email: string;
    message: string;
    fax: string;
  };
  onFormChange: (key: string, value: string) => void;
  onSendMessageClick: (
    messageValues: MessageValues,
    onSuccess: () => void
  ) => void;
  withSpinner?: boolean;
}

function ContactForm({
  initialValues,
  onFormChange,
  onSendMessageClick,
  withSpinner,
}: Props) {
  const { currentTheme } = React.useContext(ThemeContext);

  const formik = useFormik({
    initialValues: {
      email: initialValues.email,
      message: initialValues.message,
      name: initialValues.name,

      // This is a honeypot field. The server will reject the message if this field
      // has length when the server receives the request.
      fax: initialValues.fax,
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
    <RootStyles currentTheme={currentTheme} isFormButtonDisabled={withSpinner}>
      <div>
        <div>
          <h2>Message</h2>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div>
            {formik.touched.name && formik.errors.name ? (
              <p>{formik.errors.name}</p>
            ) : null}
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
            {formik.touched.email && formik.errors.email ? (
              <p>{formik.errors.email}</p>
            ) : null}
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
            {formik.touched.message && formik.errors.message ? (
              <p>{formik.errors.message}</p>
            ) : null}
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
          </div>
          <button disabled={withSpinner} type="submit">
            {withSpinner ? (
              <Spinner color="white" height="40px" width="40px" />
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </RootStyles>
  );
}

interface StyleProps {
  currentTheme: ThemeEnum;
  isFormButtonDisabled?: boolean;
  isWalletConnected?: boolean;
}

const RootStyles = styled.div<StyleProps>`
  background-image: ${({ theme }) => theme.gradients.contactFormBorder};
  border-radius: ${({ theme }) => theme.borderRadii.xxLarge};
  padding: ${({ theme }) => theme.spaces.nano};
  width: 100%;

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpoints.tablet}) {
    max-width: 550px;
  }

  > div {
    border-radius: ${({ theme }) => theme.borderRadii.xxLarge};
    background-color: ${({ theme }) => theme.colors.bodyBackground};
    padding: ${({ theme }) => theme.spaces.small};
    width: 100%;

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
    }

    > form {
      display: flex;
      flex-direction: column;

      > div {
        background-color: ${({ theme }) => theme.colors.bodyBackground};
        border: ${({ theme }) =>
          `${theme.spaces.nano} solid ${theme.colors.bodyBackgroundAccentTwo}`};
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
          background: ${({ theme }) => theme.colors.bodyBackground};
          border-radius: ${({ theme }) => theme.borderRadii.large};
          bottom: 0;
          color: ${({ theme }) => theme.colors.error};
          display: flex;
          font-size: 1.6rem;
          height: ${({ theme }) => theme.spaces.xLarge};
          margin-right: ${({ theme }) => theme.spaces.micro};
          margin-top: ${({ theme }) => theme.spaces.small};
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
        border: 2px solid ${({ theme }) => theme.colors.buttonPrimaryBackground};
        color: ${({ theme }) => theme.colorsHex.white};
        cursor: ${({ isFormButtonDisabled }) =>
          isFormButtonDisabled ? "default" : "pointer"};
        display: flex;
        height: ${({ theme }) => theme.spaces.xLarge};
        justify-content: center;
        margin-top: ${({ theme }) => theme.spaces.nano};
        opacity: ${({ isFormButtonDisabled, theme }) =>
          isFormButtonDisabled
            ? theme.opacity.opacity50
            : theme.opacity.opacity100};

        &:hover {
          opacity: ${({ isFormButtonDisabled, theme }) =>
            isFormButtonDisabled
              ? theme.opacity.opacity50
              : theme.opacity.opacity80};
        }
      }
    }
  }
`;

export default ContactForm;
