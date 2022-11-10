import React from 'react';
import Image from 'next/image';
import { AppLink } from '@zeenzen/common';

import NotFoundIllustration from '../src/assets/images/404.svg';
import ShopLayout from '../src/layouts/ShopLayout';
import { NextPageWithLayout } from './_app';

const NotFoundPage: NextPageWithLayout = () => {
  return (
    <div className="w-full h-full flex justify-center items-center text-center">
      <div className="space-y-8">
        <Image src={NotFoundIllustration} width={400} height={200} alt="404" />

        <div>
          <h1 className="font-bold text-2xl text-title-black">
            متاسفیم!، صفحه مورد نظر وجود ندارد.
          </h1>

          <AppLink href="/" text="بازگشت به صفحه اصلی" className="mt-5" />
        </div>
      </div>
    </div>
  );
};

NotFoundPage.getLayout = function getLayout(page) {
  return <ShopLayout>{page}</ShopLayout>;
};

export default NotFoundPage;
