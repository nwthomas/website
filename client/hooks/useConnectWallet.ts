import * as React from "react";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import cryptojs from "crypto-js";
import { CONTRACT_ADDRESS } from "../constants/contracts/address";
import messageHub from "../constants/contracts/MessageHub.json";
import type { MessageValues } from "../components/ContactForm";

const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY || "";
const TARGETED_CHAIN = process.env.NEXT_PUBLIC_TARGETED_CHAIN || "";

type ChainEnum = "mainnet" | "ropsten" | "rinkeby" | "goerli" | "kovan" | "";
const chainIdToNetworkString = Object.freeze({
  "0x1": "mainnet",
  "0x3": "ropsten",
  "0x4": "rinkeby",
  "0x5": "goerli",
  "0x2a": "kovan",
});

const errors = Object.freeze({
  LOADING_WALLET: () => "Error loading wallet",
  NO_METAMASK: () => "Please install MetaMask",
  FALLBACK: () => "Something went wrong",
  SENDING_MESSAGE: () => "Error sending message",
  WRONG_CHAIN: (correctChain: string) =>
    `Please change chain to ${correctChain}`,
});

// This defines the window.ethereum object for TypeScript
declare global {
  interface Window {
    ethereum: {
      on: (eventType: string, callback: (arg: any) => void) => void;
      removeListener: (eventType: string, callback: (arg: any) => void) => void;
      request: ({ method: string }) => Promise<Array<string>>;
    };
  }
}

type UseConnectWalletReturnValues = {
  checkIfWalletIsConnected: () => void;
  connectToWallet: () => void;
  currentAccount: string;
  currentChain: ChainEnum | null;
  errorMessage: string;
  isLoaded: boolean;
  isError: boolean;
  isSending: boolean;
  reset: () => void;
  sendNewMessage: (
    newEmail: MessageValues,
    onSuccessCallback: () => void
  ) => void;
};

export function useConnectWallet(): UseConnectWalletReturnValues {
  const router = useRouter();

  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);
  const [isError, setIsError] = React.useState<boolean>(false);
  const [isSending, setIsSending] = React.useState<boolean>(false);
  const [currentAccount, setCurrentAccount] = React.useState<string>("");
  const [currentChain, setCurrentChain] = React.useState<ChainEnum | null>(
    null
  );
  const [errorMessage, setErrorMessage] = React.useState<string>(
    errors.FALLBACK()
  );

  // Initial setup with window.ethereum for page load
  React.useEffect(() => {
    async function handleAsyncInitialSetup() {
      await checkIfWalletIsConnected(
        setIsError,
        setErrorMessage,
        setCurrentAccount,
        setIsLoaded
      );

      await checkCurrentChain(
        setIsError,
        setErrorMessage,
        setCurrentChain,
        setCurrentAccount
      );
    }

    handleAsyncInitialSetup();
  }, [currentChain]);

  // Set a series of listeners for possible wallet connection state changes
  React.useEffect(() => {
    const { ethereum } = window || {};

    if (ethereum) {
      // Set listener to handle account changes and update account state
      const handleAccountsChanged = (accounts: string[]) => {
        const updatedCurrentAccoumt = accounts.length ? accounts[0] : "";
        setCurrentAccount(updatedCurrentAccoumt);
      };
      window.ethereum.on("accountsChanged", handleAccountsChanged);

      // Set listener to handle network changes and reload page per recommendation from:
      // https://docs.metamask.io/guide/ethereum-provider.html#chainchanged
      const handleChainChanged = () => router.reload();
      window.ethereum.on("chainChanged", handleChainChanged);

      return () => {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
        window.ethereum.removeListener("chainChanged", handleChainChanged);
      };
    }
  }, []);

  // Resets the hook to an initialized state
  function reset() {
    setIsLoaded(false);
    setCurrentAccount("");
    setIsError(false);
    setErrorMessage(errors.FALLBACK());
  }

  return {
    // State variables
    currentAccount,
    currentChain,
    errorMessage,
    isLoaded,
    isError,
    isSending,

    // Functions
    checkIfWalletIsConnected: () =>
      checkIfWalletIsConnected(
        setIsError,
        setErrorMessage,
        setCurrentAccount,
        setIsLoaded
      ),
    connectToWallet: connectToWallet(
      setIsError,
      setErrorMessage,
      setCurrentAccount,
      currentChain
    ),
    reset,
    sendNewMessage: sendNewMessage(setIsError, setErrorMessage, setIsSending),
  };
}

// Check if current chain is expected chain
const checkCurrentChain = async (
  onIsError: (isError: boolean) => void,
  onErrorMessage: (errorMessage: string) => void,
  onCurrentChain: (currentChain: ChainEnum) => void,
  onCurrentAccount: (currentAccount: string) => void
) => {
  onIsError(false);
  onErrorMessage("");

  // Given this is checking on load of hook, don't throw a full error message
  const { ethereum } = window || {};
  if (!ethereum) {
    return;
  }

  const chainId = await window.ethereum.request({ method: "eth_chainId" });
  const chainIdString = chainIdToNetworkString[String(chainId)] || null;

  if (chainIdString !== TARGETED_CHAIN) {
    const capitalizedTargetedChainName = TARGETED_CHAIN.length
      ? TARGETED_CHAIN.charAt(0).toUpperCase() + TARGETED_CHAIN.slice(1)
      : "";

    onCurrentAccount("");
    onErrorMessage(errors.WRONG_CHAIN(capitalizedTargetedChainName));
    onIsError(true);
  } else {
    onCurrentChain(chainIdString);
  }
};

// Check if wallet is connected on load of hook
const checkIfWalletIsConnected = async (
  onIsError: (isError: boolean) => void,
  onErrorMessage: (errorMessage: string) => void,
  onCurrentAccount: (currentAccount: string) => void,
  onIsLoaded: (isLoaded: boolean) => void
) => {
  onIsError(false);
  onErrorMessage("");

  // Given this is checking on load of hook, don't throw a full error message
  const { ethereum } = window || {};
  if (!ethereum) {
    onIsLoaded(true);
    return;
  }

  const accounts = await ethereum.request({ method: "eth_accounts" });

  if (accounts.length) {
    onCurrentAccount(accounts[0]);
  }

  onIsLoaded(true);
};

// Connect to wallet
const connectToWallet =
  (
    onIsError: (isError: boolean) => void,
    onErrorMessage: (errorMessage: string) => void,
    onCurrentAccount: (currentAccount: string) => void,
    currentChain: ChainEnum | null
  ) =>
  async () => {
    onIsError(false);
    onErrorMessage("");

    const { ethereum } = window || {};
    if (!ethereum) {
      onErrorMessage(errors.NO_METAMASK());
      onIsError(true);
      return;
    } else if (currentChain !== TARGETED_CHAIN) {
      const capitalizedTargetedChainName = TARGETED_CHAIN.length
        ? TARGETED_CHAIN.charAt(0).toUpperCase() + TARGETED_CHAIN.slice(1)
        : "";

      onCurrentAccount("");
      onErrorMessage(errors.WRONG_CHAIN(capitalizedTargetedChainName));
      onIsError(true);
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length) {
        onCurrentAccount(accounts[0]);
      } else {
        throw Error();
      }
    } catch (_) {
      onErrorMessage(errors.LOADING_WALLET());
      onIsError(true);
    }
  };

// Send message to smart contract
const sendNewMessage =
  (
    onIsError: (isError: boolean) => void,
    onErrorMessage: (errorMessage: string) => void,
    onIsSending: (isSending: boolean) => void
  ) =>
  async (newEmail: MessageValues, onSuccessCallback: () => void) => {
    onIsError(false);
    onErrorMessage("");
    onIsSending(false);

    const { ethereum } = window || {};
    if (!ethereum) {
      onErrorMessage(errors.NO_METAMASK());
      onIsError(true);
      return;
    }

    const { name, email, message, fax } = newEmail;

    const finalizedEmail = {
      name: encryptStringValues(name),
      email: encryptStringValues(email),
      message: encryptStringValues(message),
      fax,
    };

    onIsSending(true);
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const messageHubContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        messageHub.abi,
        signer
      );

      const sendMessageTxn = await messageHubContract.sendMessage(
        finalizedEmail
      );
      await sendMessageTxn.wait();
      onSuccessCallback();
    } catch (_) {
      onErrorMessage(errors.SENDING_MESSAGE());
      onIsError(true);
    }

    onIsSending(false);
  };

// Handles encryption to extra layer of privacy in event on smart contract
function encryptStringValues(value: string) {
  return cryptojs.AES.encrypt(JSON.stringify(value), SECRET_KEY).toString();
}

// Abbreviates the wallet address for purposes of displaying it in the user interface
export function abbreviateWalletAddress(address: string) {
  return address.slice(0, 5) + "..." + address.slice(address.length - 5);
}
