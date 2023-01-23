import * as React from "react";

import throttle from "lodash/throttle";

const THROTTLE_WAIT_TIME_MS = 10;

export interface ScreenDimensions {
  viewportHeight?: number;
  viewportWidth?: number;
  availableHeight?: number;
  availableWidth?: number;
}

export const useGetScreenDimensions = (): ScreenDimensions => {
  const [viewportHeight, setViewportHeight] = React.useState<
    number | undefined
  >(typeof window !== "undefined" ? window.innerHeight : undefined);
  const [viewportWidth, setViewportWidth] = React.useState<number | undefined>(
    typeof window !== "undefined" ? window.innerWidth : undefined
  );

  const [availableHeight, setAvailableHeight] = React.useState<
    number | undefined
  >(
    typeof window !== "undefined"
      ? document.documentElement.clientHeight
      : undefined
  );
  const [availableWidth, setAvailableWidth] = React.useState<
    number | undefined
  >(
    typeof window !== "undefined"
      ? document.documentElement.clientWidth
      : undefined
  );

  // I want to use this throttle, so be careful for any future changes here as ESLint can't
  // really lint the use of the dependency array.
  //
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleMeasureWindowDimensions = React.useCallback(
    throttle(
      () => {
        if (typeof window !== "undefined") {
          // Total width and height of viewport
          const {
            innerHeight: newViewportHeight,
            innerWidth: newViewportWidth,
          } = window;

          // This includes scrollbars if they exist
          const {
            clientHeight: newAvailableHeight,
            clientWidth: newAvailableWidth,
          } = document.documentElement;

          if (newViewportHeight !== viewportHeight) {
            setViewportHeight(newViewportHeight);
          }

          if (newViewportWidth !== viewportWidth) {
            setViewportWidth(newViewportWidth);
          }

          if (newAvailableHeight !== availableHeight) {
            setAvailableHeight(newAvailableHeight);
          }

          if (newAvailableWidth !== availableWidth) {
            setAvailableWidth(newAvailableWidth);
          }
        }
      },
      THROTTLE_WAIT_TIME_MS,
      { trailing: true }
    ),
    [availableHeight, availableWidth, viewportHeight, viewportWidth]
  );

  React.useEffect(() => {
    handleMeasureWindowDimensions();

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleMeasureWindowDimensions, {
        passive: true,
      });
      window.addEventListener(
        "orientationchange",
        handleMeasureWindowDimensions,
        { passive: true }
      );

      return () => {
        window.removeEventListener("resize", handleMeasureWindowDimensions);
        window.removeEventListener(
          "orientationchange",
          handleMeasureWindowDimensions
        );
      };
    }
  }, [handleMeasureWindowDimensions]);

  return { viewportHeight, viewportWidth, availableHeight, availableWidth };
};
