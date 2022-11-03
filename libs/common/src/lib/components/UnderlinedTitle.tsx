import React from 'react';

interface UnderlinedTitleProps {
  title: string;
  className?: string;
  element?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  size?: string;
  color?: string;
  center?: boolean;
}

export const UnderlinedTitle: React.FC<UnderlinedTitleProps> = ({
  title,
  className,
  color = 'before:bg-light-gray',
  element = 'h3',
  size = 'text-3xl',
  center = false,
}) => {
  const DynamicElement = `${element}` as keyof JSX.IntrinsicElements;

  return (
    <div className={center ? 'flex items-center justify-center' : ''}>
      <DynamicElement
        className={`font-black text-title-black w-fit ${size} relative before:content-[''] before:absolute before:bottom-0 before:inset-x-0 before:h-4 before:z-[-1]
         ${color} ${className ? className : null}`}
      >
        {title}
      </DynamicElement>
    </div>
  );
};

export default UnderlinedTitle;
