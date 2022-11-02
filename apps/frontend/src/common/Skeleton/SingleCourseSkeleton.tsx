import { Skeleton } from "@mui/material";
import React, { useContext } from "react";

import SkeletonContext from "../../context/SkeletonContext";

const SingleCourseSkeleton = () => {
  const { animation } = useContext(SkeletonContext);

  return (
    <div className="w-full">
      <div className="relative">
        <Skeleton
          animation={animation}
          variant="rectangular"
          className="rounded-xl"
          width="100%"
          height={170}
        />

        <Skeleton
          animation={animation}
          variant="rectangular"
          className="rounded-xl absolute bottom-0 right-12 -mb-10"
          width={150}
          height={150}
        />
      </div>

      <div className="flex items-start gap-12 justify-between mt-28">
        <div className="space-y-6 basis-3/4">
          <Skeleton
            animation={animation}
            variant="rectangular"
            className="rounded-xl"
            width="100%"
            height={50}
          />

          <Skeleton
            animation={animation}
            variant="rectangular"
            className="rounded-xl"
            width="100%"
            height={700}
          />
        </div>

        <div className="basis-1/4 space-y-10">
          <Skeleton
            animation={animation}
            variant="rectangular"
            className="rounded-xl"
            width="100%"
            height={400}
          />

          <Skeleton
            animation={animation}
            variant="rectangular"
            className="rounded-xl"
            width="100%"
            height={200}
          />
        </div>
      </div>
    </div>
  );
};

export default SingleCourseSkeleton;
