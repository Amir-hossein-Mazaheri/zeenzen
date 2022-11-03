import Image from 'next/image';
import React from 'react';

interface HeroProps {
  title: string;
  shortDescription: string;
  image: string;
  coverImage: string;
}

const Hero: React.FC<HeroProps> = ({
  title,
  shortDescription,
  image,
  coverImage,
}) => {
  return (
    <div className="w-full h-52 relative">
      <div className="rounded-xl overflow-hidden">
        <Image alt={title} src={coverImage} fill />
      </div>
      <div className="w-full h-full px-12 flex gap-12 items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-[230px] w-[230pxs] translate-y-16 rounded-xl overflow-hidden border-4 bg-white shadow-lg shadow-gray-300/80 border-white">
          <Image alt={title} src={image} width={230} height={230} />
        </div>

        <div className="h-full flex flex-col justify-center gap-4 max-w-3xl">
          <h1 className="font-black text-title-black text-3xl">{title}</h1>
          <p className="font-medium text-text-black text-lg">
            {shortDescription}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
