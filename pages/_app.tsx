import { AppProps } from "next/dist/shared/lib/router/router";
import { useRouter } from "next/router";
import Script from "next/script";
import React, { useEffect } from "react";

import Layout from "components/Layout";
import { GA_TRACKING_ID, GA_TRACKING_ENABLED, pageview } from "lib/gtag";

import "styles/global.css";
import "node_modules/keyrune/css/keyrune.min.css";
import "node_modules/mana-font/css/mana.min.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      {GA_TRACKING_ENABLED && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
        </>
      )}
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
