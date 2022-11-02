import React, { useState } from "react";
import { animated, useSpring } from "react-spring";
import useMeasure from "react-use-measure";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import WatchLaterIcon from "@mui/icons-material/WatchLater";

import AppButton from "./AppButton";

interface ListProps {
  title: string;
  duration: number;
  onChange?: (height: number) => void;
  children?: React.ReactNode;
}

const List: React.FC<ListProps> = ({ title, duration, onChange, children }) => {
  const [ref, { height }] = useMeasure();
  const [autoHeight, setAutoHeight] = useState(0);
  const animationProps = useSpring({ height: autoHeight });

  const handleClick = () => {
    setAutoHeight((currHeight) => (currHeight === 0 ? height : 0));

    if (onChange) {
      onChange(autoHeight);
    }
  };

  return (
    <div className="rounded-lg border border-light-gray px-5 overflow-hidden">
      <div
        onClick={handleClick}
        className="flex items-center justify-between py-2 cursor-pointer"
      >
        <div className="flex gap-1 items-center">
          <div>
            <PlayArrowIcon fontSize="large" />
          </div>

          <div>
            <p>{title}</p>
          </div>
        </div>

        <div className="flex gap-5 items-center">
          <div className="scale-[0.8]">
            <AppButton outline>
              <p className="flex items-center gap-1">
                <WatchLaterIcon />
                <p className="mr-px">{duration}</p>
                <p>دقیقه</p>
              </p>
            </AppButton>
          </div>

          <div>
            <KeyboardArrowDownIcon fontSize="medium" />
          </div>
        </div>
      </div>

      <animated.div style={{ ...animationProps, overflow: "hidden" }}>
        <div className="py-8" ref={ref}>
          {children}
        </div>
      </animated.div>
    </div>
  );
};

export default List;
