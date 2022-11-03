import React from 'react';
import { CourseLevel, useCategoriesQuery } from '@zeenzen/data';
import { graphqlClient, SelectDropDown } from '@zeenzen/common';
// import { SelectChangeEvent } from "@mui/material/Select";
// import Skeleton from "@mui/material/Skeleton";

const animation = 'wave';

export type FilterEven = (event: any) => void;

interface FilterBarProps {
  courseLevelValue?: string;
  courseCategoryValue?: string;
  onCourseLevelChange?: FilterEven;
  onCourseCategoryChange?: FilterEven;
}

const FilterBar: React.FC<FilterBarProps> = ({
  courseLevelValue,
  courseCategoryValue,
  onCourseLevelChange,
  onCourseCategoryChange,
}) => {
  const { data, isFetching, error } = useCategoriesQuery(graphqlClient);

  console.log(data?.categories);

  return (
    <div className="relative flex justify-between items-center w-full">
      {isFetching ? (
        <>
          {/* <Skeleton
            variant="rectangular"
            animation={animation}
            width={300}
            height={50}
            className="rounded-full"
          />

          <Skeleton
            variant="rectangular"
            animation={animation}
            width={300}
            height={50}
            className="rounded-full"
          /> */}
        </>
      ) : (
        <>
          <SelectDropDown
            rounded
            items={
              data?.categories.map(({ id, label }) => ({
                text: label,
                value: id,
              })) || []
            }
            value={courseCategoryValue}
            onChange={onCourseCategoryChange}
            label="دسته بندی دوره ها"
            elementId="course-categories"
            minWidth={300}
          />

          <SelectDropDown
            rounded
            items={[
              {
                text: 'آسان',
                value: CourseLevel.Elementary,
              },
              {
                text: 'متوسط',
                value: CourseLevel.Intermediate,
              },
              {
                text: 'پیشرفته',
                value: CourseLevel.Advanced,
              },
              {
                text: 'همه سطوح',
                value: CourseLevel.Mixed,
              },
            ]}
            value={courseLevelValue}
            onChange={onCourseLevelChange}
            label="سطح دوره ها"
            elementId="course-levels"
            minWidth={300}
          />
        </>
      )}
    </div>
  );
};

export default FilterBar;
