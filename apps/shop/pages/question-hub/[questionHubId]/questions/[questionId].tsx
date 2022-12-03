import React from 'react';

import { NextPageWithLayout } from 'apps/shop/pages/_app';
import ShopLayout from 'apps/shop/src/layouts/ShopLayout';

const SingleQuestionHubQuestionPage: NextPageWithLayout = () => {
  return <div>SingleQuestionHubQuestionPage</div>;
};

SingleQuestionHubQuestionPage.getLayout = function getLayout(page) {
  return <ShopLayout>{page}</ShopLayout>;
};

export default SingleQuestionHubQuestionPage;
