import Head from 'next/head';
import React from 'react';

import useProtectedRoute from '../../../src/hooks/useProtectedRoute';
import UserDashboardLayout from '../../../src/layouts/UserDashboardLayout';
import { NextPageWithLayout } from '../../_app';
import addToTitle from '../../../src/utils/addToTitle';

const UserDashboardPage: NextPageWithLayout = () => {
  useProtectedRoute();

  return (
    <>
      <Head>
        <title>{addToTitle('داشبرد')}</title>
      </Head>

      <div>dashboard</div>
    </>
  );
};

UserDashboardPage.getLayout = function getLayout(page) {
  return <UserDashboardLayout>{page}</UserDashboardLayout>;
};

export default UserDashboardPage;
