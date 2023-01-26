import React, {
  ReactElement,
  ReactNode,
  useState,
  useLayoutEffect,
} from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AnimatePresence, LazyMotion, domAnimation } from 'framer-motion';
import { config } from '@fortawesome/fontawesome-svg-core';
import { BreadcrumbProvider, isServer } from '@zeenzen/common';
import '@fortawesome/fontawesome-svg-core/styles.css';
import 'react-loading-skeleton/dist/skeleton.css';

import '../src/styles/globals.css';
import '../src/styles/nprogress.css';
import useAddPageLoading from '../src/hooks/useAddPageLoading';
import useCartStore from '../src/store/useCartStore';
import BaseUrlProvider from 'libs/common/src/lib/components/BaseUrlProvider';

const OnlineStatus = dynamic(() => import('../src/common/OnlineStatus'), {
  ssr: false,
});

config.autoAddCss = false;

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

if (isServer()) {
  React.useLayoutEffect = () => ({});
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  useAddPageLoading();

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

  const loadCartItems = useCartStore((state) => state.loadCartItems);

  // loads cart items from localStorage
  useLayoutEffect(() => {
    loadCartItems();
  }, [loadCartItems]);

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <title>سایت آموزشی ZeenZen</title>
      </Head>

      <QueryClientProvider client={queryClient}>
        <BreadcrumbProvider>
          <Hydrate state={pageProps.dehydratedState}>
            <LazyMotion features={domAnimation}>
              <AnimatePresence initial={false} mode="sync">
                <BaseUrlProvider
                  baseUrl={process.env.NEXT_PUBLIC_BASE_URL ?? ''}
                >
                  {getLayout(<Component {...pageProps} />)}
                </BaseUrlProvider>

                <OnlineStatus />
              </AnimatePresence>
            </LazyMotion>

            <ReactQueryDevtools initialIsOpen={false} />
          </Hydrate>
        </BreadcrumbProvider>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
