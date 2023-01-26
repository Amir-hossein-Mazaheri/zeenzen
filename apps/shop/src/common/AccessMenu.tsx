import React, { useState } from 'react';
import {
  faBars,
  faBug,
  faPercent,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { m as motion, type Variants } from 'framer-motion';

interface AccessMenuProps {
  sth?: string;
}

const menuVariants: Variants = {
  hidden: {
    clipPath: 'inset(93px 0 0 0 round 999px 999px 0 0)',
  },
  show: {},
};

const AccessMenu: React.FC<AccessMenuProps> = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => setIsOpen((isOpen) => !isOpen);

  return (
    <div className="fixed bottom-[3%] flex items-center px-16">
      <motion.div
        className={`rounded-full py-3 ${
          isOpen ? 'bg-light-red' : 'bg-light-blue'
        } text-white flex items-center flex-col w-12 transition-colors`}
        animate={isOpen ? 'show' : 'hidden'}
        variants={menuVariants}
      >
        <nav className="py-2 mb-4">
          <ul className="flex flex-col gap-4 items-center">
            <li tooltip-position="left" tooltip-content="گزارش باگ">
              <FontAwesomeIcon icon={faBug} />
            </li>
            <li>
              <FontAwesomeIcon icon={faPercent} />
            </li>
          </ul>
        </nav>

        <div onClick={handleToggle}>
          {isOpen ? (
            <FontAwesomeIcon icon={faXmark} size="lg" />
          ) : (
            <FontAwesomeIcon icon={faBars} size="lg" />
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AccessMenu;
