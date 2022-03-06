import "@saeris/typeface-beleren-bold";
import "keyrune/css/keyrune.min.css";
import "mana-font/css/mana.min.css";
import { AppProps } from "next/dist/shared/lib/router/router";
import Script from "next/script";
import React from "react";
import "tippy.js/dist/tippy.css";

import Layout from "components/common/Layout";
import "styles/global.css";

const UMAMI_SITE_ID = process.env.NEXT_PUBLIC_UMAMI_SITE_ID;

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
