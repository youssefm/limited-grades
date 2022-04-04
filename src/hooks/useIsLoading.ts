import { useCallback, useEffect, useRef, useState } from "react";

import useTimeout from "./useTimeout";

const useIsLoading = (
  minDelay: number,
  initialValue: boolean = false
): [boolean, () => void, () => void] => {
  const [isLoading, setIsLoading] = useState(initialValue);
  const isMarkedAsLoaded = useRef(false);
  const isMinDelayElapsed = useRef(false);

  const timeout = useTimeout(() => {
    isMinDelayElapsed.current = true;
    if (isMarkedAsLoaded.current) {
      setIsLoading(false);
    }
  }, minDelay);

  useEffect(() => {
    if (isLoading) {
      timeout.start();
    }
  }, [isLoading, timeout]);

  const markAsLoading = useCallback(() => {
    isMarkedAsLoaded.current = false;
    isMinDelayElapsed.current = false;
    setIsLoading(true);
  }, []);

  const markAsLoaded = useCallback(() => {
    isMarkedAsLoaded.current = true;
    if (isMinDelayElapsed.current) {
      setIsLoading(false);
    }
  }, []);

  return [isLoading, markAsLoading, markAsLoaded];
};

export default useIsLoading;
