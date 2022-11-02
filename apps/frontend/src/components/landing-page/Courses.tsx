import React from "react";

import ProductCard from "../../common/ProductCard";
import UnderlinedTitle from "../../common/UnderlinedTitle";
import { Course } from "../../generated/queries";

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
