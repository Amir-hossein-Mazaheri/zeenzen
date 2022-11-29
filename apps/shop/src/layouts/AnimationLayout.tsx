import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

interface AnimationLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const AnimationLayout: React.FC<AnimationLayoutProps> = ({
  children,
  className,
}) => {
  const { asPath } = useRouter();

  return (
    <motion.div
      key={asPath}
      className={className}
      initial={{
        x: -100,
        opacity: 0,
      }}
      animate={{
        x: 0,
        opacity: 1,
      }}
      exit={{
        x: 100,
        opacity: 0,
      }}
      transition={{
        ease: 'linear',
        duration: 0.3,
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimationLayout;
