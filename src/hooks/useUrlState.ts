import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

const useUrlState = (
  key: string
): [string | undefined, (value: string | undefined) => void] => {
  const [internalValue, setInternalValue] = useState<string>();
  const router = useRouter();

  useEffect(() => {
    const queryValue = router.query[key];
    let newValue;
    if (queryValue === undefined) {
      newValue = undefined;
    } else if (Array.isArray(queryValue)) {
      newValue = queryValue.join(",");
    } else {
      newValue = queryValue;
    }
    setInternalValue(newValue);
  }, [router.query, key]);

  const setValue = useCallback(
    async (value: string | undefined) => {
      const newQuery = { ...router.query };
      if (value === undefined) {
        delete newQuery[key];
      } else {
        newQuery[key] = value;
      }
      await router.replace(
        {
          pathname: router.pathname,
          query: newQuery,
        },
        undefined,
        {
          shallow: true,
        }
      );
    },
    [router, key]
  );

  return [internalValue, setValue];
};

export default useUrlState;
