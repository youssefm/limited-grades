import { useCallback, useEffect, useRef, useState } from "react";

const useIsLoading = (minDelay: number): [boolean, () => void, () => void] => {
  const [isLoading, setIsLoading] = useState(false);
  const isMarkedAsLoaded = useRef(false);
  const isMinDelayElapsed = useRef(false);

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        isMinDelayElapsed.current = true;
        if (isMarkedAsLoaded.current) {
          setIsLoading(false);
        }
      }, minDelay);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isLoading, minDelay]);

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
