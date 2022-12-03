import React from 'react';

import { NextPageWithLayout } from '../../_app';
import ShopLayout from 'apps/shop/src/layouts/ShopLayout';

const SingleQuestionHubPage: NextPageWithLayout = () => {
  return <div>SingleQuestionHubPage</div>;
};

SingleQuestionHubPage.getLayout = function getLayout(page) {
  return <ShopLayout>{page}</ShopLayout>;
};

export default SingleQuestionHubPage;
