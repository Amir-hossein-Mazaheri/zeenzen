import React from 'react';

import Menu from '../common/Menu';
import Navbar from '../common/Navbar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="py-6 pl-16 pr-8 flex bg-title-black min-h-screen">
      <Menu />

      <main className="bg-white grow rounded-2xl">
        <Navbar />

        <div className="px-12 py-6 text-text-black">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
