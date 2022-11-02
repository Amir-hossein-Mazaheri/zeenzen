import React from "react";
import Image from "next/image";

interface ReasonProps {
  img: string;
  title: string;
  description: string;
}

const Reason: React.FC<ReasonProps> = ({ img, title, description }) => {
  return (
    <div className="px-4 flex flex-col items-center">
      <div>
        <Image width={150} height={150} src={img} alt={title} />
      </div>
      <div className="space-y-4 mt-6 text-center">
        <h2 className="text-title-black font-bold text-2xl">{title}</h2>
        <p className="text-text-black font-light max-w-[205px] text-base">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Reason;
