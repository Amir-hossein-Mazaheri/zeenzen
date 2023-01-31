import React from 'react';

import { NextPageWithLayout } from '../_app';
import DashboardLayout from '../../src/layouts/DashboardLayout';

const QuestionsPage: NextPageWithLayout = () => {
  return <div>QuestionsPage</div>;
};

QuestionsPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default QuestionsPage;
