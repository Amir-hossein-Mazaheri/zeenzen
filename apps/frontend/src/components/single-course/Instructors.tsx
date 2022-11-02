import React from "react";

import { Instructor } from "../../generated/queries";
import InstructorBox from "./InstructorBox";

interface InstructorProps {
  instructors: Instructor[];
}

const Instructors: React.FC<InstructorProps> = ({ instructors }) => {
  return (
    <div>
      {instructors.map((instructors) => (
        <InstructorBox key={instructors.id} {...instructors} />
      ))}
    </div>
  );
};

export default Instructors;
