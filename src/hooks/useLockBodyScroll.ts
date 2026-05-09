import { useLayoutEffect } from "react";

export function useLockBodyScroll() {
  useLayoutEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalStyle;
      window.scrollTo(0, scrollPosition);
    };
  }, []);
}
