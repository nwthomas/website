import * as React from "react";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "../constants/contracts/address";
import messageHub from "../constants/contracts/MessageHub.json";
import type { MessageValues } from "../components/ContactForm";

const TARGETED_CHAIN = process.env.NEXT_PUBLIC_TARGETED_CHAIN;

type ChainEnum = "mainnet" | "ropsten" | "rinkeby" | "goerli" | "kovan";
const chainIdToNetworkString = {
  "0x1": "mainnet",
  "0x3": "ropsten",
  "0x4": "rinkeby",
  "0x5": "goerli",
  "0x2a": "kovan",
};

const errors = {
  LOADING_WALLET: "Error loading wallet",
  NO_METAMASK: "Please install MetaMask",
};

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
  accounts: Array<string>;
  connectToWallet: () => void;
  currentAccount: string;
  currentChain: ChainEnum | null;
  errorMessage: string;
  isLoaded: boolean;
  isError: boolean;
  sendNewMessage: (
    newEmail: MessageValues,
    onSuccessCallback: () => void
  ) => void;
};

export function useConnectWallet(): UseConnectWalletReturnValues {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);
  const [isError, setIsError] = React.useState<boolean>(false);
  const [currentAccount, setCurrentAccount] = React.useState<string>("");
  const [currentChain, setCurrentChain] = React.useState<ChainEnum | null>(
    null
  );
  const [walletAccounts, setWalletAccounts] = React.useState<Array<string>>([]);
  const [walletErrorMessage, setWalletErrorMessage] =
    React.useState<string>("");

  // Utility functions used inside this custom hook
  const checkIfWalletIsConnected = async (): Promise<Array<string>> => {
    const { ethereum } = window || {};

    if (ethereum) {
      const accounts = await ethereum.request({ method: "eth_accounts" });

      return accounts;
    }

    setIsError(true);
    setWalletErrorMessage(errors.NO_METAMASK);
    return [];
  };

  const checkCurrentChain = async () => {
    const { ethereum } = window || {};

    if (ethereum) {
      const chainId = await ethereum.request({ method: "eth_chainId" });
      const chainIdString = chainIdToNetworkString[String(chainId)];

      if (chainIdString === TARGETED_CHAIN) {
        setCurrentChain(chainIdString);
      } else {
        // FINISH
      }
    } else {
      setIsError(true);
      setWalletErrorMessage(errors.NO_METAMASK);
    }
  };

  const connectToWallet = async (): Promise<{
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
          message: errors.NO_METAMASK,
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
        message: errors.LOADING_WALLET,
      };
    }
  };

  const handleStartConnectionAttemptToWallet = () => {
    const handleConnectToWallet = async () => {
      setIsError(false);
      setWalletErrorMessage("");

      const result = await connectToWallet();

      if (!result.error && result.accounts.length) {
        setCurrentAccount(result.accounts[0]);
        setWalletAccounts(result.accounts);
        setIsLoaded(true);
      } else {
        setIsError(true);
        setWalletErrorMessage(result.message || errors.LOADING_WALLET);
      }
    };

    handleConnectToWallet();
  };

  const sendNewMessage = async (
    newEmail: MessageValues,
    onSuccessCallback: () => void
  ) => {
    const { ethereum } = window || {};

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const messageHubContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        messageHub.abi,
        signer
      );

      const sendMessageTxn = await messageHubContract.sendMessage(newEmail);
      await sendMessageTxn.wait();
      onSuccessCallback();
    } else {
      setIsError(true);
      setWalletErrorMessage(errors.NO_METAMASK);
    }
  };

  // Initial setup with window.ethereum for page load
  React.useEffect(() => {
    async function handleCheckIfWalletIsConnected() {
      const accounts = await checkIfWalletIsConnected();

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        setWalletAccounts(accounts);
      }

      setIsLoaded(true);
    }

    handleCheckIfWalletIsConnected();
    checkCurrentChain();
  }, []);

  // Set a series of listeners for possible wallet connection state changes
  React.useEffect(() => {
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

    // Set listener to handle NewMessage events from smart contract
    const handleNewMessageEvent = () => {
      // FINISH
    };
    window.ethereum.on("NewMessage", handleNewMessageEvent);

    return () => {
      window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      window.ethereum.removeListener("chainChanged", handleChainChanged);
      window.ethereum.removeListener("NewMessage", handleNewMessageEvent);
    };
  }, []);

  return {
    accounts: walletAccounts,
    connectToWallet: handleStartConnectionAttemptToWallet,
    currentAccount,
    currentChain,
    errorMessage: walletErrorMessage,
    isLoaded,
    isError,
    sendNewMessage,
  };
}

export function abbreviateWalletAddress(address: string) {
  return address.slice(0, 5) + "..." + address.slice(address.length - 5);
}
