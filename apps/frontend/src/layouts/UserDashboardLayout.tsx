import React, { ReactNode } from "react";

import Sidebar from "../components/user-dashboard/Sidebar";
import ShopLayout from "./ShopLayout";

interface UserDashboardLayoutProps {
  children: ReactNode;
}

const UserDashboardLayout: React.FC<UserDashboardLayoutProps> = ({
  children,
}) => {
  return (
    <ShopLayout>
      <div className="flex justify-between items-start">
        <Sidebar />
        <div className="basis-9/12 rounded-xl bg-white shadow-spread-shadow px-8 py-5">
          {children}
        </div>
      </div>
    </ShopLayout>
  );
};

export default UserDashboardLayout;
