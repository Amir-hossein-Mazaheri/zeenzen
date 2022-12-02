import UserDashboardLayout from 'apps/shop/src/layouts/UserDashboardLayout';
import React from 'react';

import { NextPageWithLayout } from '../../_app';

const UserScoresPage: NextPageWithLayout = () => {
  return <div>UserScoresPage</div>;
};

UserScoresPage.getLayout = function getLayout(page) {
  return <UserDashboardLayout>{page}</UserDashboardLayout>;
};

export default UserScoresPage;
