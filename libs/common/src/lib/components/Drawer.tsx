import { Variant } from 'framer-motion';
import React, { useEffect, useMemo } from 'react';
import { m as motion } from 'framer-motion';

interface DrawerProps {
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  show: boolean;
  className?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  children,
  show,
  className,
  position = 'left',
}) => {
  const getDynamicClassName = useMemo(() => {
    switch (position) {
      case 'top':
        return 'left-0 right-0 top-0 min-h-[10rem]';
      case 'bottom':
        return 'left-0 right-0 bottom-0 min-h-[10rem]';
      case 'left':
        return 'top-0 bottom-0 left-0 min-w-[10rem] -translate-y-full';
      case 'right':
        return 'top-0 bottom-0 right-0 min-w-[10rem]';
    }
  }, [position]);

  const getVariants = useMemo<{ show: Variant; hide: Variant }>(() => {
    switch (position) {
      case 'top':
        return {
          show: {
            y: 0,
            position: 'fixed',
          },
          hide: {
            y: '-105%',
            position: 'fixed',
          },
        };

      case 'bottom':
        return {
          show: {
            y: 0,
            position: 'fixed',
          },
          hide: {
            y: '105%',
            position: 'fixed',
          },
        };

      case 'left':
        return {
          show: {
            x: 0,
            position: 'fixed',
          },
          hide: {
            x: '-105%',
            position: 'fixed',
          },
        };

      case 'right':
        return {
          show: {
            x: 0,
            position: 'fixed',
          },
          hide: {
            x: '105%',
            position: 'fixed',
          },
        };
    }
  }, [position]);

  useEffect(() => {
    if (show) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [show]);

  return (
    <motion.div
      variants={getVariants}
      animate={show ? 'show' : 'hide'}
      className={`${getDynamicClassName} shadow-lg bg-white shadow-gray-300/75 ${className}`}
    >
      {children}
    </motion.div>
  );
};
