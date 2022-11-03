import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { usePaginatedCoursesQuery } from '@zeenzen/data';
import { graphqlClient } from '@zeenzen/common';

import Courses from '../src/components/landing-page/Courses';
import FAQ from '../src/components/landing-page/FAQ';
import Intro from '../src/components/landing-page/Intro';
import WhyUs from '../src/components/landing-page/WhyUs';
import ShopLayout from '../src/layouts/ShopLayout';
import { NextPageWithLayout } from './_app';

const HomePage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ courses }) => {
  return (
    <>
      <Intro />
      <WhyUs />
      <Courses courses={courses} />
      <FAQ />
    </>
  );
};

HomePage.getLayout = function getLayout(page) {
  return <ShopLayout>{page}</ShopLayout>;
};

export default HomePage;

export const getStaticProps: GetStaticProps = async () => {
  const paginatedCoursesData = await usePaginatedCoursesQuery.fetcher(
    graphqlClient,
    {
      paginatedCoursesFilterInput: {
        page: 1,
      },
    }
  )();

  return {
    props: {
      courses: paginatedCoursesData.paginatedCourses.courses,
    },
    revalidate: 1000 * 60 * 60 * 5,
  };
};
