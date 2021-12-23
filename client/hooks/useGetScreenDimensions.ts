import * as React from "react";

type ReturnValues = {
  height?: number;
  width?: number;
};

export const useGetScreenDimensions = (): ReturnValues => {
  const [height, setHeight] = React.useState<number | null>(null);
  const [width, setWidth] = React.useState<number | null>(null);

  const handleMeasureWindowDimensions = () => {
    if (typeof window !== "undefined") {
      const { innerHeight, innerWidth } = window;

      setHeight(innerHeight);
      setWidth(innerWidth);
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

  const dimensions: ReturnValues = {};
  if (height && width) {
    dimensions.height = height;
    dimensions.width = width;
  }

  return dimensions;
};
