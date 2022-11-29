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
    <div
      className={`mr-auto max-w-fit flex gap-3 items-center px-5 py-2 bg-white rounded-full font-medium mb-6 text-sm shadow shadow-gray-100 ${className}`}
    >
      {crumbs.map(({ text, href }, index) => (
        <>
          <div>
            {index !== crumbs.length - 1 ? (
              <Link className="text-light-blue" href={href}>
                {text}
              </Link>
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
