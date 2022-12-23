import { useCallback, useEffect, useRef } from "react";

import useForceUpdate from "./useForceUpdate";

const useDelayedLoading = (
  isLoaded: boolean,
  minDelay: number
): (() => boolean) => {
  const delayEndTime = useRef<number>();
  const forceUpdate = useForceUpdate();

  const isLoading = useCallback(() => {
    if (delayEndTime.current) {
      const shouldAppearLoaded = isLoaded && Date.now() >= delayEndTime.current;
      if (shouldAppearLoaded) {
        delayEndTime.current = undefined;
      }
      return !shouldAppearLoaded;
    }
    return !isLoaded;
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      if (delayEndTime.current) {
        const remainingTime = delayEndTime.current - Date.now();
        if (remainingTime > 0) {
          const timer = setTimeout(() => {
            forceUpdate();
          }, remainingTime);
          return () => clearTimeout(timer);
        }
        forceUpdate();
      }
    } else {
      delayEndTime.current = Date.now() + minDelay;
    }
    return undefined;
  }, [isLoaded, forceUpdate, minDelay]);

  return isLoading;
};

export default useDelayedLoading;
