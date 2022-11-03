import React from 'react';

interface ShadowBoxProps {
  title?: string;
  titleSize?: 'lg' | 'base';
  children?: React.ReactNode;
  className?: string;
  titleClassName?: string;
}

export const ShadowBox: React.FC<ShadowBoxProps> = ({
  title,
  titleSize,
  children,
  className,
  titleClassName,
}) => {
  return (
    <div
      className={`relative px-8 ${
        title ? 'py-8' : 'py-7'
      } bg-white rounded-xl shadow-mild-shadow shadow-gray-200/60 ${className}`}
    >
      {title && (
        <h2
          className={`font-black ${
            titleSize === 'lg' ? 'text-3xl' : 'text-2xl'
          } drop-shadow-lg text-title-black absolute top-0 right-0 -translate-y-1/2 mr-8 ${titleClassName}`}
        >
          {title}
        </h2>
      )}
      {children}
    </div>
  );
};

export default ShadowBox;
