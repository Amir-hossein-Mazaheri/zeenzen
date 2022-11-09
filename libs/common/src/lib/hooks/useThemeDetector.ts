import { useCallback, useEffect, useState } from 'react';

const getCurrentTheme = () =>
  window.matchMedia('(prefers-color-scheme: dark)').matches;

export default function useThemeDetector() {
  const [isDarkTheme, setIsDarkTheme] = useState(getCurrentTheme());

  const mqListener = useCallback((event: MediaQueryListEvent) => {
    setIsDarkTheme(event.matches);
  }, []);

  useEffect(() => {
    const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');

    darkThemeMq.addEventListener('change', mqListener);

    return () => darkThemeMq.addEventListener('change', mqListener);
  }, [mqListener]);

  return isDarkTheme;
}
