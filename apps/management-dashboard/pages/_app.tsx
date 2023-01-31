import { ReactElement, ReactNode, useState } from 'react';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { AnimatePresence } from 'framer-motion';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { BaseUrlProvider } from '@zeenzen/common';

import '../src/styles/globals.css';
import store from '../src/store/configStore';

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function ManagementDashboard({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            cacheTime: 1000 * 60,
          },
        },
      })
  );

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <title>Welcome to management-dashboard!</title>
      </Head>

      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <AnimatePresence mode="wait">
            <Provider store={store}>
              <BaseUrlProvider baseUrl={process.env.NEXT_PUBLIC_BASE_URL}>
                {getLayout(<Component {...pageProps} />)}
              </BaseUrlProvider>
            </Provider>
          </AnimatePresence>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

export default ManagementDashboard;
