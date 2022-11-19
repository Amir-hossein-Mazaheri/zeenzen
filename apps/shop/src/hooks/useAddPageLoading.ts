import { useEffect } from 'react';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';

import useUiStore from '../store/useUiStore';

NProgress.configure({
  speed: 500,
  showSpinner: true,
  easing: 'ease-in-out',
});

export default function useAddPageLoading() {
  const { setPageLoading, isPageLoading } = useUiStore(
    ({ setPageLoading, isPageLoading }) => ({ setPageLoading, isPageLoading })
  );

  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setPageLoading(true);
      NProgress.start();
    });

    router.events.on('routeChangeComplete', () => {
      setPageLoading(false);
      NProgress.done();
    });

    router.events.on('routeChangeError', () => {
      setPageLoading(false);
      NProgress.done();
    });
  }, [router, setPageLoading]);

  return isPageLoading;
}
