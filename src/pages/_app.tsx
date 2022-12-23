import "@saeris/typeface-beleren-bold";
import { AppProps } from "next/dist/shared/lib/router/router";
import Script from "next/script";
import "tippy.js/dist/tippy.css";

import Analytics from "components/common/Analytics";
import Layout from "components/common/Layout";
import "global.css";
import { DarkModeProvider } from "hooks/useDarkMode";
import { IS_UMAMI_ENABLED, UMAMI_HOST_URL, UMAMI_SITE_ID } from "lib/analytics";

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => (
  <>
    {IS_UMAMI_ENABLED && (
      <Script
        src="/u.js"
        data-website-id={UMAMI_SITE_ID}
        data-host-url={UMAMI_HOST_URL}
        data-auto-track="false"
        strategy="afterInteractive"
      />
    )}
    <DarkModeProvider>
      <Layout>
        {IS_UMAMI_ENABLED && <Analytics />}
        <Component {...pageProps} />
      </Layout>
    </DarkModeProvider>
  </>
);

export default MyApp;
