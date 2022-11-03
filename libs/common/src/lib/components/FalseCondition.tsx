import React, { ReactNode } from 'react';

interface FalseConditionProps {
  children: ReactNode;
}

export const FalseCondition: React.FC<FalseConditionProps> = ({ children }) => {
  return <>{children}</>;
};

export default FalseCondition;
