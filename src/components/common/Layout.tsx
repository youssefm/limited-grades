import Head from "next/head";
import { FC } from "react";

import useDarkMode from "hooks/useDarkMode";

const Layout: FC = ({ children }) => {
  const [darkModeEnabled] = useDarkMode();
  return (
    <>
      <Head>
        <title>Limited Grades</title>
        <meta
          name="description"
          content="Visualize MTG draft win rates as a tier list, powered by 17Lands data"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="color-scheme"
          content={darkModeEnabled ? "dark" : "light"}
        />
        <meta name="theme-color" content="#171717" />
        <meta
          property="og:image"
          content="https://www.limitedgrades.com/og.png"
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
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
        <link rel="manifest" href="/manifest.json" />
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

      {children}
    </>
  );
};

export default Layout;
