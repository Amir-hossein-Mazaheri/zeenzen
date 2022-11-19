import React, { ReactNode } from 'react';

import Navbar from '../common/Navbar';

interface CenterLayoutProps {
  children: ReactNode;
}

const CenterLayout: React.FC<CenterLayoutProps> = ({ children }) => {
  return (
    <div className="w-full h-screen flex flex-col">
      <div className="px-12 mt-4">
        <Navbar />
      </div>
      <div className="flex justify-center grow items-center">{children}</div>
    </div>
  );
};

export default CenterLayout;
