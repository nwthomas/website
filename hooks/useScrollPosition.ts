import * as React from "react";

import throttle from "lodash/throttle";

const THROTTLE_WAIT_TIME_MS = 10;

// Taken from https://usehooks.com/useScrollPosition/
export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = React.useState(0);

  React.useEffect(() => {
    const updatePosition = throttle(() => {
      setScrollPosition(window.scrollY);
    }, THROTTLE_WAIT_TIME_MS);

    window.addEventListener("scroll", updatePosition, {
      passive: true,
    });

    updatePosition();

    return () => {
      window.removeEventListener("scroll", updatePosition);
    };
  }, []);

  return scrollPosition;
};
