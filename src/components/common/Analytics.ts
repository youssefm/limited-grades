import { useRouter } from "next/router";
import { FC, useEffect } from "react";

import { trackView } from "lib/analytics";

const Analytics: FC = () => {
  const router = useRouter();

  useEffect(() => {
    const trackPageLoad = () => {
      if (document.readyState === "complete") {
        trackView();
      }
    };
    document.addEventListener("readystatechange", trackPageLoad);
    return () =>
      document.removeEventListener("readystatechange", trackPageLoad);
  }, []);

  useEffect(() => {
    const handleRouteChange = (
      url: string,
      { shallow }: { shallow: boolean }
    ) => {
      if (!shallow) {
        trackView(url);
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return null;
};

export default Analytics;
