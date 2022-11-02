import React from "react";
import ShadowBox from "../../common/ShadowBox";

interface CourseSidebarProps {
  title: string;
  description: string;
}

const CourseSidebar: React.FC<CourseSidebarProps> = ({
  title,
  description,
}) => {
  return (
    <div className="sticky top-28">
      <ShadowBox title={title}>
        <p className="font-medium leading-loose">{description}</p>
      </ShadowBox>
    </div>
  );
};

export default CourseSidebar;
