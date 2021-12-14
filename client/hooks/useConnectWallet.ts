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

const errors = {
  LOADING_WALLET: () => "Error loading wallet",
  NO_METAMASK: () => "Please install MetaMask",
  FALLBACK: () => "Something went wrong",
  WRONG_CHAIN: (correctChain: string) =>
    `Please change chain to ${correctChain}`,
};

function encryptStringValues(value: string) {
  return cryptojs.AES.encrypt(JSON.stringify(value), SECRET_KEY).toString();
}

export function abbreviateWalletAddress(address: string) {
  return address.slice(0, 5) + "..." + address.slice(address.length - 5);
}

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
  connectToWallet: () => void;
  currentAccount: string;
  currentChain: ChainEnum | null;
  errorMessage: string;
  isLoaded: boolean;
  isError: boolean;
  isMining: boolean;
  sendNewMessage: (
    newEmail: MessageValues,
    onSuccessCallback: () => void
  ) => void;
};

export function useConnectWallet(): UseConnectWalletReturnValues {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);
  const [isError, setIsError] = React.useState<boolean>(false);
  const [isMining, setIsMining] = React.useState<boolean>(false);
  const [currentAccount, setCurrentAccount] = React.useState<string>("");
  const [currentChain, setCurrentChain] = React.useState<ChainEnum | null>(
    null
  );
  const [errorMessage, setErrorMessage] = React.useState<string>(
    errors.FALLBACK()
  );

  // Utility functions used inside this custom hook
  const checkIfWalletIsConnected = React.useCallback(async (): Promise<
    Array<string>
  > => {
    const { ethereum } = window || {};

    if (ethereum) {
      return ethereum.request({ method: "eth_accounts" });
    }

    setErrorMessage(errors.NO_METAMASK);
    setIsError(true);
    return [];
  }, []);

  const checkCurrentChain = React.useCallback(async () => {
    const { ethereum } = window || {};

    if (ethereum) {
      const chainId = await ethereum.request({ method: "eth_chainId" });
      const chainIdString = chainIdToNetworkString[String(chainId)] || null;
      setCurrentChain(chainIdString);

      if (chainIdString !== TARGETED_CHAIN) {
        setCurrentAccount("");
        setErrorMessage(errors.WRONG_CHAIN(TARGETED_CHAIN));
        setIsError(true);
      }
    } else {
      setErrorMessage(errors.NO_METAMASK);
      setIsError(true);
    }
  }, []);

  const connectToWallet = React.useCallback(async (): Promise<{
    error: boolean;
    accounts: Array<string>;
    message: string;
  }> => {
    try {
      const { ethereum } = window || {};

      if (!ethereum) {
        return {
          error: true,
          accounts: [],
          message: errors.NO_METAMASK(),
        };
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      return { error: false, accounts, message: "" };
    } catch (error) {
      return {
        error: true,
        accounts: [],
        message: errors.LOADING_WALLET(),
      };
    }
  }, []);

  const handleStartConnectionAttemptToWallet = React.useCallback(() => {
    const handleConnectToWallet = async () => {
      setIsError(false);
      setErrorMessage("");

      const result = await connectToWallet();

      if (!result.error && result.accounts.length) {
        setCurrentAccount(result.accounts[0]);
        setIsLoaded(true);
      } else {
        setErrorMessage(result.message);
        setIsError(true);
      }
    };

    handleConnectToWallet();
  }, []);

  const sendNewMessage = React.useCallback(
    async (newEmail: MessageValues, onSuccessCallback: () => void) => {
      const { ethereum } = window || {};
      const { name, email, message, fax } = newEmail;

      const finalizedEmail = {
        name: encryptStringValues(name),
        email: encryptStringValues(email),
        message: encryptStringValues(message),
        fax,
      };

      if (ethereum) {
        setIsMining(true);
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
      } else {
        setErrorMessage(errors.NO_METAMASK);
        setIsError(true);
      }

      setIsMining(false);
    },
    []
  );

  // Initial setup with window.ethereum for page load
  React.useEffect(() => {
    async function handleCheckIfWalletIsConnected() {
      const accounts = await checkIfWalletIsConnected();

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      }

      setIsLoaded(true);
    }

    handleCheckIfWalletIsConnected();
    checkCurrentChain();
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

  return {
    // State variables
    currentAccount,
    currentChain,
    errorMessage,
    isLoaded,
    isError,
    isMining,

    // Functions
    connectToWallet: handleStartConnectionAttemptToWallet,
    sendNewMessage,
  };
}
