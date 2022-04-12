import "@saeris/typeface-beleren-bold";
import { AppProps } from "next/dist/shared/lib/router/router";
import Script from "next/script";
import React from "react";
import "tippy.js/dist/tippy.css";

import Layout from "components/common/Layout";
import "global.css";
import { UMAMI_SITE_ID } from "lib/env";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    {UMAMI_SITE_ID && (
      <Script
        src="/u.js"
        data-website-id={UMAMI_SITE_ID}
        strategy="afterInteractive"
      />
    )}
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </>
);

export default MyApp;
