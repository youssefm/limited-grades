import { AppProps } from "next/dist/shared/lib/router/router";
import React from "react";
import Layout from "../components/Layout";
import "../styles.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/keyrune/css/keyrune.min.css";
import "../node_modules/mana-font/css/mana.min.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
