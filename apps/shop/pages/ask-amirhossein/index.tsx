import React from 'react';
import Head from 'next/head';

import ShopLayout from '../../src/layouts/ShopLayout';
import { NextPageWithLayout } from '../_app';
import addToTitle from '../../src/utils/addToTitle';

const AskAmirhosseinPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>{addToTitle('از امیرحسین بپرس')}</title>
      </Head>

      <div>AskAmirhosseinPage</div>
    </>
  );
};

AskAmirhosseinPage.getLayout = function getLayout(page) {
  return <ShopLayout>{page}</ShopLayout>;
};

export default AskAmirhosseinPage;
