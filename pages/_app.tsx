import "@saeris/typeface-beleren-bold";
import "keyrune/css/keyrune.min.css";
import "mana-font/css/mana.min.css";
import { AppProps } from "next/dist/shared/lib/router/router";
import { useRouter } from "next/router";
import Script from "next/script";
import React, { useEffect } from "react";
import "tippy.js/dist/tippy.css";

import Layout from "components/common/Layout";
import { GA_TRACKING_ENABLED, GA_TRACKING_ID, pageview } from "lib/gtag";
import "styles/global.css";

const UMAMI_SITE_ID = process.env.NEXT_PUBLIC_UMAMI_SITE_ID;

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  useEffect(() => {
    router.events.on("routeChangeComplete", pageview);
    return () => {
      router.events.off("routeChangeComplete", pageview);
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
              __html: `function gtag(){dataLayer.push(arguments)}window.dataLayer=window.dataLayer||[],gtag("js",new Date),gtag("config","${GA_TRACKING_ID}",{page_path:window.location.pathname});`,
            }}
          />
        </>
      )}
      {UMAMI_SITE_ID && (
        <Script
          strategy="afterInteractive"
          src="https://umami-bay-alpha.vercel.app/umami.js"
          data-website-id={UMAMI_SITE_ID}
        />
      )}
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
};

export default MyApp;
