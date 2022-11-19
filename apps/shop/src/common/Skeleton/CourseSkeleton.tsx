import React from 'react';
import Skeleton from 'react-loading-skeleton';

const CourseSkeleton: React.FC = () => {
  return (
    <div className="max-w-lg rounded-xl overflow-hidden">
      <Skeleton width="100%" height={250} />

      <div className="mt-5">
        <Skeleton height={35} />

        <div className="grid grid-cols-2 gap-x-5 gap-y-1 mt-3">
          <Skeleton height={30} />
          <Skeleton height={30} />
          <Skeleton height={30} />
          <Skeleton height={30} />
        </div>

        <div className="flex justify-between items-center mt-3">
          <Skeleton width="45%" height={30} />
          <Skeleton width="45%" height={30} />
        </div>
      </div>
    </div>
  );
};

export default CourseSkeleton;
