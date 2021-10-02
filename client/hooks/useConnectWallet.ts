import * as React from "react";

// This extends the global Window object with custom values from _document.tsx
declare global {
  interface Window {
    // Type 'any' isn't great, but I don't feel like typing out 'ethereum' from
    // MetaMask at the moment
    ethereum: any;
  }
}

const checkIfWalletIsConnected = async (): Promise<Array<string>> => {
  const { ethereum } = window;

  if (ethereum) {
    const accounts = await ethereum.request({ method: "eth_accounts" });

    return accounts || [];
  }

  return [];
};

async function connectToWallet(): Promise<{
  error: boolean;
  accounts: Array<string>;
  message: string;
}> {
  try {
    const { ethereum } = window;

    if (!ethereum) {
      return {
        error: true,
        accounts: [],
        message: "Please install MetaMask",
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
      message: "There was a problem connecting your accounts",
    };
  }
}

type ReturnValue = {
  accounts: Array<string>;
  connectToWallet: () => void;
  currentAccount: string;
  errorMessage: string;
  isLoaded: boolean;
};

export function useConnectWallet(): ReturnValue {
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);
  const [currentAccount, setCurrentAccount] = React.useState<string>("");
  const [walletAccounts, setWalletAccounts] = React.useState<Array<string>>([]);
  const [walletErrorMessage, setWalletErrorMessage] =
    React.useState<string>("");

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
  }, []);

  function handleStartConnectionAttemptToWallet() {
    async function handleConnectToWallet() {
      const result = await connectToWallet();

      if (!result.error && result.accounts.length) {
        setCurrentAccount(result.accounts[0]);
        setWalletAccounts(result.accounts);
      } else {
        setWalletErrorMessage(
          result.message || "Your wallet could not be connected"
        );
      }

      setIsLoaded(true);
    }

    handleConnectToWallet();
  }

  return {
    accounts: walletAccounts,
    connectToWallet: handleStartConnectionAttemptToWallet,
    currentAccount,
    errorMessage: walletErrorMessage,
    isLoaded,
  };
}
