import React from 'react';

import { NextPageWithLayout } from '../_app';
import DashboardLayout from '../../src/layouts/DashboardLayout';

const ServerHealthPage: NextPageWithLayout = () => {
  return <div>ServerHealthPage</div>;
};

ServerHealthPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default ServerHealthPage;
