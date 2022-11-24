import React, { MouseEventHandler, ReactNode, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import { AlertColor } from '../types';

export interface AlertProps {
  children: ReactNode;
  onClose?: MouseEventHandler<SVGSVGElement>;
  color: AlertColor;
  className?: string;
  rounded?: boolean;
}

export const Alert: React.FC<AlertProps> = ({
  color,
  onClose,
  className,
  rounded = false,
  children,
}) => {
  const style = useMemo(() => {
    switch (color) {
      case 'success':
        return 'text-green-700 bg-green-200';
      case 'error':
        return 'text-red-700 bg-red-200';
      case 'warn':
        return 'text-yellow-700 bg-yellow-100';
      case 'info':
        return 'text-sky-700 bg-sky-200';
    }
  }, [color]);

  return (
    <div
      className={`flex justify-between px-8 py-3 ${
        rounded ? 'rounded-full' : 'rounded-lg'
      } ${style} ${className}`}
    >
      {children}

      {onClose && (
        <FontAwesomeIcon
          icon={faXmark}
          size="lg"
          className="leading-none w-5 h-5 m-0 p-0 cursor-pointer"
          onClick={onClose}
        />
      )}
    </div>
  );
};

export default Alert;
