import Head from "next/head";
import { FC } from "react";

import { DarkModeProvider } from "hooks/useDarkMode";

const Layout: FC = ({ children }) => (
  <>
    <Head>
      <title>Limited Grades</title>
      <meta
        name="description"
        content="Visualize MTG draft win rates as a tier list, powered by 17Lands data"
      />
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
      <link
        rel="preload"
        href="/_next/static/media/Beleren2016SmallCaps-Bold.012bd2dd.woff"
        as="font"
        type="font/woff2"
      />
    </Head>

    <DarkModeProvider>{children}</DarkModeProvider>
  </>
);

export default Layout;
