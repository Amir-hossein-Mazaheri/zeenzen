import React from 'react';
import { CourseCard, CourseCardProps } from '@zeenzen/common';

interface CoursesProps {
  courses: CourseCardProps[];
  className?: string;
}

const Courses: React.FC<CoursesProps> = ({ courses, className }) => {
  return (
    <div className={`space-y-9 ${className}`}>
      {courses.map((course) => (
        <CourseCard key={course.id} {...course} />
      ))}
    </div>
  );
};

export default Courses;
