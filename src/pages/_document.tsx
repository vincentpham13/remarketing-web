import React from 'react';
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `window.fbAsyncInit = function() {
              FB.init({
                appId            : '1263314497389233',
                autoLogAppEvents : true,
                xfbml            : true,
                version          : 'v9.0'
              });
            };`,
          }}
        />
        <script async defer crossOrigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js"></script>
        <Head></Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
