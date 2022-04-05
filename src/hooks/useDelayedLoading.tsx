import { useCallback, useEffect, useRef } from "react";

import useForceUpdate from "./useForceUpdate";

const useDelayedLoading = (isLoaded: boolean, minDelay: number) => {
  const delayEndTime = useRef(Date.now());
  const forceUpdate = useForceUpdate();

  const isLoading = useCallback(
    () => !(isLoaded && Date.now() >= delayEndTime.current),
    [isLoaded]
  );

  useEffect(() => {
    if (isLoaded) {
      const remainingTime = delayEndTime.current - Date.now();
      if (remainingTime > 0) {
        const timer = setTimeout(() => {
          forceUpdate();
        }, remainingTime);
        return () => clearTimeout(timer);
      }
    } else {
      delayEndTime.current = Date.now() + minDelay;
    }
    return undefined;
  }, [isLoaded, forceUpdate, minDelay]);

  return isLoading;
};

export default useDelayedLoading;
