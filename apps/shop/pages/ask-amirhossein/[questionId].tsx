import React from 'react';
import Head from 'next/head';

import { NextPageWithLayout } from '../_app';
import ShopLayout from '../../src/layouts/ShopLayout';

const SingleAskAmirhosseinQuestionPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title></title>
      </Head>

      <div>SingleAskAmirhosseinQuestion</div>
    </>
  );
};

SingleAskAmirhosseinQuestionPage.getLayout = function getLayout(page) {
  return <ShopLayout>{page}</ShopLayout>;
};

export default SingleAskAmirhosseinQuestionPage;
