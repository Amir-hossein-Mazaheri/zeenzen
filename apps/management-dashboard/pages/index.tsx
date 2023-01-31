import React, { useState } from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { CourseCardProps, graphqlClient, Loadable } from '@zeenzen/common';
import { usePaginatedCoursesQuery } from '@zeenzen/data';

import ActionBar from '../src/common/ActionBar';
import Courses from '../src/components/courses/Courses';
import CoursesStatus from '../src/components/courses/CoursesStatus';
import DashboardLayout from '../src/layouts/DashboardLayout';
import { NextPageWithLayout } from './_app';

const HomePage: NextPageWithLayout = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = usePaginatedCoursesQuery(graphqlClient, {
    paginatedCoursesFilterInput: {
      page,
    },
  });

  return (
    <div>
      <ActionBar
        title="دوره های برگزار شده"
        actionName="ایجاد دوره"
        actionLink="/courses/create"
        actionIcon={faPlus}
      />

      <CoursesStatus
        className="mt-8"
        attended={15}
        inProgress={2}
        students={532}
      />

      <Loadable center isLoading={isLoading}>
        <Courses
          className="mt-14"
          courses={
            (data?.paginatedCourses?.courses as unknown as CourseCardProps[]) ??
            []
          }
        />
      </Loadable>
    </div>
  );
};

HomePage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default HomePage;
