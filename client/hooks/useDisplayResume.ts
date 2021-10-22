import * as React from "react";
import { useRouter } from "next/router";

const ARROW_DOWN = "ArrowDown";
const ARROW_LEFT = "ArrowLeft";
const ARROW_RIGHT = "ArrowRight";
const ARROW_UP = "ArrowUp";
const KEY_A = "KeyA";
const KEY_B = "KeyB";
const ENTER = "Enter";

const CORRECT_KEY_COMBINATION = [
  ARROW_UP,
  ARROW_UP,
  ARROW_DOWN,
  ARROW_DOWN,
  ARROW_LEFT,
  ARROW_RIGHT,
  ARROW_LEFT,
  ARROW_RIGHT,
  KEY_B,
  KEY_A,
  ENTER,
];

const TIMEOUT_TIME_MS = 3000;

export function useDisplayResume() {
  const router = useRouter();

  const [nextIndex, setNextIndex] = React.useState(0);
  const [isActive, setIsActive] = React.useState(false);

  React.useEffect(() => {
    let timeoutId: number = 0;

    if (typeof window !== "undefined" && isActive) {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(function clearInputs() {
        setNextIndex(0);
        setIsActive(false);
      }, TIMEOUT_TIME_MS);
    } else {
      clearTimeout(timeoutId);
    }
  }, [isActive, nextIndex]);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      function handleKeydown(event: KeyboardEvent) {
        const key = event.code;

        if (
          key === CORRECT_KEY_COMBINATION[nextIndex] &&
          nextIndex === CORRECT_KEY_COMBINATION.length - 1
        ) {
          router.push("/resume");
        } else if (key === CORRECT_KEY_COMBINATION[nextIndex]) {
          setNextIndex(nextIndex + 1);
          setIsActive(true);
        } else {
          setNextIndex(0);
          setIsActive(false);
        }
      }

      window.addEventListener("keydown", handleKeydown);

      return () => window.removeEventListener("keydown", handleKeydown);
    }
  }, []);
}
