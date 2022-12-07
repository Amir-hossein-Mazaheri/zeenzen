import React, { ReactNode } from 'react';

import Navbar from '../common/Navbar';
import AnimationLayout from './AnimationLayout';

interface CenterLayoutProps {
  children: ReactNode;
  withAnimation?: boolean;
}

const CenterLayout: React.FC<CenterLayoutProps> = ({
  children,
  withAnimation = true,
}) => {
  return (
    <div className="w-full h-screen flex flex-col">
      <div className="md:px-12 px-6 md:mt-4 mt-5">
        <Navbar />
      </div>

      {withAnimation ? (
        <AnimationLayout className="flex justify-center grow items-center">
          {children}
        </AnimationLayout>
      ) : (
        <div className="flex justify-center grow items-center">{children}</div>
      )}
    </div>
  );
};

export default CenterLayout;
