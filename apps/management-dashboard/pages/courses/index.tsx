import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import { NextPageWithLayout } from '../_app';
import DashboardLayout from '../../src/layouts/DashboardLayout';

const CoursesPage: NextPageWithLayout = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/');
  }, [router]);

  return <div>در حال انتقال</div>;
};

CoursesPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default CoursesPage;
