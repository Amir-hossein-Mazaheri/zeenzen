import React from 'react';
import { GetServerSideProps } from 'next';

import { NextPageWithLayout } from 'apps/shop/pages/_app';
import ShopLayout from 'apps/shop/src/layouts/ShopLayout';

const QuestionHubQuestionsPage: NextPageWithLayout = () => {
  return <div>QuestionHubQuestionsPage</div>;
};

QuestionHubQuestionsPage.getLayout = function getLayout(page) {
  return <ShopLayout>{page}</ShopLayout>;
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
    redirect: '/question-hub',
  };
};

export default QuestionHubQuestionsPage;
