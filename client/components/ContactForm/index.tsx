import * as React from "react";
import styled, { ThemeContext } from "styled-components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { SettingsIcon } from "../icons";
import DropdownAnchor from "../DropdownAnchor";
import Spinner from "../Spinner";
import type { ThemeEnum } from "../../hooks/useGetPreferredTheme";

const web2DropdownContent = {
  paragraphs: ["Would you like to switch back to the Web2 form?"],
  confirmButtonLabel: "Yes",
  cancelButtonLabel: "Go back",
};

const web3DropdownContent = {
  paragraphs: [
    "Would you like the Web3 form? You'll need an Ethereum wallet and Rinkeby testnet ether.",
  ],
  confirmButtonLabel: "Yes",
  cancelButtonLabel: "Go back",
};

const CONNECT_WALLET_LABEL = "Connect Wallet";

export interface MessageValues {
  email: string;
  message: string;
  name: string;
  fax?: string;
}

interface Props {
  currentAccount?: string;
  initialValues: {
    name: string;
    email: string;
    message: string;
    fax: string;
  };
  isWeb3Loaded?: boolean;
  onConnectWalletClick: () => void;
  onDropdownButtonClick: () => void;
  onFormChange: (key: string, value: string) => void;
  onSendMessageClick: (
    messageValues: MessageValues,
    onSuccess: () => void
  ) => void;
  withSpinner?: boolean;
  withWeb3?: boolean;
}

function ContactForm({
  currentAccount,
  initialValues,
  isWeb3Loaded,
  onConnectWalletClick,
  onDropdownButtonClick,
  onFormChange,
  onSendMessageClick,
  withSpinner,
  withWeb3,
}: Props) {
  const { colors, currentTheme } = React.useContext(ThemeContext);

  const isFormButtonDisabled = (withWeb3 && !currentAccount) || withSpinner;

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

  const ContentNode = React.useCallback(
    (onConfirmButtonClick: () => void, onCancelButtonClick: () => void) => {
      const content = withWeb3 ? web2DropdownContent : web3DropdownContent;

      return (
        <DropdownContent>
          {content.paragraphs?.map((paragraph, index) => {
            return <p key={index}>{paragraph}</p>;
          })}
          <button onClick={onConfirmButtonClick}>
            {content.confirmButtonLabel}
          </button>
          <button onClick={onCancelButtonClick}>
            {content.cancelButtonLabel}
          </button>
        </DropdownContent>
      );
    },
    [withWeb3]
  );

  return (
    <RootStyles
      currentTheme={currentTheme}
      isWalletConnected={!!currentAccount}
      isFormButtonDisabled={isFormButtonDisabled}
    >
      <div>
        <h2>Message</h2>
        <div>
          {withWeb3 && isWeb3Loaded ? (
            <div>
              <div />
              <button onClick={onConnectWalletClick}>
                {currentAccount || CONNECT_WALLET_LABEL}
              </button>
            </div>
          ) : null}
          <DropdownAnchor
            content={ContentNode}
            onDropdownButtonClick={onDropdownButtonClick}
          >
            <button>
              <div>
                <SettingsIcon color={colors.text} />
              </div>
            </button>
          </DropdownAnchor>
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
        <button disabled={isFormButtonDisabled} type="submit">
          {withSpinner ? (
            <Spinner color="white" height="40px" width="40px" />
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </RootStyles>
  );
}

interface StyleProps {
  currentTheme: ThemeEnum;
  isFormButtonDisabled?: boolean;
  isWalletConnected?: boolean;
}

const RootStyles = styled.div<StyleProps>`
  border-radius: ${({ theme }) => theme.borderRadii.xxLarge};
  background: ${({ theme }) => theme.colors.bodyBackgroundAccentOne};
  padding: ${({ theme }) => theme.spaces.small};
  -webkit-box-shadow: ${({ theme }) => theme.dropshadows.small};
  -moz-box-shadow: ${({ theme }) => theme.dropshadows.small};
  box-shadow: ${({ theme }) => theme.dropshadows.small};
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
          background: ${({ theme }) => `${theme.colorsHex.transparent}`};
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
        transition: opacity ${({ theme }) => theme.transitions.medium}
          ease-in-out;

        &:hover {
          opacity: ${({ theme }) => theme.opacity.opacity70};
        }

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
      background: ${({ theme }) => theme.colors.bodyBackground};
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
      border: 1px solid ${({ theme }) => theme.colors.bodyBackgroundAccentOne};
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
            : theme.opacity.opacity70};
      }
    }
  }
`;

const DropdownContent = styled.div`
  width: 100%;

  > p {
    color: ${({ theme }) => theme.colorsHex.white};
    font-size: 1.6rem;
    margin-bottom: ${({ theme }) => theme.spaces.medium};
  }

  > button {
    border: none;
    background-color: ${({ theme }) => theme.colors.buttonSecondaryBackground};
    border-radius: ${({ theme }) => theme.borderRadii.large};
    color: ${({ theme }) => theme.colorsHex.white};
    cursor: pointer;
    height: ${({ theme }) => theme.spaces.large};
    width: 100%;
  }

  > button:last-child {
    background-color: ${({ theme }) => theme.colorsHex.alabaster};
    color: ${({ theme }) => theme.colors.buttonSecondaryBackground};
    margin-top: ${({ theme }) => theme.spaces.small};
  }
`;

export default ContactForm;
