import React from 'react';

interface ProgressBarProps {
  progress: number;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  className,
}) => {
  return (
    <div
      className={`rounded-full h-5 w-full bg-white shadow shadow-gray-200/85 relative overflow-hidden ${className}`}
    >
      <div
        style={{ width: `${progress}%` }}
        className="bg-light-red absolute top-0 bottom-0 left-0"
      />
    </div>
  );
};

export default ProgressBar;
