import React from "react";
import Image, { StaticImageData } from "next/image";

import defaultAvatar from "../assets/images/user/default-avatar.png";

interface AvatarProps {
  image?: StaticImageData | string;
  containerClassName?: string;
  imageClassName?: string;
  height?: number;
  width?: number;
}

const Avatar: React.FC<AvatarProps> = ({
  image,
  containerClassName,
  imageClassName,
  height,
  width,
}) => {
  return (
    <div
      className={`rounded-full inline-flex items-center justify-center max-h-fit overflow-hidden shadow-sm shadow-gray-300 ${containerClassName}`}
    >
      <Image
        src={image || defaultAvatar}
        alt="user-avatar"
        width={width || 100}
        height={height || 100}
        className={imageClassName}
      />
    </div>
  );
};

export default Avatar;
