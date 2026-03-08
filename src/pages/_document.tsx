import Document, { Head, Html, Main, NextScript } from "next/document";

import DarkModeInitializer from "components/common/DarkModeInitializer";

class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en" className="scrollbar-gutter-stable">
        <Head />
        <body>
          <DarkModeInitializer />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
