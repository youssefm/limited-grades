import Head from "next/head";
import { FC } from "react";

import { DarkModeProvider } from "hooks/useDarkMode";

const Layout: FC = ({ children }) => (
  <>
    <Head>
      <title>Limited Grades</title>
      <meta
        name="description"
        content="Visualize MTG card win rates as a tier list, powered by 17Lands data"
      />
      <meta
        property="og:image"
        content="https://www.limitedgrades.com/android-chrome-512x512.png"
      />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="512" />
      <meta property="og:image:height" content="512" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="manifest.json" />
    </Head>

    <DarkModeProvider>{children}</DarkModeProvider>
  </>
);

export default Layout;
