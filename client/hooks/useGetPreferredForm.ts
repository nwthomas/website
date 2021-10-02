import * as React from "react";
export const WEB2_KEY = "web2";
export const WEB3_KEY = "web3";
export const LOCAL_STORAGE_KEY = "preferredForm";

// This extends the global Window object with custom values from _document.tsx
declare global {
  interface Window {
    __setPreferredForm: (newPreferredForm: string) => void;
    __preferredForm: string;
  }
}

type PreferredFormEnum = "web2" | "web3";

// Updates the preferredForm using JavaScript code defined in the _document.tsx file
export function useGetPreferredForm(): [PreferredFormEnum, () => void] {
  const [userPreferredForm, setUserPreferredForm] =
    React.useState<PreferredFormEnum>(WEB2_KEY);

  React.useEffect(() => {
    // We must check for typeof window !== "undefined" instead of window !== undefined
    // because typeof does not evaluate window but only get its type
    // https://dev.to/vvo/how-to-solve-window-is-not-defined-errors-in-react-and-next-js-5f97
    if (
      typeof window !== "undefined" &&
      window.__preferredForm &&
      (window.__preferredForm === WEB2_KEY ||
        window.__preferredForm === WEB3_KEY)
    ) {
      setUserPreferredForm(window.__preferredForm);
    }
  }, []);

  function updatePreferredForm() {
    console.log(window.__preferredForm, window.__setPreferredForm);
    if (
      typeof window !== "undefined" &&
      window.__preferredForm &&
      window.__setPreferredForm
    ) {
      const newPreferredForm =
        window.__preferredForm === WEB2_KEY ? WEB3_KEY : WEB2_KEY;

      setUserPreferredForm(newPreferredForm);
      window.__setPreferredForm(newPreferredForm);
    }
  }

  return [userPreferredForm, updatePreferredForm];
}
