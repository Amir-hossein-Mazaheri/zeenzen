import { Skeleton } from "@mui/material";
import React, { useContext } from "react";

import SkeletonContext from "../../context/SkeletonContext";

const SidebarSkeleton = () => {
  const { animation } = useContext(SkeletonContext);

  return (
    <div className="max-w-md relative">
      <Skeleton
        animation={animation}
        className="mt-2 rounded-xl"
        variant="rectangular"
        width="100%"
        height={350}
      />
    </div>
  );
};

export default SidebarSkeleton;
