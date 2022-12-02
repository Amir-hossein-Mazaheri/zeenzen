import React from 'react';

import { NextPageWithLayout } from 'apps/shop/pages/_app';
import UserDashboardLayout from 'apps/shop/src/layouts/UserDashboardLayout';

const UserOrdersPage: NextPageWithLayout = () => {
  return <div>OrdersPage</div>;
};

UserOrdersPage.getLayout = function getLayout(page) {
  return <UserDashboardLayout>{page}</UserDashboardLayout>;
};

export default UserOrdersPage;
