import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { Course, CourseLevel, usePaginatedCoursesQuery } from '@zeenzen/data';
import { graphqlClient, Loadable } from '@zeenzen/common';

import FilterList from '../../src/common/FilterList';
import CourseSidebar from '../../src/components/shop/CourseSidebar';
import { useAppSelector } from '../../src/hooks/useAppSelector';
import {
  RESET_SHOP_SIDEBAR,
  selectShopSidebarDescription,
  selectShopSidebarTitle,
  SET_SHOP_SIDEBAR_DESCRIPTION,
  SET_SHOP_SIDEBAR_TITLE,
} from '../../src/store/ui/shop';
import {
  CLEAR_ALL_FILTERS,
  POP_FROM_FILTERS,
  PUSH_CATEGORY_TO_FILTERS,
  PUSH_LEVEL_TO_FILTERS,
  selectFilters,
} from '../../src/store/entities/filter';
import { useAppDispatch } from '../../src/hooks/useAppDispatch';
import { ID } from '../../src/types';
import { NextPageWithLayout } from '../_app';
import ShopLayout from '../../src/layouts/ShopLayout';
import SidebarSkeleton from '../../src/common/Skeleton/SidebarSkeleton';
import { FilterEven } from '../../src/components/shop/FilterBar';
import { parseSelectValue } from '../../src/utils/parseSelectValue';

const Courses = dynamic(() => import('../../src/components/shop/Courses'));
const FilterBar = dynamic(() => import('../../src/components/shop/FilterBar'));

const ShopPage: NextPageWithLayout = () => {
  const [page, setPage] = useState(1);
  const { categories, levels } = useAppSelector(selectFilters);

  const { data, isLoading, isFetching } = usePaginatedCoursesQuery(
    graphqlClient,
    {
      paginatedCoursesFilterInput: {
        page,
        levels: levels.map(({ value }) => value),
        categories: categories.map(({ value }) => value),
      },
    },
    { keepPreviousData: true }
  );

  console.log('shop page data: ', data);

  const dispatch = useAppDispatch();

  const sidebarTitle = useAppSelector(selectShopSidebarTitle);
  const sidebarDescription = useAppSelector(selectShopSidebarDescription);

  const handleRemoveFilter = (filter: any) => {
    dispatch(POP_FROM_FILTERS({ element: filter }));
    console.log('element got removed: ', filter);
  };

  const handleClearAllFilters = () => {
    dispatch(CLEAR_ALL_FILTERS());
  };

  const handleSidebarSetTitle = (courseId: ID) => {
    const course = data?.paginatedCourses.courses.find(
      (course: any) => course.id === courseId
    );

    if (course && course.title && course.shortDescription) {
      dispatch(SET_SHOP_SIDEBAR_TITLE({ title: course.title }));
      dispatch(
        SET_SHOP_SIDEBAR_DESCRIPTION({ description: course.shortDescription })
      );
    }
  };

  const handleAddCategoryToFilter: FilterEven = (event) => {
    const [categoryText, categoryValue] = parseSelectValue(
      String(event.target.value)
    );

    dispatch(
      PUSH_CATEGORY_TO_FILTERS({
        element: {
          value: categoryValue,
          text: categoryText,
          type: 'category',
        },
      })
    );
  };

  const handleAddLevelToFilter: FilterEven = (event) => {
    console.log(event.target);

    const [levelText, levelValue] = parseSelectValue(
      String(event.target.value)
    );

    dispatch(
      PUSH_LEVEL_TO_FILTERS({
        element: {
          value: levelValue as CourseLevel,
          text: levelText,
          type: 'level',
        },
      })
    );
  };

  return (
    <div>
      <h1 className="font-extrabold text-4xl mb-12">دوره های فروشگاه</h1>

      <div>
        {/* part for search and top bar */}
        <div className="mb-20">
          <FilterBar
            courseLevelValue={levels.at(-1)?.value}
            onCourseLevelChange={handleAddLevelToFilter}
            courseCategoryValue={categories?.at(-1)?.value}
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
                title={sidebarTitle}
                description={sidebarDescription}
              />
            </Loadable>
          </div>

          <div className="md:basis-3/4 basis-full">
            <Courses
              courses={data?.paginatedCourses?.courses as Course[]}
              isFetching={isLoading}
              onEachCourseMouseEnter={handleSidebarSetTitle}
              onEachCourseMouseLeave={() => dispatch(RESET_SHOP_SIDEBAR())}
              gap="gap-8"
              isSm
            />
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
