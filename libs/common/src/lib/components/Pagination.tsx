import React, { memo, MouseEventHandler } from 'react';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { range } from '../utils';

interface PaginationProps {
  pagesCount: number;
  activePage: number;
  onClick?: (pageIndex: number) => void;
  onPrev?: MouseEventHandler<HTMLDivElement>;
  onNext?: MouseEventHandler<HTMLDivElement>;
  hasNext?: boolean;
  hasPrev?: boolean;
  className?: string;
}

const sharedClasses =
  'rounded-full shadow-md shadow-gray-200 transition-colors duration-200';
const activePageClasses = 'text-white bg-light-red';
const hoverPageClasses = 'hover:text-white hover:bg-light-red';

export const Pagination: React.FC<PaginationProps> = ({
  pagesCount,
  activePage,
  onClick,
  onPrev,
  onNext,
  className,
  hasPrev = false,
  hasNext = false,
}) => {
  return (
    <div className={`flex gap-8 items-center ${className}`}>
      {hasPrev && (
        <div
          onClick={onPrev}
          className={`${hoverPageClasses} ${sharedClasses} cursor-pointer w-12 h-12 flex items-center justify-center`}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      )}

      <div className={`gap-4 h-12 flex justify-between`}>
        {range(pagesCount, 1).map((page) => (
          <p
            onClick={() => onClick && onClick(page)}
            className={`${hoverPageClasses} ${
              page === activePage && activePageClasses
            } ${sharedClasses} transition-colors duration-200 aspect-square h-12 px-6 cursor-pointer flex justify-center text-center items-center`}
            key={page}
          >
            {page}
          </p>
        ))}
      </div>

      {hasNext && (
        <div
          onClick={onNext}
          className={`${hoverPageClasses} ${sharedClasses} cursor-pointer w-12 h-12 flex items-center justify-center`}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </div>
      )}
    </div>
  );
};

export default memo(Pagination);
