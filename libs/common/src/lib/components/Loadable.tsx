import React, { ReactNode } from 'react';
import { MoonLoader } from 'react-spinners';

import { colors } from '../constants';

interface LoadableProps {
  isLoading: boolean;
  center?: boolean;
  skeleton?: ReactNode;
  children: ReactNode;
  fragment?: boolean;
  error?: string;
}

export const Loadable: React.FC<LoadableProps> = ({
  children,
  center = true,
  isLoading,
  skeleton,
  fragment = false,
  error,
}) => {
  // if isLoading is true and skeleton is present skeleton will be rendered but if there is no skeleton a spinner will be rendered
  const child = isLoading ? (
    skeleton ? (
      skeleton
    ) : (
      <MoonLoader size={50} color={colors['light-blue']} />
    )
  ) : (
    children
  );

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (fragment) {
    return <>{child}</>;
  }

  return (
    <div
      className={
        center && isLoading
          ? 'w-full h-full flex items-center justify-center p-12'
          : ''
      }
    >
      {child}
    </div>
  );
};

export default Loadable;
