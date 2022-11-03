import React from 'react';
import { Course } from '@zeenzen/data';
import { ProductCard, UnderlinedTitle } from '@zeenzen/common';

interface CoursesProps {
  courses: Course[];
}

const Courses: React.FC<CoursesProps> = ({ courses }) => {
  return (
    <div>
      <UnderlinedTitle
        center
        element="h1"
        size="text-6xl"
        title="دوره های آموزشی ما"
        className="mt-16"
      />

      <div className="grid grid-cols-3 gap-10 mt-20">
        {courses.map((course) => (
          <ProductCard key={course.id} {...course} />
        ))}
      </div>
    </div>
  );
};

export default Courses;
