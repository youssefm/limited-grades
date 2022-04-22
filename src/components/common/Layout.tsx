import Head from "next/head";
import { FC, ReactNode } from "react";

import { DarkModeProvider } from "hooks/useDarkMode";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => (
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
      {/* Prefetch DNS information for Scryfall so first card image fetched loads faster */}
      <link rel="dns-prefetch" href="https://c1.scryfall.com" />
    </Head>

    <DarkModeProvider>{children}</DarkModeProvider>
  </>
);

export default Layout;
