import * as React from "react";

export function useLockBodyScroll() {
  const lockBody = React.useCallback(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "visible");
  }, []);

  const unlockBody = React.useCallback(() => {
    document.body.style.overflow = "visible";
  }, []);

  return [lockBody, unlockBody];
}
