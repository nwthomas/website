import * as React from "react";

export function useLockBodyScroll() {
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const getComputedStyle = (style: string): string =>
        window.getComputedStyle(document.body)[style];
      const viewportTopYCoord = window.scrollY;
      const viewportBottomYCoord = viewportTopYCoord + window.innerHeight;

      const originalBottomStyle = getComputedStyle("bottom");
      const originalLeftStyle = getComputedStyle("left");
      const originalOverflowStyle = getComputedStyle("overflow");
      const originalPositionStyle = getComputedStyle("position");
      const originalRightStyle = getComputedStyle("right");
      const originalTopStyle = getComputedStyle("top");

      document.body.style.bottom = String(viewportBottomYCoord);
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.top = String(viewportTopYCoord);

      return () => {
        document.body.style.bottom = originalBottomStyle;
        document.body.style.left = originalLeftStyle;
        document.body.style.overflow = originalOverflowStyle;
        document.body.style.position = originalPositionStyle;
        document.body.style.right = originalRightStyle;
        document.body.style.top = originalTopStyle;
      };
    }
  }, []);
}
