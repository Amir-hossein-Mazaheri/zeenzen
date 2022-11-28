import React from 'react';

import { Crumb } from '../types';
import Link from 'next/link';

interface BreadcrumbsProps {
  crumbs: Crumb[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  crumbs,
  className,
}) => {
  return (
    <div className={`flex gap-3 items-center ${className}`}>
      {crumbs.map(({ text, href }, index) => (
        <>
          <div>
            {index !== crumbs.length - 1 ? (
              <Link href={href}>{text}</Link>
            ) : (
              <p>{text}</p>
            )}
          </div>

          {index !== crumbs.length - 1 && <div>/</div>}
        </>
      ))}
    </div>
  );
};
