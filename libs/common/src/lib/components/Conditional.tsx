import React, { useMemo } from 'react';

import FalseCondition from './FalseCondition';
import TrueCondition from './TrueCondition';

interface ConditionalProps {
  children: JSX.Element[];
  condition: boolean;
  invert?: boolean;
}

// better to be used when condition made code ugly
//! NOTE: should'nt be used for simple and short, its purpose is to simplify the code :)
export const Conditional: React.FC<ConditionalProps> = ({
  children,
  condition,
  invert = false,
}) => {
  const TrueConditionComp = useMemo(
    () => children.find((child) => child.type === TrueCondition),
    [children]
  );

  const FalseConditionComp = useMemo(
    () => children.find((child) => child.type === FalseCondition),
    [children]
  );

  if (!TrueConditionComp || !FalseConditionComp) {
    throw new Error(
      'You should pass TruCondition and FalseCondition components to the Conditional component.'
    );
  }

  return (
    <>
      {(invert ? !condition : condition)
        ? TrueConditionComp
        : FalseConditionComp}
    </>
  );
};

export default Conditional;
