import "@saeris/typeface-beleren-bold";
import { AppProps } from "next/dist/shared/lib/router/router";
import Script from "next/script";
import React from "react";
import "tippy.js/dist/tippy.css";

import Layout from "components/common/Layout";
import "global.css";
import { IS_UMAMI_ENABLED, UMAMI_HOST_URL, UMAMI_SITE_ID } from "lib/analytics";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    {IS_UMAMI_ENABLED && (
      <Script
        src="/u.js"
        data-website-id={UMAMI_SITE_ID}
        data-host-url={UMAMI_HOST_URL}
        strategy="afterInteractive"
      />
    )}
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </>
);

export default MyApp;
