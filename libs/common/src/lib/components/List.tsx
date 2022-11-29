import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';

import AppButton from './AppButton';

interface ListProps {
  title: string;
  duration: number;
  onChange?: () => void;
  children?: React.ReactNode;
}

export const List: React.FC<ListProps> = ({
  title,
  duration,
  onChange,
  children,
}) => {
  return (
    <div className="rounded-lg border border-light-gray px-5 overflow-hidden">
      <div
        onClick={onChange}
        className="flex items-center justify-between py-2 cursor-pointer"
      >
        <div className="flex gap-1 items-center">
          <div>
            {/* <PlayArrowIcon fontSize="large" /> */}
            <FontAwesomeIcon icon={faPlay} />
          </div>

          <div>
            <p>{title}</p>
          </div>
        </div>

        <div className="flex gap-5 items-center">
          <div className="scale-[0.8]">
            <AppButton outline>
              <p className="flex items-center gap-1">
                {/* <WatchLaterIcon /> */}
                <FontAwesomeIcon icon={faClock} />
                <p className="mr-px">{duration}</p>
                <p>دقیقه</p>
              </p>
            </AppButton>
          </div>

          <div>
            {/* <KeyboardArrowDownIcon fontSize="medium" /> */}
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
        </div>
      </div>

      <div>
        <div className="py-8">{children}</div>
      </div>
    </div>
  );
};

export default List;
