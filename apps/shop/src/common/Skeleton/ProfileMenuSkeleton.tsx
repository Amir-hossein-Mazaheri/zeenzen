import React from 'react';
import Skeleton from 'react-loading-skeleton';

const ProfileMenuSkeleton = () => {
  return (
    <div className="flex items-center gap-2">
      <Skeleton circle width={48} height={48} />

      <Skeleton className="rounded-md" height={30} width={150} />
    </div>
  );
};

export default ProfileMenuSkeleton;
