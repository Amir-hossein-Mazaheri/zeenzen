import React from 'react';

interface PropertyProps {
  text: string;
  property?: number;
  gap?: string;
  innerGap?: string;
  renderIcon: React.ReactNode;
}

export const Property: React.FC<PropertyProps> = ({
  property,
  text,
  renderIcon,
  gap = 'gap-1',
  innerGap = 'gap-2',
}) => (
  <div className={`flex items-center ${gap}`}>
    {renderIcon}
    <div className={`flex gap-2 ${innerGap}`}>
      {property && <p>{property}</p>}
      <p>{text}</p>
    </div>
  </div>
);

export default Property;
