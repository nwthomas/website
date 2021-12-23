import * as React from "react";

type ReturnValues = {
  isMounted: boolean;
  dimensions: {
    height?: number;
    width?: number;
  };
};

export const useGetScreenDimensions = (): ReturnValues => {};
