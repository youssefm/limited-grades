import Head from "next/head";
import { FC } from "react";
import { config, dom } from "@fortawesome/fontawesome-svg-core";

config.autoAddCss = false;

const Layout: FC = ({ children }) => {
  return (
    <>
      <Head>
        <title>17Lands Tier List</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css"
          integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU"
          crossOrigin="anonymous"
        />
        <style>{dom.css()}</style>
      </Head>

      <main>{children}</main>
    </>
  );
};

export default Layout;
