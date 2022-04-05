import { useCallback, useEffect, useRef } from "react";

import useForceUpdate from "./useForceUpdate";

const useDelayedLoading = (isLoaded: boolean, minDelay: number) => {
  const delayEndTime = useRef(Date.now());
  const forceUpdate = useForceUpdate();

  const isLoading = useCallback(
    () => !(isLoaded && Date.now() >= delayEndTime.current),
    [isLoaded]
  );

  const start = useCallback(() => {
    delayEndTime.current = Date.now() + minDelay;
  }, [minDelay]);

  useEffect(() => {
    if (isLoaded) {
      const remainingTime = delayEndTime.current - Date.now();
      if (remainingTime > 0) {
        const timer = setTimeout(() => {
          forceUpdate();
        }, remainingTime);
        return () => clearTimeout(timer);
      }
    }
    return undefined;
  }, [isLoaded, forceUpdate]);

  return { isLoading, start };
};

export default useDelayedLoading;
