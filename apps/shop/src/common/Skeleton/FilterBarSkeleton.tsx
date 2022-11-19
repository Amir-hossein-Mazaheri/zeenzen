import React from 'react';
import Skeleton from 'react-loading-skeleton';

const FilterBarSkeleton = () => {
  return (
    <>
      <Skeleton width={300} height={50} className="rounded-full" />
      <Skeleton width={300} height={50} className="rounded-full" />
    </>
  );
};

export default FilterBarSkeleton;
