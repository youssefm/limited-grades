import { useEffect, useMemo, useRef } from "react";

const useTimeout = (callback: () => void, ms: number) => {
  const timer = useRef<NodeJS.Timeout>();

  const handler = useMemo(
    () => ({
      start: () => {
        handler.stop();
        timer.current = setTimeout(callback, ms);
      },
      stop: () => {
        if (timer.current) {
          clearTimeout(timer.current);
        }
      },
    }),
    [callback, ms]
  );

  // Cleanup
  useEffect(
    () => () => {
      handler.stop();
    },
    [handler]
  );

  return handler;
};

export default useTimeout;
