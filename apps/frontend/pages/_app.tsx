import Head from 'next/head';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactElement, ReactNode, useRef, useState } from 'react';

import '../src/styles/globals.css';
import { Provider } from 'react-redux';
import store from '../src/store/configStore';
import SkeletonContext from '../src/context/SkeletonContext';
import { SkeletonAnimation } from '../src/types';

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const skeletonAnimationRef = useRef<SkeletonAnimation>('wave');

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            cacheTime: 1000 * 60 * 1,
          },
        },
      })
  );

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <title>سایت آموزشی ZeenZen</title>
      </Head>

      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Provider store={store}>
            <SkeletonContext.Provider
              value={{ animation: skeletonAnimationRef.current }}
            >
              {getLayout(<Component {...pageProps} />)}
            </SkeletonContext.Provider>
          </Provider>

          <ReactQueryDevtools initialIsOpen={false} />
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
