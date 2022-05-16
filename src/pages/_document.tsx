import Document, { Head, Html, Main, NextScript } from "next/document";

import DarkModeInitializer from "components/common/DarkModeInitializer";
import HideBannerInitializer from "components/common/HideBannerInitializer";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className="scrollbar-gutter-stable">
        <Head />
        <body>
          <DarkModeInitializer />
          <HideBannerInitializer />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
