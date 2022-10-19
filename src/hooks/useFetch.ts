import { useEffect, useState } from "react";

import { fetchJson } from "lib/util";

type UseFetch = {
  <TData, TError = unknown>(url: string): {
    data: TData | undefined;
    isLoading: boolean;
    error: TError | undefined;
  };
  <TData, TError = unknown>(url: string, initialData: TData): {
    data: TData;
    isLoading: boolean;
    error: TError | undefined;
  };
};

const useFetch: UseFetch = <TData, TError = unknown>(
  url: string,
  initialData?: TData
) => {
  const [data, setData] = useState<TData | undefined>(initialData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<TError>();

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      const fetchedData = await fetchJson<TData>(url, {
        signal: abortController.signal,
      });
      setData(fetchedData);
    };

    setIsLoading(true);
    fetchData()
      .catch((e) => {
        if (!abortController.signal.aborted) {
          setError(e);
        }
      })
      .finally(() => setIsLoading(false));

    return () => {
      abortController.abort();
    };
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
