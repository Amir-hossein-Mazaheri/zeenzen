import { useCallback, useEffect, useMemo, useState } from 'react';

import { promiseWithTimeout } from '../utils';

interface UseIsUserOnlineOptions {
  timeout?: number;
  pollingInterval?: number;
}

export function useIsUserOnline({
  timeout,
  pollingInterval,
}: UseIsUserOnlineOptions = {}) {
  const controller = useMemo(() => new AbortController(), []);

  const [isUserOnline, setIsUserOnline] = useState(true);

  const getStatus = useCallback(async () => {
    if (!navigator.onLine) return false;

    try {
      await promiseWithTimeout(
        timeout ?? 3000,
        fetch('/api/test', {
          method: 'GET',
          signal: controller.signal,
        })
      );

      return true;
    } catch (err) {
      controller.abort();
    }

    return false;
  }, [controller, timeout]);

  useEffect(() => {
    window.addEventListener('offline', () => setIsUserOnline(false));
    window.addEventListener('online', () => setIsUserOnline(true));

    const interval = setInterval(() => {
      (async () => {
        setIsUserOnline(await getStatus());
      })();
    }, pollingInterval ?? 3000);

    return () => {
      window.removeEventListener('offline', () => setIsUserOnline(false));
      window.removeEventListener('online', () => setIsUserOnline(true));

      clearInterval(interval);
    };
  }, [getStatus, pollingInterval]);

  return isUserOnline;
}
