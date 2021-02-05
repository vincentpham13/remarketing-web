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
        <Head>
          {/* <!-- Load Facebook SDK for JavaScript --> */}
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `window.fbAsyncInit = function() {
                FB.init({
                  xfbml            : true,
                  version          : 'v9.0'
                });
              };
      
              (function(d, s, id) {
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) return;
              js = d.createElement(s); js.id = id;
              js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
              fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));`,
            }}
          />
          <script
            async
            defer
            crossOrigin="anonymous"
            src="https://connect.facebook.net/en_US/sdk.js"></script>
          {/* <!-- Load Facebook SDK for JavaScript --> */}
        </Head>
        <body>
          <div id="page-transition"></div>
          <div id="fb-root"></div>
          <Main />
          <NextScript />
          {/* <!-- Your Chat Plugin code --> */}
          <div
            class="fb-customerchat"
            attribution="setup_tool"
            page_id="103634791744953"
            logged_in_greeting="Bombot hân hạnh được phục vụ quý khách!"
            logged_out_greeting="Bombot hân hạnh được phục vụ quý khách!"></div>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
