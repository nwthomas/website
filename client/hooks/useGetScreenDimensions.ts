import * as React from "react";

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

  const handleMeasureWindowDimensions = () => {
    if (typeof window !== "undefined") {
      // Total width and height of viewport
      const { innerHeight: newViewportHeight, innerWidth: newViewportWidth } =
        window;

      // Viewport - scrollbars if they exist
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
  };

  React.useEffect(() => {
    handleMeasureWindowDimensions();

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleMeasureWindowDimensions);

      return () =>
        window.removeEventListener("resize", handleMeasureWindowDimensions);
    }
  }, []);

  return { viewportHeight, viewportWidth, availableHeight, availableWidth };
};
