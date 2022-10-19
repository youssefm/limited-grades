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
    const fetchData = async () => {
      const fetchedData = await fetchJson<TData>(url);
      setData(fetchedData);
    };

    setIsLoading(true);
    fetchData()
      .catch((e) => setError(e))
      .finally(() => setIsLoading(false));
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
