import * as React from "react";
import styled, { ThemeContext } from "styled-components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { SettingsIcon } from "../icons";
import DropdownAnchor from "../DropdownAnchor";

const web3DropdownContent = {
  paragraphOne: "You discovered a cool feature. 🎉",
  paragraphTwo:
    "This is the Web2 form. Would you like the Web3 version? It requires a crypto wallet.",
  buttonLabel: "Yes",
};

interface Props {
  isWalletConnected: boolean;
  onDropdownButtonClick: () => void;
  withWeb3: boolean;
}

function ContactForm({
  isWalletConnected,
  onDropdownButtonClick,
  withWeb3,
}: Props) {
  const { colors } = React.useContext(ThemeContext);

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
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <RootStyles isWalletConnected={isWalletConnected}>
      <div>
        <h2>Message</h2>
        <div>
          {withWeb3 ? (
            <button>
              {isWalletConnected ? "Switch Wallet Address" : "Connect Wallet"}
            </button>
          ) : null}
          <DropdownAnchor
            content={web3DropdownContent}
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
        <button type="submit">
          {withWeb3 && !isWalletConnected ? "Connect Wallet" : "Submit"}
        </button>
      </form>
    </RootStyles>
  );
}

interface StyleProps {
  isWalletConnected: boolean;
}

const RootStyles = styled.div<StyleProps>`
  border-radius: ${({ theme }) => theme.borderRadii.xxLarge};
  background: ${({ theme }) => theme.colors.bodyBackgroundAccentOne};
  padding: ${({ theme }) => theme.spaces.small};
  box-shadow: 0px 6px 10px -2px rgba(0, 0, 0, 0.47);
  -moz-box-shadow: 0px 6px 10px -2px rgba(0, 0, 0, 0.47);
  -webkit-box-shadow: 0px 6px 10px -2px rgba(0, 0, 0, 0.47);
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
        border: 1px solid red;
      }

      > button:nth-child(1) {
        background: ${({ theme }) => `${theme.colorsHex.royalBlue}30`};
        border: 1px solid ${({ theme }) => theme.colors.buttonPrimaryBackground};
        border-radius: ${({ theme }) => theme.borderRadii.xxLarge};
        color: ${({ theme }) => theme.colors.buttonPrimaryBackground};
        cursor: pointer;
        margin-right: ${({ theme }) => theme.spaces.small};
        padding: ${({ theme }) =>
          `${theme.spaces.micro} ${theme.spaces.small}`};
      }

      > button:nth-child(2) {
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
      cursor: pointer;
      margin-top: ${({ theme }) => theme.spaces.nano};
      height: ${({ theme }) => theme.spaces.xLarge};
    }
  }
`;

export default ContactForm;
