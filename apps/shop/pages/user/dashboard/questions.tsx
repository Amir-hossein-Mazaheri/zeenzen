import React from 'react';

import { NextPageWithLayout } from '../../_app';
import UserDashboardLayout from 'apps/shop/src/layouts/UserDashboardLayout';

const UserQuestionsPage: NextPageWithLayout = () => {
  return <div>UserQuestionsPage</div>;
};

UserQuestionsPage.getLayout = function getLayout(page) {
  return <UserDashboardLayout>{page}</UserDashboardLayout>;
};

export default UserQuestionsPage;
