import React from 'react';

import BaseUrlContext from '../context/BaseUrlContext';

interface BaseUrlProviderProps {
  children: React.ReactNode;
  baseUrl: string;
}

const BaseUrlProvider: React.FC<BaseUrlProviderProps> = ({
  baseUrl,
  children,
}) => {
  return (
    <BaseUrlContext.Provider value={{ baseUrl }}>
      {children}
    </BaseUrlContext.Provider>
  );
};

export default BaseUrlProvider;
