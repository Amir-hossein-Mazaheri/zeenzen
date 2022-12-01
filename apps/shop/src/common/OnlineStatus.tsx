import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClose,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { m as motion } from 'framer-motion';
import { useIsUserOnline } from '@zeenzen/common';

const OnlineStatus = () => {
  const [isOpen, setIsOpen] = useState(true);

  const isUserOnline = useIsUserOnline();

  if (isUserOnline) {
    return <></>;
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: '100%',
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: '100%',
      }}
      transition={{
        type: 'spring',
        duration: 0.4,
      }}
      className="fixed bottom-5 right-0 left-0 px-24 origin-right"
    >
      <motion.div
        // variants={variants}
        variants={{
          open: {},
          closed: {
            clipPath: 'inset(0 0 0 96.3% round 999px 0 0 999px)',
          },
        }}
        animate={isOpen ? 'open' : 'closed'}
        className="relative py-3 rounded-full bg-red-500 text-center text-white font-semibold"
      >
        {!isOpen && (
          <motion.div
            animate={{
              opacity: isOpen ? 0 : 1,
              transition: {
                type: 'spring',
                duration: 0.3,
              },
            }}
            onClick={() => setIsOpen(true)}
            className="absolute top-1/2 -translate-y-1/2 right-4 text-lg cursor-pointer"
          >
            <FontAwesomeIcon icon={faTriangleExclamation} />
          </motion.div>
        )}

        <span>متاسفانه اتصال شما به اینترنت قطع شده است</span>

        <div
          onClick={() => setIsOpen(false)}
          className="absolute top-1/2 -translate-y-1/2 left-5 leading-[0] p-1 text-sm flex items-center justify-center border border-white rounded-full cursor-pointer"
        >
          <FontAwesomeIcon icon={faClose} />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default OnlineStatus;
