import Image from 'next/image';
import React from 'react';
import { PreRequirement as PreRequirementProps } from '@zeenzen/data';

import preRequirementLevelTranslator from '../../utils/preRequirementLevelTranslator';

const PreRequirement: React.FC<PreRequirementProps> = ({
  label,
  description, // should be markdown(MD)
  level,
  image,
}) => {
  return (
    <div className="relative px-12 py-6 border border-gray-300 rounded-xl">
      <div className="flex items-center justify-between absolute -translate-y-1/2 top-0 right-0 left-0 px-7">
        <h3 className="px-5 bg-white text-title-black font-semibold text-2xl">
          {label}
        </h3>

        <p className="px-5 bg-white text-red-500">
          <span>سطح آشنایی: </span>
          <span>{preRequirementLevelTranslator(level)}</span>
        </p>
      </div>
      <div className="flex gap-7 items-center">
        <Image
          className="rounded-xl"
          src={image}
          alt={label}
          width={250}
          height={250}
        />
        <p className="leading-relaxed text-text-black">{description}</p>
      </div>
    </div>
  );
};

export default PreRequirement;
