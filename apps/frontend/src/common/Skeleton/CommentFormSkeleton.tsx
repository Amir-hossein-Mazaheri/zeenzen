import { Skeleton } from "@mui/material";
import React, { useContext } from "react";
import SkeletonContext from "../../context/SkeletonContext";

const CommentFormSkeleton = () => {
  const { animation } = useContext(SkeletonContext);

  return (
    <div className="w-full -mt-12">
      <Skeleton
        animation={animation}
        width="100%"
        height={300}
        className="rounded-xl"
      />

      <div className="-mt-5 flex justify-end">
        <Skeleton
          animation={animation}
          width={150}
          height={50}
          className="rounded-xl"
        />
      </div>
    </div>
  );
};

export default CommentFormSkeleton;
