import React from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Tab } from '@headlessui/react';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { CourseLevel, Instructor, useCourseQuery } from '@zeenzen/data';
import { graphqlClient, Loadable } from '@zeenzen/common';

import SingleCourseSkeleton from '../../../src/common/Skeleton/SingleCourseSkeleton';
import ContentTab from '../../../src/components/single-course/ContentTab';
import Hero from '../../../src/components/single-course/Hero';
import PreRequirementsTab from '../../../src/components/single-course/PreRequirementsTab';
import Sidebar from '../../../src/components/single-course/Sidebar';
import TabsList from '../../../src/components/single-course/TabsList';
import ShopLayout from '../../../src/layouts/ShopLayout';
import { NextPageWithLayout } from '../../_app';
import addToTitle from '../../../src/utils/addToTitle';

const tabs = ['توضیحات دوره', 'پیشنیاز های دوره', 'محتویات و سرفصل ها'];

const SingleCoursePage: NextPageWithLayout = () => {
  const { query } = useRouter();

  const { data: courseData, isLoading } = useCourseQuery(graphqlClient, {
    courseId: Number(query?.courseId),
  });

  return (
    <>
      <Head>
        <title>{addToTitle(courseData?.course.title || '')}</title>
      </Head>

      <Loadable
        center={false}
        isLoading={isLoading}
        skeleton={<SingleCourseSkeleton />}
      >
        <Hero
          image={courseData?.course?.image?.image || ''}
          coverImage={courseData?.course?.image?.coverImage || ''}
          title={courseData?.course.title || ''}
          shortDescription={courseData?.course.shortDescription || ''}
        />

        <div className="mt-28 flex items-start gap-12 justify-between">
          <div className="basis-3/4">
            <Tab.Group>
              <TabsList tabs={tabs} />

              <Tab.Panels className="mt-16">
                <ContentTab
                  title={tabs[0]}
                  content={courseData?.course.description || ''}
                  courseId={courseData?.course.id || ''}
                />
                <PreRequirementsTab
                  title={tabs[1]}
                  courseId={courseData?.course.id || ''}
                  description={
                    courseData?.course.preRequirementsDescription || ''
                  }
                />
              </Tab.Panels>
            </Tab.Group>
          </div>
          <div className="basis-1/4">
            <Sidebar
              id={query?.courseId?.toString() || ''}
              hoursCount={courseData?.course.hoursCount || 0}
              lecturesCount={courseData?.course.lecturesCount || 0}
              level={courseData?.course.level || CourseLevel.Elementary}
              participantsCount={courseData?.course.participantsCount || 0}
              progress={courseData?.course.progress || 0}
              price={courseData?.course.price || 0}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              instructors={
                courseData?.course.instructors || ([] as Instructor[])
              }
            />
          </div>
        </div>
      </Loadable>
    </>
  );
};

SingleCoursePage.getLayout = function getLayout(page) {
  return <ShopLayout compact>{page}</ShopLayout>;
};

export default SingleCoursePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;

  const courseId = Number(params?.courseId);

  try {
    const queryClient = new QueryClient();

    await queryClient.fetchQuery(
      useCourseQuery.getKey({ courseId }),
      useCourseQuery.fetcher(graphqlClient, {
        courseId,
      })
    );

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
};
