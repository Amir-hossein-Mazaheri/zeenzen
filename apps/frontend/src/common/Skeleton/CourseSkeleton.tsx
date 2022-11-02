import { Skeleton } from "@mui/material";
import React from "react";

const animation = "wave";

const CourseSkeleton: React.FC = () => {
  return (
    <div className="max-w-lg rounded-xl overflow-hidden">
      <Skeleton
        animation={animation}
        variant="rectangular"
        width="100%"
        height={250}
      />

      <div className="mt-5">
        <Skeleton animation={animation} variant="text" height={35} />

        <div className="grid grid-cols-2 gap-x-5 gap-y-1 mt-3">
          <Skeleton animation={animation} variant="text" height={30} />
          <Skeleton animation={animation} variant="text" height={30} />
          <Skeleton animation={animation} variant="text" height={30} />
          <Skeleton animation={animation} variant="text" height={30} />
        </div>

        <div className="flex justify-between items-center mt-3">
          <Skeleton
            animation={animation}
            variant="text"
            width="45%"
            height={30}
          />
          <Skeleton
            animation={animation}
            variant="text"
            width="45%"
            height={30}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseSkeleton;
