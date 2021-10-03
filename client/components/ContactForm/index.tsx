import * as React from "react";
import styled, { ThemeContext } from "styled-components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { SettingsIcon } from "../icons";
import DropdownAnchor from "../DropdownAnchor";
import { DARK_THEME } from "../../hooks/useGetPreferredTheme";

const web2DropdownContent = {
  paragraphOne: "I get it. Sometimes the old ways are better. 🧙🏻‍♂️",
  paragraphTwo:
    "This is the Web3 form. Would you like to switch back to the Web2 version?",
  buttonLabel: "Yes",
};

const web3DropdownContent = {
  paragraphOne: "You discovered a cool feature. 🎉",
  paragraphTwo:
    "This is the Web2 form. Would you like the Web3 version? It requires a crypto wallet.",
  buttonLabel: "Yes",
};

export interface MessageValues {
  email: string;
  message: string;
  name: string;
  fax?: string;
}

interface Props {
  isWalletConnected: boolean;
  isWeb3Loaded: boolean;
  onConnectWalletClick: () => void;
  onDropdownButtonClick: () => void;
  onSendMessageClick: (messageValues: MessageValues) => void;
  withWeb3: boolean;
}

function ContactForm({
  isWalletConnected,
  isWeb3Loaded,
  onConnectWalletClick,
  onDropdownButtonClick,
  onSendMessageClick,
  withWeb3,
}: Props) {
  const { colors } = React.useContext(ThemeContext);

  const isFormButtonDisabled = withWeb3 && !isWalletConnected;

  const formik = useFormik({
    initialValues: {
      email: "",
      message: "",
      name: "",

      // This is a honeypot field. The server will reject the message if this field
      // has length when the server receives the request.
      fax: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Required"),
      name: Yup.string().required("Required"),
      message: Yup.string().required("Required"),
    }),
    onSubmit: (messageValues: MessageValues) => {
      onSendMessageClick(messageValues);
    },
  });

  return (
    <RootStyles
      isWalletConnected={isWalletConnected}
      isFormButtonDisabled={isFormButtonDisabled}
    >
      <div>
        <h2>Message</h2>
        <div>
          {!!process.env.NEXT_PUBLIC_WITH_WEB3 && withWeb3 && isWeb3Loaded ? (
            <div>
              <div />
              <button onClick={onConnectWalletClick}>
                {isWalletConnected ? "Switch Wallet Address" : "Connect Wallet"}
              </button>
            </div>
          ) : null}
          {!!process.env.NEXT_PUBLIC_WITH_WEB3 ? (
            <DropdownAnchor
              content={withWeb3 ? web2DropdownContent : web3DropdownContent}
              onDropdownButtonClick={onDropdownButtonClick}
            >
              <button>
                <div>
                  <SettingsIcon color={colors.text} />
                </div>
              </button>
            </DropdownAnchor>
          ) : null}
        </div>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div>
          {formik.touched.name && formik.errors.name ? (
            <p>{formik.errors.name}</p>
          ) : null}
          <input
            name="name"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
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
            name="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder="How can I get back to you?"
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
            onChange={formik.handleChange}
            placeholder="What's happening?"
            value={formik.values.message}
          ></textarea>
        </div>
        <div>
          <input
            autoComplete="off"
            name="fax"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            tabIndex={-1}
            value={formik.values.fax}
          ></input>
        </div>
        <button disabled={isFormButtonDisabled} type="submit">
          Submit
        </button>
      </form>
    </RootStyles>
  );
}

interface StyleProps {
  isFormButtonDisabled: boolean;
  isWalletConnected: boolean;
}

const RootStyles = styled.div<StyleProps>`
  border-radius: ${({ theme }) => theme.borderRadii.xxLarge};
  background: ${({ theme }) => theme.colors.bodyBackgroundAccentOne};
  padding: ${({ theme }) => theme.spaces.small};
  -webkit-box-shadow: rgb(0 0 0 / 1%) 0px 0px 1px, rgb(0 0 0 / 4%) 0px 4px 8px,
    rgb(0 0 0 / 4%) 0px 16px 24px, rgb(0 0 0 / 1%) 0px 24px 32px;
  -moz-box-shadow: rgb(0 0 0 / 1%) 0px 0px 1px, rgb(0 0 0 / 4%) 0px 4px 8px,
    rgb(0 0 0 / 4%) 0px 16px 24px, rgb(0 0 0 / 1%) 0px 24px 32px;
  box-shadow: rgb(0 0 0 / 1%) 0px 0px 1px, rgb(0 0 0 / 4%) 0px 4px 8px,
    rgb(0 0 0 / 4%) 0px 16px 24px, rgb(0 0 0 / 1%) 0px 24px 32px;
  width: 100%;

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpoints.tablet}) {
    max-width: 550px;
  }

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

    > div {
      align-items: center;
      display: flex;
      height: ${({ theme }) => theme.spaces.medium};

      > div:nth-child(1) {
        align-items: center;
        display: flex;
        justify-content: center;

        > div {
          background: ${({ isWalletConnected, theme }) =>
            isWalletConnected ? theme.colors.success : theme.colors.error};
          border-radius: ${({ theme }) => theme.borderRadii.infinity};
          height: ${({ theme }) => theme.spaces.small};
          margin-right: ${({ theme }) => theme.spaces.small};
          width: ${({ theme }) => theme.spaces.small};
        }

        > button {
          background: ${({ theme }) => {
            return theme.currentTheme === DARK_THEME
              ? `${theme.colorsHex.royalBlue}30`
              : `${theme.colorsHex.cabaret}30`;
          }};
          border: 1px solid
            ${({ theme }) => theme.colors.buttonPrimaryBackground};
          border-radius: ${({ theme }) => theme.borderRadii.xxLarge};
          color: ${({ theme }) => theme.colors.buttonPrimaryBackground};
          cursor: pointer;
          margin-right: ${({ theme }) => theme.spaces.small};
          padding: ${({ theme }) =>
            `${theme.spaces.micro} ${theme.spaces.small}`};
        }
      }

      > button {
        background: ${({ theme }) => theme.colors.transparent};
        align-items: flex-end;
        border: none;
        cursor: pointer;
        display: flex;
        justify-content: center;
        overflow: hidden;
        padding: ${({ theme }) => theme.spaces.nano} 0 0 0;

        > div {
          height: 20px;
          width: 20px;
        }
      }
    }
  }

  > form {
    display: flex;
    flex-direction: column;

    > div {
      background: ${({ theme }) =>
        theme.currentTheme === DARK_THEME
          ? theme.colors.bodyBackground
          : theme.colors.bodyBackgroundAccentThree};
      border: 1px solid ${({ theme }) => theme.colors.bodyBackgroundAccentTwo};
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
        bottom: 0;
        color: ${({ theme }) => theme.colors.error};
        display: flex;
        font-size: 1.6rem;
        height: ${({ theme }) => theme.spaces.xxLarge};
        margin-right: ${({ theme }) => theme.spaces.micro};
        padding: 0 ${({ theme }) => theme.spaces.small};
        position: absolute;
        right: 0;
        user-select: none;
        top: 0;
      }
    }

    > button {
      background: ${({ theme }) => theme.colors.buttonPrimaryBackground};
      border-radius: ${({ theme }) => theme.borderRadii.large};
      border: 1px solid ${({ theme }) => theme.colors.bodyBackgroundAccentOne};
      color: ${({ theme }) => theme.colorsHex.white};
      cursor: ${({ isFormButtonDisabled }) =>
        isFormButtonDisabled ? "default" : "pointer"};
      margin-top: ${({ theme }) => theme.spaces.nano};
      opacity: ${({ isFormButtonDisabled, theme }) =>
        isFormButtonDisabled
          ? theme.opacity.opacity50
          : theme.opacity.opacity100};
      height: ${({ theme }) => theme.spaces.xLarge};

      &:hover {
        opacity: ${({ isFormButtonDisabled, theme }) =>
          isFormButtonDisabled
            ? theme.opacity.opacity50
            : theme.opacity.opacity70};
      }
    }
  }
`;

export default ContactForm;
