import React from 'react';
import Skeleton from 'react-loading-skeleton';

const SidebarSkeleton = () => {
  return (
    <div className="max-w-md relative">
      <Skeleton className="mt-2 rounded-xl" width="100%" height={350} />
    </div>
  );
};

export default SidebarSkeleton;
