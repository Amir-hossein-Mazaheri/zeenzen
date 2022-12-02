import React from 'react';

import { NextPageWithLayout } from 'apps/shop/pages/_app';
import UserDashboardLayout from 'apps/shop/src/layouts/UserDashboardLayout';

const UserSingleOrderPage: NextPageWithLayout = () => {
  return <div>UserSingleOrderPage</div>;
};

UserSingleOrderPage.getLayout = function getLayout(page) {
  return <UserDashboardLayout>{page}</UserDashboardLayout>;
};

export default UserSingleOrderPage;
