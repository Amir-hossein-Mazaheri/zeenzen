import React from 'react';

import { BreadcrumbContext } from '../context';

interface BreadcrumbContextProps {
  children: React.ReactNode;
  translator: {
    [k: string]: string;
  };
}

export const BreadcrumbProvider: React.FC<BreadcrumbContextProps> = ({
  children,
  translator,
}) => {
  return (
    <BreadcrumbContext.Provider value={{ translator }}>
      {children}
    </BreadcrumbContext.Provider>
  );
};
