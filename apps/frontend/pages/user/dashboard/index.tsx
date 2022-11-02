import React from "react";

import useProtectedRoute from "../../../src/hooks/useProtectedRoute";
import UserDashboardLayout from "../../../src/layouts/UserDashboardLayout";
import { NextPageWithLayout } from "../../_app";

const UserDashboardPage: NextPageWithLayout = () => {
  useProtectedRoute();

  return <div>dashboard</div>;
};

UserDashboardPage.getLayout = function getLayout(page) {
  return <UserDashboardLayout>{page}</UserDashboardLayout>;
};

export default UserDashboardPage;
