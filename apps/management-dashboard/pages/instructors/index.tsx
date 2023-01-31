import React from 'react';

import DashboardLayout from '../../src/layouts/DashboardLayout';
import { NextPageWithLayout } from '../_app';

const InstructorsPage: NextPageWithLayout = () => {
  return <div>InstructorsPage</div>;
};

InstructorsPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default InstructorsPage;
