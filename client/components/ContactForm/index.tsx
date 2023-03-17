import * as React from "react";
import * as Yup from "yup";

import styled, { ThemeContext } from "styled-components";

import Spinner from "../Spinner";
import { ThemeEnum } from "../../store/reducers/themeSlice";
import { themeColorValues } from "../../styles/libs/theme";
import { useFormik } from "formik";
import { useGetMouseRadian } from "../../hooks";

const contactFormRef = React.createRef<HTMLDivElement>();

function getContactFormBorder(radians: number) {
  return `linear-gradient(calc(${radians}rad), ${themeColorValues.bodyBackgroundAccentTwo} 0%, ${themeColorValues.bodyBackgroundAccentTwo} 50%, rgba(121,40,202,0) 75%)`;
}

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

  const radians = useGetMouseRadian(contactFormRef);

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
    <RootStyles
      currentTheme={currentTheme}
      isFormButtonDisabled={withSpinner}
      style={{
        backgroundImage: getContactFormBorder(radians),
      }}
    >
      <div ref={contactFormRef}>
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
  border-radius: ${({ theme }) => theme.borderRadii.large};
  -webkit-box-shadow: ${({ theme }) => theme.dropshadows.small};
  -moz-box-shadow: ${({ theme }) => theme.dropshadows.small};
  box-shadow: ${({ theme }) => theme.dropshadows.small};
  padding: ${({ theme }) => theme.spaces.nano};
  width: 100%;

  > div {
    /* Compensate for the inner curve of this element against its parent */
    border-radius: ${({ theme }) =>
      `calc(${theme.borderRadii.large} - ${theme.spaces.nano})`};
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
        border: none;
        border-radius: ${({ theme }) => theme.borderRadii.medium};
        margin-bottom: ${({ theme }) => theme.spaces.micro};
        min-height: ${({ theme }) => theme.spaces.xxLarge};
        position: relative;
        width: 100%;

        > input {
          background-color: ${({ theme }) => theme.colors.bodyBackground};
          border: ${({ theme }) =>
            `${theme.spaces.nano} solid ${theme.colors.bodyBackgroundAccentTwo}`};
          border-radius: ${({ theme }) => theme.borderRadii.medium};
          min-height: ${({ theme }) => theme.spaces.xxLarge};
          padding: ${({ theme }) => theme.spaces.medium};
          transition: border-color ${({ theme }) => theme.transitions.short}
            ease-in-out;
          width: 100%;

          &:hover,
          &:active,
          &:focus {
            outline: none;
            border: ${({ theme }) =>
              `${theme.spaces.nano} solid ${theme.colorsHex.royalBlue}`};
          }
        }

        > textarea {
          background: ${({ theme }) => theme.colors.bodyBackground};
          border: ${({ theme }) =>
            `${theme.spaces.nano} solid ${theme.colors.bodyBackgroundAccentTwo}`};
          border-top-left-radius: ${({ theme }) => theme.borderRadii.medium};
          border-bottom-left-radius: ${({ theme }) => theme.borderRadii.medium};
          border-top-right-radius: ${({ theme }) => theme.borderRadii.medium};
          min-height: ${({ theme }) => theme.spaces.xxLarge};
          padding: ${({ theme }) => theme.spaces.medium};
          resize: vertical;
          transition: border-color ${({ theme }) => theme.transitions.short}
            ease-in-out;
          width: 100%;

          &:hover,
          &:active,
          &:focus {
            outline: none;
            border: ${({ theme }) =>
              `${theme.spaces.nano} solid ${theme.colorsHex.royalBlue}`};
          }
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
          background-color: ${({ theme }) => theme.colors.bodyBackground};
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
        border-radius: ${({ theme }) => theme.borderRadii.medium};
        background-color: ${({ theme }) => theme.colorsHex.royalBlue};
        border: 2px solid ${({ theme }) => theme.colorsHex.royalBlue};
        color: ${({ theme }) => theme.colorsHex.white};
        cursor: ${({ isFormButtonDisabled }) =>
          isFormButtonDisabled ? "wait" : "pointer"};
        display: flex;
        font-family: "Fira Sans", ui-sans-serif, system-ui, -apple-system,
          BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans,
          sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol,
          Noto Color Emoji;
        font-size: 1.6rem;
        font-weight: bold;
        height: ${({ theme }) => theme.spaces.xLarge};
        justify-content: center;
        margin-top: ${({ theme }) => theme.spaces.nano};
        opacity: ${({ isFormButtonDisabled }) =>
          isFormButtonDisabled ? "0.5" : "1"};
        transition: background-color ${({ theme }) => theme.transitions.short}
            ease-in-out,
          color ${({ theme }) => theme.transitions.short} ease-in-out;

        &:hover {
          background-color: ${({ isFormButtonDisabled, theme }) =>
            isFormButtonDisabled ? theme.colorsHex.royalBlue : "transparent"};
          color: ${({ theme }) => theme.colorsHex.royalBlue};
        }
      }
    }
  }
`;

export default ContactForm;
