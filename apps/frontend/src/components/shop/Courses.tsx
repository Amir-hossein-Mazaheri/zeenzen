import React from 'react';
import { Course } from '@zeenzen/data';
import { Loadable, ProductCard } from '@zeenzen/common';

import CourseSkeleton from '../../common/Skeleton/CourseSkeleton';
import { ID } from '../../types';

interface CoursesProps {
  courses?: Course[];
  isFetching: boolean;
  isSm?: boolean;
  gap?: string;
  onEachCourseMouseEnter?: (courseId: ID) => void;
  onEachCourseMouseLeave?: () => void;
}

const Courses: React.FC<CoursesProps> = ({
  courses,
  isFetching,
  onEachCourseMouseEnter,
  onEachCourseMouseLeave,
  isSm = false,
  gap = 'gap-12',
}) => {
  return (
    <div className={`grid grid-cols-3 ${gap}`}>
      <Loadable
        fragment
        isLoading={isFetching}
        skeleton={Array.of(1, 2, 3, 4, 5, 6).map((i) => (
          <CourseSkeleton key={i.toString()} />
        ))}
      >
        {courses?.map((course) => (
          <ProductCard
            key={course.id.toString()}
            onMouseEnter={() =>
              onEachCourseMouseEnter && onEachCourseMouseEnter(course.id)
            }
            onMouseLeave={() =>
              onEachCourseMouseLeave && onEachCourseMouseLeave()
            }
            size={isSm ? 'sm' : 'default'}
            {...course}
          />
        ))}
      </Loadable>
    </div>
  );
};

export default Courses;
