import * as React from "react";

export function useLockBodyScroll() {
  const lockBodyScroll = () =>
    React.useCallback((): (() => void) => {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      return () => (document.body.style.overflow = originalStyle);
    }, []);

  return lockBodyScroll;
}
