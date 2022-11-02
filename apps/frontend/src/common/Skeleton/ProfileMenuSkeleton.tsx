import React, { useContext } from "react";
import { Skeleton } from "@mui/material";

import SkeletonContext from "../../context/SkeletonContext";

const ProfileMenuSkeleton = () => {
  const { animation } = useContext(SkeletonContext);

  return (
    <div className="flex items-center gap-2">
      <Skeleton
        animation={animation}
        variant="circular"
        width={48}
        height={48}
      />

      <Skeleton
        className="rounded-md"
        animation={animation}
        variant="text"
        height={30}
        width={150}
      />
    </div>
  );
};

export default ProfileMenuSkeleton;
