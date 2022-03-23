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
      {/* NOTE: This depends on the current implementation of NextJS and may need
          to be revisited if NextJS changes the location of the font files it references
      */}
      <link
        rel="preload"
        href="/_next/static/media/Beleren2016SmallCaps-Bold.012bd2dd.woff"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/_next/static/media/keyrune.3c0d16c0.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/_next/static/media/mana.6d4e9ad8.woff"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
    </Head>

    <DarkModeProvider>{children}</DarkModeProvider>
  </>
);

export default Layout;
