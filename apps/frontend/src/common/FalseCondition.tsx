import React, { ReactNode } from "react";

interface FalseConditionProps {
  children: ReactNode;
}

const FalseCondition: React.FC<FalseConditionProps> = ({ children }) => {
  return <>{children}</>;
};

export default FalseCondition;
