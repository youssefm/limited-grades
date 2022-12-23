import Router from "next/router";
import { FC, useEffect } from "react";

import { trackView } from "lib/analytics";

const Analytics: FC = () => {
  useEffect(() => {
    const trackPageLoad = (): void => {
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
    ): void => {
      if (!shallow) {
        trackView(url);
      }
    };

    Router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      Router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  return null;
};

export default Analytics;
