import React, { ReactNode, useMemo } from 'react';
import { m as motion } from 'framer-motion';

import Sidebar from '../components/user-dashboard/Sidebar';
import ShopLayout from './ShopLayout';
import AnimationLayout from './AnimationLayout';

interface UserDashboardLayoutProps {
  children: ReactNode;
  withAnimation?: boolean;
}

const UserDashboardLayout: React.FC<UserDashboardLayoutProps> = ({
  children,
  withAnimation = true,
}) => {
  const className = useMemo(
    () => 'basis-9/12 rounded-xl bg-white shadow-spread-shadow px-8 py-5',
    []
  );

  return (
    <ShopLayout withAnimation={false}>
      <div className="flex justify-between items-start">
        <Sidebar />
        {withAnimation ? (
          <AnimationLayout className={className}>{children}</AnimationLayout>
        ) : (
          <div className={className}>{children}</div>
        )}
      </div>
    </ShopLayout>
  );
};

export default UserDashboardLayout;
