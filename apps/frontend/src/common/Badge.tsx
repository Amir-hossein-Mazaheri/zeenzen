import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import React, { useCallback, useState } from 'react';
// import ClearIcon from '@mui/icons-material/Clear';
import { animated, useSpring } from 'react-spring';

interface BadgeProps {
  text: string;
  hasClose?: boolean;
  rounded?: boolean;
  onClose?: any;
  className?: string;
  px?: string;
}

const Badge: React.FC<BadgeProps> = ({
  text,
  hasClose,
  rounded = true,
  onClose,
  className,
  px = 'px-2',
}) => {
  const [close, setClose] = useState(false);
  const animationProps = useSpring({
    opacity: close ? 0 : 1,
    scale: close ? 0 : 1,
    position: close ? 'absolute' : 'static',
  });

  const handleClose = useCallback(
    (event: any) => {
      setClose((currClose) => !currClose);

      if (onClose) {
        onClose(event);
      }
    },
    [onClose, setClose]
  );

  return (
    <animated.div
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      style={animationProps}
      className={`${
        rounded ? 'rounded-full' : 'rounded-lg'
      } w-fit ${px} py-1 bg-light-blue/50 flex items-center justify-between gap-3 text-text-black ${className}`}
    >
      <p>{text}</p>

      {hasClose && (
        <div
          onClick={handleClose}
          className="flex items-center justify-center cursor-pointer rounded-full bg-white p-1 h-6 w-6"
        >
          {/* <ClearIcon fontSize="inherit" /> */}
          <FontAwesomeIcon icon={faXmark} />
        </div>
      )}
    </animated.div>
  );
};

export default Badge;
