import * as React from "react";

import { ThemeContext } from "styled-components";
import debounce from "lodash/debounce";
import { useGetScreenDimensions } from "./";

const DEBOUNCE_WAIT_TIME_MS = 10;

const DEFAULT_RADIANS = Math.PI;

function getAngleRadians(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number {
  const distY = y2 - y1;
  const distX = x2 - x1;
  const result = Math.atan2(distY, distX);

  return result - Math.PI / 2;
}

export function useGetMouseRadian(ref: React.RefObject<HTMLElement>): number {
  const { viewportWidth } = useGetScreenDimensions();
  const { breakpointsInt } = React.useContext(ThemeContext);
  const [mouseCoordinates, setMouseCoordinates] = React.useState<{
    x?: number;
    y?: number;
  }>({});

  const getMouseCoordinates = React.useCallback(
    debounce(
      ({ clientX, clientY }: MouseEvent) => {
        setMouseCoordinates({ x: clientX, y: clientY });
      },
      DEBOUNCE_WAIT_TIME_MS,
      { trailing: true }
    ),
    []
  );

  React.useEffect(() => {
    document.addEventListener("mousemove", getMouseCoordinates);

    return () => {
      document.removeEventListener("mousemove", getMouseCoordinates);
    };
  }, [getMouseCoordinates]);

  if (
    !ref.current ||
    !viewportWidth ||
    viewportWidth <= breakpointsInt.desktop
  ) {
    return DEFAULT_RADIANS + DEFAULT_RADIANS / 5;
  }

  const { x: mouseX, y: mouseY } = mouseCoordinates;
  const { bottom, left, right, top } = ref.current.getBoundingClientRect();
  const elementMiddleX = (right - left) / 2 + left;
  const elementMiddleY = (bottom - top) / 2 + top;

  if (mouseX && mouseY) {
    return getAngleRadians(elementMiddleX, elementMiddleY, mouseX, mouseY);
  }

  return DEFAULT_RADIANS;
}
