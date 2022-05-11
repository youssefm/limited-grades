import Router from "next/router";
import { useCallback, useEffect, useState } from "react";

const useUrlState = (
  key: string
): [string | undefined, (value: string | undefined) => void] => {
  const [internalValue, setInternalValue] = useState<string>();

  useEffect(() => {
    // Read directly from window.location because the Next.js router is not populated immediately
    const queryValue = new URLSearchParams(window.location.search).get(key);
    if (queryValue !== null) {
      setInternalValue(queryValue);
    }
  }, [key]);

  const setValue = useCallback(
    async (value: string | undefined) => {
      setInternalValue(value);

      const newQuery = { ...Router.query };
      if (value === undefined) {
        delete newQuery[key];
      } else {
        newQuery[key] = value;
      }
      await Router.replace(
        {
          pathname: Router.pathname,
          query: newQuery,
        },
        undefined,
        {
          shallow: true,
        }
      );
    },
    [key]
  );

  return [internalValue, setValue];
};

export default useUrlState;
