const TIMEOUT_MS = 250;

export function throttle(callback: (...args: Array<unknown>) => unknown) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return () => {
    if (timeoutId) {
      return;
    }

    timeoutId = setTimeout(() => {
      callback();
    }, TIMEOUT_MS);
  };
}
