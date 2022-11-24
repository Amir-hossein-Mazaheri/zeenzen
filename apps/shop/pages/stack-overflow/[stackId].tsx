import React from 'react';

import ShopLayout from '../../src/layouts/ShopLayout';
import { NextPageWithLayout } from '../_app';

const SingleStackOverflowQuestion: NextPageWithLayout = () => {
  return <div>SingleStackOverflowQuestion</div>;
};

SingleStackOverflowQuestion.getLayout = function getLayout(page) {
  return <ShopLayout>{page}</ShopLayout>;
};

export default SingleStackOverflowQuestion;
