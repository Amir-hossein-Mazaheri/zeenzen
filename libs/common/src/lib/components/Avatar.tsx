import React, { useContext, useState } from 'react';
import Image, { StaticImageData } from 'next/image';

import { defaultAvatar } from '../assets';
import BaseUrlContext from '../context/BaseUrlContext';
import sanitizeSlash from '../utils/sanitizeSlash';

interface AvatarProps {
  image?: StaticImageData | string;
  containerClassName?: string;
  imageClassName?: string;
  height?: number;
  width?: number;
}

export const Avatar: React.FC<AvatarProps> = ({
  image,
  containerClassName,
  imageClassName,
  height,
  width,
}) => {
  const { baseUrl } = useContext(BaseUrlContext);

  const [src, setSrc] = useState(
    (typeof image === 'string'
      ? `${sanitizeSlash(baseUrl)}/${image}`
      : image) ?? defaultAvatar
  );

  return (
    <div
      className={`rounded-full aspect-square inline-flex items-center justify-center max-h-fit overflow-hidden shadow-sm shadow-gray-300 ${containerClassName}`}
    >
      <Image
        src={src}
        alt="user-avatar"
        width={width ?? 100}
        height={height ?? 100}
        className={imageClassName}
        onError={() => setSrc(defaultAvatar)}
      />
    </div>
  );
};

export default Avatar;
