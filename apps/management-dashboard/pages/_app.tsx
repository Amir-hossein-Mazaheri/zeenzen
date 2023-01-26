import { AppProps } from 'next/app';
import Head from 'next/head';

import '../src/styles/globals.css';

function ManagementDashboard({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to management-dashboard!</title>
      </Head>

      <main className="app">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default ManagementDashboard;
