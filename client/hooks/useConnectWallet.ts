import * as React from "react";

// This extends the global Window object with custom values from _document.tsx
declare global {
  interface Window {
    // Type 'any' isn't great, but I don't feel like typing out 'ethereum' from
    // MetaMask at the moment
    ethereum: any;
  }
}

type ReturnValue = Promise<
  Array<string | Array<string> | ((newCurrentAccount: string) => void)>
>;

export async function useConnectWallet(): ReturnValue {
  const [currentAccount, setCurrentAccount] = React.useState<string>("");
  const [walletAccounts, setWalletAccounts] = React.useState<Array<string>>([]);

  const updateCurrentAccount = (newCurrentAccount: string) => {
    if (walletAccounts.indexOf(newCurrentAccount) > -1) {
      setCurrentAccount(newCurrentAccount);
    }
  };

  if (typeof window !== "undefined") {
    const { ethereum } = window;

    if (ethereum) {
      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length > 0) {
        setWalletAccounts(accounts);
        setCurrentAccount(accounts[0]);
      }

      return [currentAccount, walletAccounts, updateCurrentAccount];
    }
  }

  return ["", [], function () {}];
}
