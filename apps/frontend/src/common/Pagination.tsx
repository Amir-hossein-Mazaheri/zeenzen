import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import React, { memo, MouseEventHandler } from 'react';

interface PaginationProps {
  pages: number[];
  activePage: number;
  onClick?: (pageIndex: number, index: number) => void;
  onPrev?: MouseEventHandler<HTMLDivElement>;
  onNext?: MouseEventHandler<HTMLDivElement>;
}

const sharedClasses =
  'rounded-full shadow-md shadow-gray-200 transition-colors duration-200';
const activePageClasses = 'text-white bg-light-red';
const hoverPageClasses = 'hover:text-white hover:bg-light-red';

const Pagination: React.FC<PaginationProps> = ({
  pages,
  activePage,
  onClick,
  onPrev,
  onNext,
}) => {
  return (
    <div className="flex gap-8 items-center">
      <div
        onClick={onPrev}
        className={`${hoverPageClasses} ${sharedClasses} cursor-pointer w-12 h-12 flex items-center justify-center`}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </div>
      <div
        className={`${sharedClasses} overflow-hidden h-12 flex justify-between`}
      >
        {pages.map((page, index) => (
          <p
            onClick={() => onClick && onClick(page, index)}
            className={`${hoverPageClasses} ${
              index === activePage && activePageClasses
            } transition-colors duration-200 h-12 px-6 cursor-pointer flex justify-center text-center items-center ${
              index !== 0 && 'border-r border-gray-300'
            }`}
            key={page.toString()}
          >
            {page}
          </p>
        ))}
      </div>
      <div
        onClick={onNext}
        className={`${hoverPageClasses} ${sharedClasses} cursor-pointer w-12 h-12 flex items-center justify-center`}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </div>
    </div>
  );
};

export default memo(Pagination);
