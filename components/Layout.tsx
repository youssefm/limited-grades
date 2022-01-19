import Head from "next/head";
import { FC } from "react";

import TitleBar from "components/TitleBar";

const Layout: FC = ({ children }) => {
  return (
    <>
      <Head>
        <title>Limited Grades</title>
        <meta
          name="description"
          content="Visualize card win rates for Magic: The Gathering limited play, powered by 17lands data"
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
      </Head>

      <main>
        <TitleBar />
        {children}
      </main>
    </>
  );
};

export default Layout;
