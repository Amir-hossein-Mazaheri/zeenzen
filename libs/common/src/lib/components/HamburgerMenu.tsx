import React from 'react';
import { type Variants } from 'framer-motion';
import { m as motion } from 'framer-motion';

interface HamburgerMenuProps {
  onClick: () => void;
  show?: boolean;
  className?: string;
  color?: string;
}

const movingVariants: (negateRotate?: boolean) => Variants = (
  negateRotate
) => ({
  show: {
    rotate: negateRotate ? -45 : 45,
    transition: {
      type: 'spring',
      delay: 0.2,
      duration: 0.3,
      bounce: 0.3,
    },
  },
  hide: {
    rotate: 0,
    transition: {
      type: 'spring',
      duration: 0.3,
    },
  },
});

const middleVariants: Variants = {
  show: {
    opacity: 0,
    transition: {
      type: 'spring',
      duration: 0.2,
    },
  },
  hide: {
    opacity: 1,
    transition: {
      type: 'spring',
      delay: 0.3,
      duration: 0.2,
    },
  },
};

export const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
  onClick,
  className,
  show = false,
  color = 'bg-gray-700',
}) => {
  return (
    <div
      className={`flex flex-col gap-[0.38rem] cursor-pointer ${className}`}
      onClick={onClick}
    >
      <motion.div
        initial={false}
        variants={movingVariants()}
        animate={show ? 'show' : 'hide'}
        style={{ transformOrigin: '0% 0%' }}
        className={`rounded-full h-1 w-[1.85rem] ${color}`}
      />
      <motion.div
        initial={false}
        variants={middleVariants}
        animate={show ? 'show' : 'hide'}
        className={`rounded-full h-1 w-[1.85rem] ${color}`}
      />
      <motion.div
        initial={false}
        variants={movingVariants(true)}
        animate={show ? 'show' : 'hide'}
        style={{ transformOrigin: '0% 100%' }}
        className={`rounded-full h-1 w-[1.85rem] ${color}`}
      />
    </div>
  );
};
