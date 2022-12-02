import React from 'react';

import { NextPageWithLayout } from '../../_app';
import UserDashboardLayout from 'apps/shop/src/layouts/UserDashboardLayout';

const UserCoursesPage: NextPageWithLayout = () => {
  return <div>UserCoursesPage</div>;
};

UserCoursesPage.getLayout = function getLayout(page) {
  return <UserDashboardLayout>{page}</UserDashboardLayout>;
};

export default UserCoursesPage;
