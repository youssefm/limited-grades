import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";

import DarkModeInitializer from "components/common/DarkModeInitializer";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
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
