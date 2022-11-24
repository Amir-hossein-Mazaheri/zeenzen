import React from 'react';

import ShopLayout from '../../src/layouts/ShopLayout';
import { NextPageWithLayout } from '../_app';

const StackOverflowPage: NextPageWithLayout = () => {
  return <div>StackOverflowPage</div>;
};

StackOverflowPage.getLayout = function getLayout(page) {
  return <ShopLayout>{page}</ShopLayout>;
};

export default StackOverflowPage;
