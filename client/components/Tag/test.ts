const TIMEOUT_MS = 250;

function throttle(callback: (...args: unknown[]) => unknown) {
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

const handleThrottledLog = throttle(() => console.log("Hello World!"));

for (let i = 0; i < 1000; i++) {
  setTimeout(() => {
    handleThrottledLog();
  }, i);
}
