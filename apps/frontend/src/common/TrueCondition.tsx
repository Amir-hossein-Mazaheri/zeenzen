import React, { ReactNode } from "react";

interface TrueConditionProps {
  children: ReactNode;
}

const TrueCondition: React.FC<TrueConditionProps> = ({ children }) => {
  return <>{children}</>;
};

export default TrueCondition;
