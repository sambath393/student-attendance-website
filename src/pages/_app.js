import React from 'react';
import '@/styles/globals.scss';
import '@/types/globals';

export default function App({ Component, pageProps }) {
  const Layout = Component.Layout || React.Fragment;

  return (
    <Layout {...pageProps}>
      <Component {...pageProps} />
    </Layout>
  );
}
