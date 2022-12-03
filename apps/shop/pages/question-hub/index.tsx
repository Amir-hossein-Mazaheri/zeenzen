import React from 'react';
import { Alert, AppButton, graphqlClient, Loadable } from '@zeenzen/common';
import { useQuestionHubsUserRelatedQuery } from '@zeenzen/data';
import { v4 } from 'uuid';

import { NextPageWithLayout } from '../_app';
import useProtectedRoute from 'apps/shop/src/hooks/useProtectedRoute';
import ShopLayout from 'apps/shop/src/layouts/ShopLayout';

const dummyData = [v4(), v4(), v4(), v4(), v4(), v4()].map((id) => ({
  id,
  course: {
    title: 'دوره پیشرفته React',
  },
}));

const colors = [
  'border-red-500',
  'border-green-500',
  'border-sky-500',
  'border-light-blue',
  'border-emerald-500',
];

const QuestionHubPage: NextPageWithLayout = () => {
  useProtectedRoute();

  const { data, isLoading, error } =
    useQuestionHubsUserRelatedQuery(graphqlClient);

  return (
    <Loadable isLoading={isLoading}>
      {true ||
      (data?.questionHubsRelated.length &&
        data.questionHubsRelated.length > 0) ? (
        <>
          <h1 className="font-extrabold text-3xl text-title-black mb-7">
            هاب های مختص شما 🙂
          </h1>

          <Alert color="info" className="mb-12" rounded>
            <span>
              توجه: این لیست هاب های شما با توجه به دوره هایی است که خریداری
              کرده اید
            </span>
          </Alert>

          <ul className="space-y-12">
            {dummyData.map(({ id, course: { title } }, index) => (
              <li
                key={id}
                className={`rounded-xl px-8 py-8 border ${
                  colors[index % 5]
                } relative`}
              >
                <p className="absolute border-emerald-500 font-extrabold text-[1.1rem] top-0 -translate-y-1/2 right-5 px-5 bg-white">
                  <span>هاب</span> <span>{index + 1}</span>
                </p>

                <p className="text-center font-bold text-lg text-text-black">
                  <span>{title}</span>
                </p>

                <div className="flex justify-end">
                  <AppButton
                    rounded
                    link
                    className="scale-75"
                    href={`/question-hub/${id}`}
                  >
                    <span>مشاهده سوالات هاب</span>
                  </AppButton>
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="font-bold text-2xl text-center mt-56">
          متاسفانه شما دسترسی به هیچ یک از هاب های ما رو ندارید ☹️
        </p>
      )}
    </Loadable>
  );
};

QuestionHubPage.getLayout = function getLayout(page) {
  return <ShopLayout>{page}</ShopLayout>;
};

export default QuestionHubPage;
