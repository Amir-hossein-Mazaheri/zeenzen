import React from 'react';

import { NextPageWithLayout } from '../_app';
import DashboardLayout from '../../src/layouts/DashboardLayout';

const TicketsPage: NextPageWithLayout = () => {
  return <div>TicketsPage</div>;
};

TicketsPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default TicketsPage;
