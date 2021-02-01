import React from 'react';
import ReactDOM from "react-dom";
import { AppProps } from 'next/app';
import Router from "next/router";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
// @ts-ignore
import * as Facebook from 'fb-sdk-wrapper';

import store from '@/redux/store';

import PageChange from "@/components/PageChange/PageChange";
import 'assets/plugins/nucleo/css/nucleo.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'assets/scss/nextjs-argon-dashboard.scss';

const persistor = persistStore(store);

Router.events.on("routeChangeStart", (url) => {
  console.log(`Loading: ${url}`);
  document.body.classList.add("body-page-transition");
  ReactDOM.render(
    <PageChange path={url} />,
    document.getElementById("page-transition")
  );
});
Router.events.on("routeChangeComplete", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});
Router.events.on("routeChangeError", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});

function MyApp({ Component, pageProps }: AppProps) {
  if (typeof window !== 'undefined') {
    Facebook.load().then(() => {
      Facebook.init({
        appId: '4087907114572119',
        autoLogAppEvents: true,
        cookie: true,
        xfbml: true,
        version: 'v9.0',
      });
    });
  }

  const getLayout = Component.getLayout || ((page) => page);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {getLayout(<Component {...pageProps} />)}
      </PersistGate>
    </Provider>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default MyApp;
