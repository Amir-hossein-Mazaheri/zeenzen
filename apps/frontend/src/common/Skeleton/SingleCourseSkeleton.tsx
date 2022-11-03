import React from 'react';
import Skeleton from 'react-loading-skeleton';

const SingleCourseSkeleton = () => {
  return (
    <div className="w-full">
      <div className="relative">
        <Skeleton className="rounded-xl" width="100%" height={170} />

        <Skeleton
          className="rounded-xl absolute bottom-0 right-12 -mb-10"
          width={150}
          height={150}
        />
      </div>

      <div className="flex items-start gap-12 justify-between mt-28">
        <div className="space-y-6 basis-3/4">
          <Skeleton className="rounded-xl" width="100%" height={50} />

          <Skeleton className="rounded-xl" width="100%" height={700} />
        </div>

        <div className="basis-1/4 space-y-10">
          <Skeleton className="rounded-xl" width="100%" height={400} />

          <Skeleton className="rounded-xl" width="100%" height={200} />
        </div>
      </div>
    </div>
  );
};

export default SingleCourseSkeleton;
