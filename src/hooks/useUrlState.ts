import Router from "next/router";
import { useCallback, useEffect, useState } from "react";

import { extractUrlQuery } from "lib/util";

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

  useEffect(() => {
    const handleRouteChange = (
      url: string,
      { shallow }: { shallow: boolean }
    ) => {
      if (shallow) {
        return;
      }
      const newQueryValue = new URLSearchParams(extractUrlQuery(url)).get(key);
      setInternalValue(newQueryValue === null ? undefined : newQueryValue);
    };

    Router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      Router.events.off("routeChangeStart", handleRouteChange);
    };
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
        { shallow: true }
      );

      // NextJS mistakenly does not make a deep route change
      // when going back after a shallow replace
      // This tricks NextJS into correctly refetching the right data from the server
      // See: https://github.com/vercel/next.js/issues/34365
      const newOptions = window.history.state.options;
      delete newOptions.shallow;
      window.history.replaceState(
        { ...window.history.state, options: newOptions },
        "",
        window.location.href
      );
    },
    [key]
  );

  return [internalValue, setValue];
};

export default useUrlState;
