import React from 'react';

import Navbar from '../common/Navbar';
import Footer from '../components/landing-page/Footer';

interface ShopLayoutProps {
  children: React.ReactNode;
  compact?: boolean;
}

const ShopLayout: React.FC<ShopLayoutProps> = ({
  children,
  compact = false,
}) => {
  return (
    <>
      <main className={`px-12 ${compact ? '' : 'space-y-20'}`}>
        <Navbar className={compact ? 'mb-20' : ''} />
        {children}
      </main>
      <Footer />
    </>
  );
};

export default ShopLayout;
