import * as React from "react";

export function useLockBodyScroll() {
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const originalOverflowStyle = window.getComputedStyle(
        document.body
      ).overflow;
      const originalPositionStyle = window.getComputedStyle(
        document.body
      ).position;
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";

      return () => {
        document.body.style.overflow = originalOverflowStyle;
        document.body.style.position = originalPositionStyle;
      };
    }
  }, []);
}
