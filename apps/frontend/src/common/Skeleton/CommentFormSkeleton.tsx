import React from 'react';
import Skeleton from 'react-loading-skeleton';

const CommentFormSkeleton = () => {
  return (
    <div className="w-full -mt-12">
      <Skeleton width="100%" height={300} className="rounded-xl" />

      <div className="-mt-5 flex justify-end">
        <Skeleton width={150} height={50} className="rounded-xl" />
      </div>
    </div>
  );
};

export default CommentFormSkeleton;
