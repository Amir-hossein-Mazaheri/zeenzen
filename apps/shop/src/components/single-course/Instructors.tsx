import React from 'react';
import { Instructor } from '@zeenzen/data';

import InstructorBox from './InstructorBox';

interface InstructorProps {
  instructors: Instructor[];
}

const Instructors: React.FC<InstructorProps> = ({ instructors }) => {
  return (
    <div className="space-y-12">
      {instructors.map((instructors) => (
        <InstructorBox key={instructors.id} {...instructors} />
      ))}
    </div>
  );
};

export default Instructors;
