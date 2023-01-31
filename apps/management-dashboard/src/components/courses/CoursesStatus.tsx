import { AppLink } from '@zeenzen/common';
import React, { useMemo } from 'react';

interface CoursesStatusProps {
  attended: number;
  inProgress: number;
  students: number;
  className?: string;
}

const CoursesStatus: React.FC<CoursesStatusProps> = ({
  attended,
  inProgress,
  students,
  className,
}) => {
  const getStatus = useMemo(() => {
    return [
      {
        label: 'دوره های برگزار شده',
        count: attended,
      },
      {
        label: 'دوره های در حال برگزاری',
        count: inProgress,
      },
      {
        label: 'دانش جویان',
        count: students,
      },
    ];
  }, [attended, inProgress, students]);

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div
        className={`flex font-medium rounded-xl border border-light-gray items-center gap-7 w-max px-8 py-2`}
      >
        {getStatus.map(({ label, count }) => (
          <div key={label} className="flex items-center gap-2">
            <span>{label}:</span>
            <span>{count}</span>
          </div>
        ))}
      </div>

      <AppLink text="مشاهده جزییات بیشتر" href="/courses/info" />
    </div>
  );
};

export default CoursesStatus;
