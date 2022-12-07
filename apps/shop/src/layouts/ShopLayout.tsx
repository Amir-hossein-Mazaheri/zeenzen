import React from 'react';

import Navbar from '../common/Navbar';
import Footer from '../components/landing-page/Footer';
import AnimationLayout from './AnimationLayout';

interface ShopLayoutProps {
  children: React.ReactNode;
  compact?: boolean;
  withAnimation?: boolean;
}

const ShopLayout: React.FC<ShopLayoutProps> = ({
  children,
  compact = false,
  withAnimation = true,
}) => {
  return (
    <>
      <main className={`md:px-12 px-6 ${compact ? '' : 'space-y-20'}`}>
        <Navbar className={compact ? 'mb-20' : ''} />
        {withAnimation ? (
          <AnimationLayout
            className={`md:px-12 px-6 ${compact ? '' : 'space-y-20'}`}
          >
            {children}
          </AnimationLayout>
        ) : (
          children
        )}
      </main>
      <Footer />
    </>
  );
};

export default ShopLayout;
