import React from 'react';

import DashboardLayout from '../../src/layouts/DashboardLayout';
import { NextPageWithLayout } from '../_app';

const IncomeManagement: NextPageWithLayout = () => {
  return <div>IncomeManagement</div>;
};

IncomeManagement.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default IncomeManagement;
