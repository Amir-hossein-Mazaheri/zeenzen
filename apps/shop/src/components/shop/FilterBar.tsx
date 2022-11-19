import React from 'react';
import { CourseLevel, useCategoriesQuery } from '@zeenzen/data';
import { graphqlClient, Loadable, Select, Types } from '@zeenzen/common';
import FilterBarSkeleton from '../../common/Skeleton/FilterBarSkeleton';

interface FilterBarProps {
  courseLevelValue: Types.SelectItem['value'];
  courseCategoryValue: Types.SelectItem['value'];
  onCourseLevelChange: Types.SelectOnChange;
  onCourseCategoryChange: Types.SelectOnChange;
}

const FilterBar: React.FC<FilterBarProps> = ({
  courseLevelValue,
  courseCategoryValue,
  onCourseLevelChange,
  onCourseCategoryChange,
}) => {
  const { data, isLoading } = useCategoriesQuery(graphqlClient);

  return (
    <div className="relative flex justify-between items-center w-full">
      <Loadable fragment isLoading={isLoading} skeleton={<FilterBarSkeleton />}>
        <Select
          title="دسته بندی دوره ها"
          items={
            data?.categories.map(({ id, label }) => ({
              id,
              text: label,
              value: id,
            })) || []
          }
          selectedValue={courseCategoryValue}
          onChange={onCourseCategoryChange}
          mixTextAndValue
        />

        <Select
          mixTextAndValue
          title="سطح دوره ها"
          items={[
            {
              id: '1',
              text: 'آسان',
              value: CourseLevel.Elementary,
            },
            {
              id: '2',
              text: 'متوسط',
              value: CourseLevel.Intermediate,
            },
            {
              id: '3',
              text: 'پیشرفته',
              value: CourseLevel.Advanced,
            },
            {
              id: '4',
              text: 'همه سطوح',
              value: CourseLevel.Mixed,
            },
          ]}
          selectedValue={courseLevelValue}
          onChange={onCourseLevelChange}
        />
      </Loadable>
    </div>
  );
};

export default FilterBar;
