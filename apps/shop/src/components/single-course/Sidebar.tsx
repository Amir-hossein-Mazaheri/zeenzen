import React from 'react';
import { Course } from '@zeenzen/data';

import Instructors from './Instructors';
import CourseProperties from './CourseProperties';

const Sidebar: React.FC<Course> = (props) => {
  return (
    <div className="space-y-16">
      <CourseProperties {...props} />

      <Instructors instructors={props.instructors} />
    </div>
  );
};

export default Sidebar;
