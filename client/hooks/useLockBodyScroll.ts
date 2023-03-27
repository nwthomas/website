import * as React from "react";

// export function useLockBodyScroll() {
//   React.useEffect(() => {
//     if (typeof window !== "undefined") {
//       const getComputedStyle = (style: string): string =>
//         window.getComputedStyle(document.body)[style];

//       const originalBottomStyle = getComputedStyle("bottom");
//       const originalLeftStyle = getComputedStyle("left");
//       const originalOverflowStyle = getComputedStyle("overflow");
//       const originalPositionStyle = getComputedStyle("position");
//       const originalRightStyle = getComputedStyle("right");
//       const originalTopStyle = getComputedStyle("top");

//       document.body.style.bottom = "0";
//       document.body.style.overflow = "hidden";
//       document.body.style.position = "fixed";
//       document.body.style.left = "0";
//       document.body.style.right = "0";
//       document.body.style.top = "0";

//       return () => {
//         document.body.style.bottom = originalBottomStyle;
//         document.body.style.left = originalLeftStyle;
//         document.body.style.overflow = originalOverflowStyle;
//         document.body.style.position = originalPositionStyle;
//         document.body.style.right = originalRightStyle;
//         document.body.style.top = originalTopStyle;
//       };
//     }
//   }, []);
// }

export function useLockBodyScroll() {
  React.useLayoutEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);
}
