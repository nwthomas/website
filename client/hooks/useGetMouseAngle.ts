import * as React from "react";

const DEFAULT_RADIANS = (2 * Math.PI) / 2;

function getAngleRadians(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number {
  const distY = y2 - y1;
  const distX = x2 - x1;
  const result = Math.atan2(distY, distX);

  return result;
}

export function useGetMouseAngle(ref: React.RefObject<HTMLElement>): number {
  const [mouseCoordinates, setMouseCoordinates] = React.useState<{
    x?: number;
    y?: number;
  }>({});

  const getMouseCoordinates = React.useCallback(
    ({ clientX, clientY }: MouseEvent) => {
      setMouseCoordinates({ x: clientX, y: clientY });
    },
    []
  );

  React.useEffect(() => {
    document.addEventListener("mousemove", getMouseCoordinates);

    return () => {
      document.removeEventListener("mousemove", getMouseCoordinates);
    };
  }, []);

  if (!ref.current) {
    return DEFAULT_RADIANS;
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
