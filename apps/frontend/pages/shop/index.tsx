import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { Course, CourseLevel, usePaginatedCoursesQuery } from '@zeenzen/data';
import {
  graphqlClient,
  Loadable,
  Pagination,
  Types,
  parseSelectValue,
} from '@zeenzen/common';

import FilterList from '../../src/common/FilterList';
import CourseSidebar from '../../src/components/shop/CourseSidebar';
import { CategoryFilter, ID, LevelFilter } from '../../src/types';
import { NextPageWithLayout } from '../_app';
import ShopLayout from '../../src/layouts/ShopLayout';
import SidebarSkeleton from '../../src/common/Skeleton/SidebarSkeleton';
import useUiStore from '../../src/store/useUiStore';
import useFilterStore from '../../src/store/useFilterStore';

const Courses = dynamic(() => import('../../src/components/shop/Courses'));
const FilterBar = dynamic(() => import('../../src/components/shop/FilterBar'));

const ShopPage: NextPageWithLayout = () => {
  const [page, setPage] = useState(1);

  const {
    pushCategoryToFilters,
    pushLevelToFilters,
    popFromFilters,
    clearAllFilters,
    categories,
    levels,
  } = useFilterStore();

  const { data, isLoading } = usePaginatedCoursesQuery(
    graphqlClient,
    {
      paginatedCoursesFilterInput: {
        page,
        levels: levels.map(({ value }) => value),
        categories: categories.map(({ value }) => String(value)),
      },
    },
    { keepPreviousData: true }
  );

  const {
    sidebar,
    setShopSidebarTitle,
    setShopSidebarDescription,
    resetShopSidebar,
  } = useUiStore();

  const handleRemoveFilter = (filter: CategoryFilter | LevelFilter) => {
    popFromFilters(filter);
  };

  const handleClearAllFilters = () => {
    clearAllFilters();
  };

  const handleSidebarSetTitle = (courseId: ID) => {
    const course = data?.paginatedCourses.courses.find(
      (course: Course) => course.id === courseId
    );

    if (course && course.title && course.shortDescription) {
      setShopSidebarTitle(course.title);
      setShopSidebarDescription(course.shortDescription);
    }
  };

  const handleAddCategoryToFilter: Types.SelectOnChange = (value) => {
    const [categoryText, categoryValue] = parseSelectValue(String(value));

    pushCategoryToFilters({
      value: categoryValue,
      text: categoryText,
      type: 'category',
    });
  };

  const handleAddLevelToFilter: Types.SelectOnChange = (value) => {
    const [levelText, levelValue] = parseSelectValue(String(value));

    pushLevelToFilters({
      value: levelValue as CourseLevel,
      text: levelText,
      type: 'level',
    });
  };

  return (
    <div>
      <h1 className="font-extrabold text-4xl mb-12">دوره های فروشگاه</h1>

      <div>
        {/* part for search and top bar */}
        <div className="mb-20">
          <FilterBar
            courseLevelValue={levels.at(-1)?.value || ''}
            onCourseLevelChange={handleAddLevelToFilter}
            courseCategoryValue={categories?.at(-1)?.value || ''}
            onCourseCategoryChange={handleAddCategoryToFilter}
          />

          <div className="mt-10">
            <FilterList
              filters={[...levels, ...categories]}
              onEachFilterClose={handleRemoveFilter}
              onClearAllFilters={handleClearAllFilters}
            />
          </div>
        </div>

        {/*part for courses and filter section */}
        <div className="flex flex-wrap gap-10 w-full">
          <div className="md:basis-1/5 md:block hidden basis-full grow">
            <Loadable
              fragment
              center={false}
              isLoading={isLoading}
              skeleton={<SidebarSkeleton />}
            >
              <CourseSidebar
                title={sidebar.title}
                description={sidebar.description}
              />
            </Loadable>
          </div>

          <div className="md:basis-3/4 basis-full">
            <Courses
              courses={data?.paginatedCourses?.courses as Course[]}
              isFetching={isLoading}
              onEachCourseMouseEnter={handleSidebarSetTitle}
              onEachCourseMouseLeave={resetShopSidebar}
              gap="gap-8"
              isSm
            />

            {data?.paginatedCourses.totalPages &&
              data.paginatedCourses.totalPages > 1 && (
                <div className="mt-8 flex justify-center">
                  <Pagination
                    activePage={page}
                    pagesCount={data?.paginatedCourses.totalPages}
                    onClick={setPage}
                    onPrev={() => setPage((currPage) => currPage - 1)}
                    onNext={() => setPage((currPage) => currPage + 1)}
                    hasNext={data.paginatedCourses.hasNext}
                    hasPrev={data.paginatedCourses.hasPrev}
                  />
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

ShopPage.getLayout = function getLayout(page) {
  return <ShopLayout>{page}</ShopLayout>;
};

export default ShopPage;

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  const vars = {
    paginatedCoursesFilterInput: {
      page: 1,
      categories: [],
      levels: [],
    },
  };

  await queryClient.fetchQuery(
    usePaginatedCoursesQuery.getKey(vars),
    usePaginatedCoursesQuery.fetcher(graphqlClient, vars)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60 * 60 * 5,
  };
};
