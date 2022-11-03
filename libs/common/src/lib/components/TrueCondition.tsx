import React, { ReactNode } from 'react';

interface TrueConditionProps {
  children: ReactNode;
}

export const TrueCondition: React.FC<TrueConditionProps> = ({ children }) => {
  return <>{children}</>;
};

export default TrueCondition;
